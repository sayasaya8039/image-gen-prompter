# Image Gen Prompter

<p align="center">
  <img src="icons/icon128.png" alt="Image Gen Prompter Logo" width="128" height="128">
</p>

<p align="center">
  <strong>Ultra-Detail AI Image Prompt Generator</strong><br>
  Transform any image into detailed prompts for AI image generators with a single right-click!
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#supported-platforms">Platforms</a> •
  <a href="#privacy">Privacy</a>
</p>

---

## Features

### Multi-Platform Support
Generate optimized prompts for:
- **Midjourney v6.1** - With `--ar`, `--style` parameters
- **Stable Diffusion XL (SDXL)** - Includes negative prompts
- **Flux.1** - Detailed natural language format
- **DALL-E 3** - Instruction-style prompts
- **All platforms** - Generate for all at once

### 3 AI Engines
Choose your preferred AI for image analysis:
| Engine | Description |
|--------|-------------|
| Google Gemini (Flash) | Fast & Free tier available |
| OpenAI GPT-4o | High quality analysis |
| Anthropic Claude (Sonnet) | Detailed understanding |

### 200+ Attributes Analyzed
- Subject identification & relationships
- Face micro-details & expressions
- Clothing, accessories & styling
- Composition & environment
- 40+ lighting types
- Color science & mood
- Technical camera settings

## Installation

### From Chrome Web Store
*(Coming soon)*

### Manual Installation (Developer Mode)
1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (top right)
4. Click "Load unpacked"
5. Select the extension folder

## Usage

1. **Right-click** on any image on the web
2. Select **"🎯 Generate Prompt"** (or "🎯 プロンプトを生成")
3. Choose your **AI service** and **target platform**
4. Get your detailed prompt instantly!

## API Keys Required

You need at least one API key to use this extension:

| Service | Get API Key | Free Tier |
|---------|-------------|-----------|
| Google Gemini | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) | ✅ Available |
| OpenAI | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) | ❌ Paid only |
| Anthropic Claude | [console.anthropic.com](https://console.anthropic.com/) | ❌ Paid only |

## Privacy

- **Local Storage**: API keys are stored locally in your browser
- **No Server**: No data is sent to our servers
- **Direct API**: Images are processed directly through your chosen AI API

See our full [Privacy Policy](https://sayasaya8039.github.io/image-gen-prompter/)

## Tech Stack

- Chrome Extension Manifest V3
- Vanilla JavaScript
- Google Gemini API / OpenAI API / Anthropic API

## License

MIT License - See [LICENSE](LICENSE) for details

---

<p align="center">
  Made with ❤️ for AI artists and prompt engineers
</p>
