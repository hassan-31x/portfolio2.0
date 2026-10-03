import type { Technology } from './technology'

export type ProjectTypes = {
  title: string
  src: string
  href: string
  description: string
  stack: Technology[]
  repository?: string
  imageAlt?: string
  details?: string[]
}[]

export const featuredProjects: ProjectTypes = [
  {
    title: 'Snap AI',
    src: '/images/snapai.png',
    href: 'https://snapai.studio',
    description: 'A platform for creating AI-powered images & video Ad Creatives.',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'MongoDB', 'OpenAI'],
  },
  {
    title: 'Restaurant Voice and Ordering Agent',
    src: '/images/restaurant.png',
    href: '#',
    description: 'A real-time voice agent that takes orders and manages restaurant conversations.',
    stack: ['OpenAI', 'Vapi', 'WebRTC', 'Socket.IO', 'Next.js', 'Node.js'],
    details: [
      'Maintains conversation context and calls structured tools to inspect menus, validate items, create and modify orders, calculate bills, and track order status.',
      'Integrates Vapi and WebRTC with live transcripts, microphone controls, call-state recovery, and responsive speech feedback in the browser.',
      'Personal project.',
    ],
  },
  {
    title: 'Khaata360',
    src: '/images/projects/khaata-360.webp',
    href: '#',
    repository: 'https://github.com/hassan-31x/khaata360',
    description: 'A bilingual AI personal finance assistant for WhatsApp and web.',
    stack: ['OpenRouter', 'FastAPI', 'Next.js', 'Twilio', 'MongoDB', 'Docker'],
    details: [
      'Classifies intent, extracts transaction entities, manages multi-turn conversations, and answers natural-language questions over user financial data.',
      'Includes vision-based receipt extraction, AI-generated financial charts, analytics dashboards, and verified phone linking.',
      'Academic project with containerized FastAPI and Next.js services and MongoDB persistence.',
    ],
  },
  {
    title: 'Conduit',
    src: '/images/conduit.png',
    href: 'https://main.dgn90on8wqij9.amplifyapp.com',
    description:
      'A RAG-powered content workflow that turns source material into editable drafts.',
    stack: ['Python', 'LangChain', 'OpenAI', 'Pinecone', 'Next.js', 'Prisma'],
    details: [
      'Connects scraped social content to document ingestion, embeddings, semantic retrieval, and AI-generated drafts.',
      'Supports an authenticated workflow for editing, saving, and exporting content.',
    ],
  },
  {
    title: 'Website Builder',
    src: '/images/builder.png',
    href: 'https://website-builder-tawny-nine.vercel.app/editor',
    description: 'A website builder having drag & drop functionality for creating websites.',
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Shadcn', 'Firebase'],
  },
  {
    title: 'TensorForge',
    src: '/images/projects/tensorforge.webp',
    href: 'https://tensorforge-sim.vercel.app',
    repository: 'https://github.com/hassan-31x/tensorforge',
    description: 'Design LLM architectures and explore GPU memory, training time, and cost.',
    stack: ['Next.js', 'React', 'TypeScript', 'React Flow'],
    imageAlt: "TensorForge's live architecture canvas, component palette, and training inspector",
    details: [
      'Build model graphs, connect GPUs, and compare estimates for memory, throughput, energy, and training cost.',
      'Includes reference model presets, profiling views, local saves, JSON import/export, and canvas/report exports.',
      'An educational simulator: estimates and training animations do not train models or quote live cloud prices.',
    ],
  },
  {
    title: 'UniScrape',
    src: '/images/projects/college-scraper.webp',
    href: 'https://pathway-scraper.vercel.app',
    repository: 'https://github.com/hassan-31x/college-scraper',
    description: 'Turn university websites into cited, validated admissions records.',
    stack: ['Python', 'Playwright', 'HTTPX', 'Beautiful Soup', 'JSON Schema', 'PyPDF'],
    imageAlt: "UniScrape's admissions research dashboard showing completed university records",
    details: [
      'Crawls HTML and PDFs, prioritizes admissions links, and extracts evidence candidates; Playwright renders JavaScript-only pages.',
      'Validates agent-produced records against JSON Schema and publishes them to a searchable admissions dashboard.',
      'Keeps citations, verification status, conflicting information, and unresolved questions attached to the records.',
    ],
  },
  {
    title: 'Visual QA Benchmarks',
    src: '/images/projects/semeval-model-eval.webp',
    href: '#',
    repository: 'https://github.com/hassan-31x/semeval-model-eval',
    description: 'Compare vision-language models on multilingual image questions.',
    stack: ['Python', 'PyTorch', 'Transformers', 'Hugging Face Datasets', 'Pillow', 'BERTScore'],
    imageAlt:
      'Concept illustration of an image passing through parallel model evaluation pipelines',
    details: [
      'A SemEval cultural visual question-answering research pipeline with separate question-answering and image-evidence requests.',
      'Supports Hugging Face inference and a local LM Studio runner, resumable predictions, image variants, and per-language comparisons.',
      'Reports BERTScore, exact match, coverage, latency, and structured visual-output checks; no benchmark placement is claimed.',
    ],
  },
  {
    title: 'Crosswalk RL',
    src: '/images/projects/road-crossing-rl.webp',
    href: '#',
    repository: 'https://github.com/hassan-31x/road-crossing-rl',
    description: 'A DQN pedestrian agent learning to navigate simulated traffic.',
    stack: ['Python', 'PyTorch', 'Gymnasium', 'PyBullet', 'NumPy', 'Matplotlib'],
    imageAlt:
      'Concept illustration of a pedestrian agent following a route across a simulated intersection',
    details: [
      'A collaborative reinforcement-learning project with a custom traffic simulation, coordinated signals, collision-aware rewards, and sequential crossings.',
      'Includes a PyTorch DQN agent, replay buffer, training/evaluation scripts, checkpoint save/load support, and a training-progress plot.',
      'Built with @AbdullahShheik and @aanasakhtar. My contributions include environment improvements, zebra-crossing support, and multi-round navigation.',
    ],
  },
  {
    title: 'BytePair Tokenizer',
    src: '/images/projects/gpt-tokenizer.webp',
    href: '#',
    repository: 'https://github.com/hassan-31x/gpt-tokenizer',
    description: 'Train, save, and inspect a byte-level BPE tokenizer from scratch.',
    stack: ['Python'],
    imageAlt: 'Concept illustration of individual byte tiles merging into larger subword tokens',
    details: [
      'Learns frequent byte-pair merges from a text corpus and builds a configurable vocabulary without a tokenizer library.',
      'Supports UTF-8 encoding and decoding, model save/load, human-readable vocabulary export, and round-trip checks.',
      "Includes an example trained vocabulary and merge summary; the implementation uses Python's standard library.",
    ],
  },
  {
    title: 'Pattern Search Benchmarks',
    src: '/images/projects/string-matching-algo-comparison.webp',
    href: '#',
    repository: 'https://github.com/hassan-31x/string-matching-algo-comparison',
    description: 'Benchmark five search algorithms across text, DNA, and adversarial inputs.',
    stack: ['Python', 'NumPy', 'Matplotlib'],
    imageAlt:
      'Concept illustration of five parallel search tracks highlighting matching subsequences',
    details: [
      'Implements Naive, Rabin–Karp, KMP, Boyer–Moore–Horspool, and frequency-based anchor selection (FBAS).',
      'Measures character comparisons and runtime across natural text, DNA, synthetic inputs, and varying text/pattern lengths.',
      'Includes benchmark scripts, stored results, plots, and a written analysis of algorithm behavior.',
    ],
  },
  {
    title: 'Blood Donation Manager',
    src: '/images/projects/blood-donation-system.webp',
    href: '#',
    repository: 'https://github.com/hassan-31x/blood-donation-system',
    description: 'Coordinate donors, hospitals, appointments, and blood-bank inventory.',
    stack: ['Python', 'Streamlit', 'SQL Server', 'pyodbc', 'Matplotlib'],
    imageAlt: 'Concept illustration connecting donors, a hospital, and blood-bank inventory',
    details: [
      'A database-management course project with separate donor, hospital, and administrator workflows.',
      'Handles donor registration, appointments, donation history, blood requests, inventory, dispatch, and blood-drive management.',
      'Includes a SQL Server schema and local setup instructions; requires a configured database to run.',
    ],
  },
  {
    title: 'Inspectr',
    src: '/images/projects/web-analyzer.webp',
    href: 'https://web-inspectr.vercel.app',
    repository: 'https://github.com/hassan-31x/web-analyzer',
    description: 'Check website metadata, social cards, and publishing essentials.',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Cheerio', 'JSDOM'],
    imageAlt: "Inspectr's live website analysis form and publishing checklist introduction",
    details: [
      "Fetches a page's HTML through a Next.js API route and inspects title tags, descriptions, canonicals, viewport settings, and structured data.",
      'Checks Open Graph/Twitter metadata and response headers, then presents categorized findings in the interface.',
      'Provides HTML and header-based checks, rather than a browser performance benchmark or real-user Core Web Vitals measurement.',
    ],
  },
  {
    title: 'RISC-V Processor',
    src: '/images/projects/risc-v-processor.webp',
    href: '#',
    repository: 'https://github.com/hassan-31x/risc_v_processor',
    description: 'Explore single-cycle and pipelined processor designs in Verilog.',
    stack: ['Verilog', 'Vivado'],
    imageAlt: 'Concept illustration of a processor chip and five connected pipeline stages',
    details: [
      'Implements instruction decoding, register files, ALU operations, data memory, and control logic across two processor designs.',
      'The pipelined design includes forwarding and load-use hazard detection; the repository contains simulation testbenches and Vivado artifacts.',
      'An educational hardware implementation; no physical chip fabrication or hardware performance result is claimed.',
    ],
  },
]

export const projects: ProjectTypes = featuredProjects
