# BPE Encoding Has to Remember the Order

I built a byte-level BPE tokenizer in Python to understand what happens before text reaches a language model. Counting pairs was straightforward. The more interesting detail was encoding new text: the tokenizer has to reuse the order it learned during training. Choosing the most frequent pair again would quietly define a different tokenizer.

## Start with bytes

My implementation starts with `list(text.encode('utf-8'))`. That gives me 256 possible base tokens, one for each byte value. A character can occupy several bytes, so a token does not have to be a whole character or a readable word.

Training repeatedly counts adjacent pairs, picks the most frequent one, and replaces its non-overlapping occurrences with a new token ID. The first learned ID is 256. A target vocabulary of 512 leaves room for 256 learned merges, assuming the corpus still contains pairs to merge.

Here's a small worked example, independent of the training corpus in the repository:

```python
ids = list(b"ababab")
# [97, 98, 97, 98, 97, 98]

# Learn (97, 98) -> 256
ids = [256, 256, 256]

# Learn (256, 256) -> 257
ids = [257, 256]
```

The six initial byte tokens become three, then two. The second pair occurs at two overlapping positions, but replacement can consume only one of them. Counting a pair and applying a merge are different operations.

## Frequency learns the rules. Rank applies them.

During inference, I don't learn anything new. I look at adjacent pairs in the input and select the one with the earliest learned merge rank:

```python
pair = min(
    stats,
    key=lambda p: self.merges.get(p, float('inf')),
)
if pair not in self.merges:
    break
ids = self.merge(ids, pair, self.merges[pair])
```

In this implementation, merge IDs increase with training order, so the smallest eligible ID also represents the earliest rule. Think of the merge table as an ordered recipe: later steps can depend on ingredients made by earlier steps.

For a deliberately constructed example, suppose `(a, b)` has rank 0 and `(b, c)` has rank 1. In `abcbcbc`, the second pair occurs three times and the first only once. A frequency-based encoder would start with `(b, c)`. The trained encoder starts with `(a, b)`, which removes the first opportunity to merge `(b, c)`. Those choices produce different token boundaries.

## Decode after joining the bytes

I store vocabulary entries as byte strings. Decoding concatenates those bytes first, then decodes the complete sequence as UTF-8. Decoding individual tokens separately can corrupt a character whose bytes span token boundaries.

That also explains why my readable `.vocab` export isn't the file I load back. It uses replacement characters to display partial UTF-8 sequences. The `.model` file preserves the merge rules needed to reconstruct the byte vocabulary.

For valid input text, I check that `decode(encode(text)) == text`, including non-ASCII text. But round-trip correctness alone doesn't prove that merge ordering is right: two different segmentations can both reconstruct the same bytes. I would also test expected IDs for a fixed merge table.

This is a small educational tokenizer. It rescans the sequence on every merge and doesn't implement the full pre-tokenization or special-token behavior of a production tokenizer. My next improvement would be a tiny set of ordering and overlap tests before trying to make that loop faster.

[Implementation: training and encoding](https://github.com/hassan-31x/gpt-tokenizer/blob/main/bpe.py). [Vocabulary persistence and decoding helpers](https://github.com/hassan-31x/gpt-tokenizer/blob/main/base.py).
