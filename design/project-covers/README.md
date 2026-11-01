# Project posters

Eight colorful announcement posters use the GPT 2 artwork as their material and composition reference. The refined set retains each project's color family with calmer lighting, satin metal, smoked glass, and a technical subject instead of cartoon imagery. Each uses a short title and a single focused visual, composed for the small project thumbnails.

The final website assets live in `public/images/projects/posters/` with the suffix `-refined.webp`. They were edited with the built-in `image_gen` tool using the GPT 2 poster as a reference. The exact prompts, source filenames, reference assets, and output paths are recorded in [poster-prompts.json](poster-prompts.json). The previous artwork and [original prompts](poster-prompts-v1.json) remain available for comparison.

The original PNG files remain in the image generator's local output directory. To optimize another set of originals, place them in a directory named `<project>.png`, then run:

```sh
node scripts/build-project-covers.mjs /path/to/originals
```

The optimizer exports 1200 × 750 WebP files. It does not generate or redraw artwork.
