import type { ProjectTypes } from './project'

export type ResearchProject = ProjectTypes[number] & {
  slug: string
  field: string
  status: string
  question: string
  evidence: string[]
  scope: string
  sources: { label: string; href: string }[]
}

export const researchProjects: ResearchProject[] = [
  {
    slug: 'orpheus-urdu',
    title: 'Emotion aware Urdu speech',
    field: 'Speech synthesis · Low resource learning',
    status: 'Ongoing research',
    src: '/images/projects/posters/orpheus-urdu-refined.webp',
    imageAlt:
      'Teal Urdu speech concept poster with acoustic feature planes and a precision audio assembly',
    href: '#',
    repository: 'https://github.com/hassan-31x/orpheus-ft-urdu',
    description:
      'Adapting a 3B speech model to Urdu as the foundation for an emotionally expressive speaking agent.',
    question:
      'How can an English pretrained speech model learn intelligible Urdu while preserving the acoustic detail needed for expressive speech?',
    stack: ['Python', 'PyTorch', 'Transformers'],
    evidence: ['Orpheus 3B + LoRA', 'SNAC at 24 kHz', 'Held out speech evaluation'],
    details: [
      'Built a paired text and audio pipeline with Urdu normalization, split overlap checks, context length auditing, and fingerprinted speech token caches. The audited run retained 16,111 training clips, totaling 26.09 hours after exclusions.',
      'Adapted Orpheus with parameter efficient LoRA training and seven interleaved SNAC audio tokens per codec frame. Implemented resumable optimizer, scheduler and RNG state with verified checkpoint backups.',
      'Evaluated intermediate checkpoints using ASR based WER and CER, language identification, acoustic comparisons, and generated speech inspection. The local evaluation records include a full first epoch through step 2,014.',
    ],
    scope:
      'Current stage: Urdu language adaptation and checkpoint evaluation. Emotion supervision and the complete conversational agent remain ongoing work; this run does not establish controllable emotion or production readiness.',
    sources: [
      { label: 'Orpheus architecture', href: 'https://github.com/canopyai/Orpheus-TTS' },
      { label: 'UrduSpeech dataset', href: 'https://huggingface.co/datasets/ASLP-lab/UrduSpeech' },
    ],
  },
  {
    slug: 'mmcultureqa',
    title: 'MMCultureQA',
    field: 'Multimodal reasoning · Evaluation',
    status: 'SemEval 2027 · Task 6',
    src: '/images/projects/posters/semeval-model-eval-refined.webp',
    imageAlt:
      'Golden Culture QA concept poster showing image patches and language features entering a visual encoder',
    href: '#',
    repository: 'https://github.com/hassan-31x/semeval-model-eval',
    description:
      'Studying cultural grounding, dialect fidelity, and metric reliability in multilingual visual question answering.',
    question:
      'Does a vision language model understand the cultural evidence in an image, or does its evaluation score reward fluent but incorrect answers?',
    stack: ['Python', 'PyTorch', 'Transformers', 'Hugging Face Datasets', 'BERTScore'],
    evidence: [
      '10,000 baseline generations',
      'Four language varieties',
      'Vision ablation + error analysis',
    ],
    details: [
      'Built reproducible Hugging Face and local inference runners with resumable predictions, pinned experiment settings, structured outputs, and official format validation for the MMCultureQA benchmark.',
      'Reproduced the official baseline across English, Modern Standard Arabic, Egyptian Arabic, and Levantine Arabic. The saved baseline study contains 10,000 generations, zero inference errors, and 16 passed official format checks.',
      'Compared BERTScore with question echo and TF IDF retrieval controls, image removal ablations, paired bootstrap analysis, dialect identification, and an LLM judge. The analysis exposes cases where lexical similarity overstates answer correctness.',
      'The broader study targets both spoken and textual visual QA. Completed baseline analysis currently establishes the textual QA track; speech input and further model adaptation remain in progress.',
    ],
    scope:
      'Ongoing shared task research, with completed baseline reproduction and analysis. Results describe local development experiments, not an official leaderboard placement or an accepted publication.',
    sources: [
      {
        label: 'Official task and evaluation',
        href: 'https://mmcultureqa-semeval27.github.io/tasks/',
      },
      { label: 'Benchmark dataset', href: 'https://huggingface.co/datasets/QCRI/MMCQA-SemEval27' },
    ],
  },
  {
    slug: 'gpt-2',
    title: 'GPT 2 from first principles',
    field: 'Language modeling · Training systems',
    status: 'Model implementation',
    src: '/images/projects/posters/gpt-2-refined.webp',
    imageAlt:
      'Orange GPT 2 concept poster with brushed metal transformer layers and smoked blue attention planes',
    href: '#',
    repository: 'https://github.com/hassan-31x/gpt-2',
    description:
      'A decoder only transformer implemented in PyTorch, from causal attention to the optimization loop.',
    question:
      'What does it take to implement the architecture and training mechanics of a GPT style language model below the inference API?',
    stack: ['Python', 'PyTorch'],
    evidence: ['12 decoder blocks', '12 attention heads', '768 embedding dimensions'],
    details: [
      'Implemented token and position embeddings, pre normalization residual blocks, multihead causal self attention, GELU feedforward layers, and a language modeling head tied to the token embedding weights.',
      'Used PyTorch scaled dot product attention and implemented AdamW parameter groups, gradient accumulation, gradient clipping, learning rate warmup, cosine decay, and bfloat16 autocast.',
      'Explored torch.compile and distributed training setup with NCCL and gradient synchronization. The repository is an architecture and training implementation, with experimental runner code that still needs fixes and validation for a complete distributed run.',
    ],
    scope:
      'An implementation study inspired by GPT 2 and GPT training techniques. Architecture dimensions are configuration values, not a claim of completed large scale pretraining or reproduced benchmark quality.',
    sources: [
      {
        label: 'GPT 2 paper',
        href: 'https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf',
      },
    ],
  },
  {
    slug: 'bytepair-tokenizer',
    title: 'BytePair Tokenizer',
    field: 'Tokenization · Language infrastructure',
    status: 'Built from scratch',
    src: '/images/projects/posters/gpt-tokenizer-refined.webp',
    imageAlt:
      'Rose Byte Pair concept poster showing separate byte tiles grouped into larger subword blocks',
    href: '#',
    repository: 'https://github.com/hassan-31x/gpt-tokenizer',
    description:
      'A byte level BPE implementation with learned merge ranks, reversible UTF 8 encoding, and inspectable vocabulary artifacts.',
    question:
      'How does raw text become a learned token vocabulary without relying on a pretrained tokenizer?',
    stack: ['Python'],
    evidence: [
      '256 base byte tokens',
      'Learned merge ranks',
      'Vocabulary export + round trip checks',
    ],
    details: [
      'Implemented pair frequency counting, greedy merge learning, rank ordered encoding, byte reconstruction, and UTF 8 decoding. The core BPE algorithm is written directly in Python.',
      'Added model serialization, readable vocabulary exports, and encode/decode round trip checks. The saved example includes 256 learned merges over the 256 byte vocabulary.',
      'Also explored GPT style regex pretokenization and special token registration in a separate experimental tokenizer class. The basic byte pair encoder is the complete implementation; regex tokenizer support remains partial.',
    ],
    scope:
      'Core language model infrastructure with saved training artifacts. This is a tokenizer implementation, not an independently trained language model.',
    sources: [],
  },
]
