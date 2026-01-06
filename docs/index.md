# Privacy Policy for Image Gen Prompter

**Last Updated:** January 7, 2025

## Overview

Image Gen Prompter is a Chrome extension that analyzes images and generates AI image generation prompts using external AI APIs.

## Data Collection and Usage

### What We Collect

1. **API Keys** (User-Provided)
   - Gemini API Key
   - OpenAI API Key
   - Claude API Key
   - These are stored locally in your browser using Chrome's sync storage

2. **Image Data** (Temporary)
   - Images you right-click on are temporarily processed
   - Images are compressed and converted to base64 format
   - Image data is sent to the selected AI API for analysis

### What We Do NOT Collect

- We do not collect personal information
- We do not track browsing history
- We do not store images permanently
- We do not have our own servers - all data goes directly from your browser to the AI API you select

## Third-Party Services

This extension sends image data to the following AI services based on your selection:

1. **Google Gemini API**
   - Privacy Policy: https://policies.google.com/privacy

2. **OpenAI API**
   - Privacy Policy: https://openai.com/policies/privacy-policy

3. **Anthropic Claude API**
   - Privacy Policy: https://www.anthropic.com/privacy

## Data Storage

- API keys are stored locally in your browser using `chrome.storage.sync`
- Generated prompts are temporarily stored in `chrome.storage.local` to display results
- No data is stored on external servers by this extension

## Data Security

- API keys are stored securely in Chrome's built-in storage system
- All API communications use HTTPS encryption
- No data is transmitted to any servers other than the AI API endpoints

## User Rights

You can:
- Delete your API keys at any time through the extension popup
- Uninstall the extension to remove all stored data
- Choose which AI service to use for each request

## Changes to This Policy

We may update this privacy policy from time to time. Any changes will be reflected in the "Last Updated" date above.

## Contact

For questions about this privacy policy, please create an issue on our GitHub repository.

---

© 2025 Image Gen Prompter
