// Image Gen Prompter - Background Script
// Version: 4.0.5 - API Only + Stable Context Menu

const PLATFORMS = [
  { id: 'Midjourney', name: '🎨 Midjourney v6.1' },
  { id: 'SDXL', name: '🖼️ SDXL' },
  { id: 'Flux', name: '⚡ Flux.1' },
  { id: 'DALLE', name: '🌈 DALL-E 3' },
  { id: 'All', name: '📦 全プラットフォーム' }
];

const SERVICES = [
  { id: 'gemini', name: '✨ Gemini API' },
  { id: 'openai', name: '🤖 OpenAI API' },
  { id: 'claude', name: '🧠 Claude API' }
];

// コンテキストメニュー作成関数
function createContextMenus() {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: 'imageGenPrompter',
      title: '🎯 プロンプトを生成',
      contexts: ['image']
    });

    SERVICES.forEach(service => {
      chrome.contextMenus.create({
        id: service.id,
        parentId: 'imageGenPrompter',
        title: service.name,
        contexts: ['image']
      });

      PLATFORMS.forEach(platform => {
        chrome.contextMenus.create({
          id: service.id + '_' + platform.id,
          parentId: service.id,
          title: platform.name,
          contexts: ['image']
        });
      });
    });
    
    console.log('Context menus created');
  });
}

// インストール時
chrome.runtime.onInstalled.addListener(() => {
  createContextMenus();
});

// Chrome起動時
chrome.runtime.onStartup.addListener(() => {
  createContextMenus();
});

// Service Worker起動時にもメニューを確認・作成
createContextMenus();

// メニュークリック処理
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  const menuId = info.menuItemId;
  if (typeof menuId !== 'string' || !menuId.includes('_')) return;

  const [service, platform] = menuId.split('_');
  const imageUrl = info.srcUrl;

  try {
    showNotification('処理開始', '🔄 画像を分析中...');

    const { geminiApiKey, openaiApiKey, claudeApiKey } = await chrome.storage.sync.get([
      'geminiApiKey', 'openaiApiKey', 'claudeApiKey'
    ]);

    let apiKey;
    let serviceName;
    if (service === 'gemini') {
      apiKey = geminiApiKey;
      serviceName = 'Gemini';
    } else if (service === 'openai') {
      apiKey = openaiApiKey;
      serviceName = 'OpenAI';
    } else if (service === 'claude') {
      apiKey = claudeApiKey;
      serviceName = 'Claude';
    }

    if (!apiKey) {
      showNotification('エラー', '❌ ' + serviceName + ' APIキーが設定されていません');
      return;
    }

    const { base64, mimeType } = await fetchImageAsBase64(imageUrl);
    let result;

    if (service === 'gemini') {
      result = await callGemini(base64, mimeType, apiKey, platform);
    } else if (service === 'openai') {
      result = await callOpenAI(base64, mimeType, apiKey, platform);
    } else if (service === 'claude') {
      result = await callClaude(base64, mimeType, apiKey, platform);
    }

    // 結果をストレージに保存してポップアップを開く
    await chrome.storage.local.set({
      resultData: { result, serviceName, platform, imageUrl }
    });
    
    await chrome.windows.create({
      url: chrome.runtime.getURL('result.html'),
      type: 'popup',
      width: 600,
      height: 700
    });
    
    // クリップボードにもコピー
    await copyToClipboard(result, tab.id);
    showNotification('完了', '✅ プロンプト生成完了！');

  } catch (error) {
    console.error('Error:', error);
    showNotification('エラー', '❌ ' + (error.message || 'Unknown error'));
  }
});

// 画像取得・圧縮
async function fetchImageAsBase64(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  
  const bitmap = await createImageBitmap(blob);
  const maxSize = 1024;
  let width = bitmap.width;
  let height = bitmap.height;
  
  if (width > maxSize || height > maxSize) {
    if (width > height) {
      height = Math.round(height * maxSize / width);
      width = maxSize;
    } else {
      width = Math.round(width * maxSize / height);
      height = maxSize;
    }
  }
  
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(bitmap, 0, 0, width, height);
  
  const resultBlob = await canvas.convertToBlob({ type: 'image/jpeg', quality: 0.85 });
  const base64 = await blobToBase64(resultBlob);
  return { base64, mimeType: 'image/jpeg' };
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result;
      const base64 = dataUrl.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Gemini API
async function callGemini(base64, mimeType, apiKey, platform) {
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + apiKey;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [
          { text: getAnalysisPrompt(platform) },
          { inline_data: { mime_type: mimeType, data: base64 } }
        ]
      }],
      generationConfig: { temperature: 0.3, maxOutputTokens: 8192 }
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error('Gemini API Error: ' + (error.error?.message || response.status));
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
}

// OpenAI API (GPT-4o)
async function callOpenAI(base64, mimeType, apiKey, platform) {
  const url = 'https://api.openai.com/v1/chat/completions';
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + apiKey
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [{
        role: 'user',
        content: [
          { type: 'text', text: getAnalysisPrompt(platform) },
          { type: 'image_url', image_url: { url: 'data:' + mimeType + ';base64,' + base64 } }
        ]
      }],
      max_tokens: 4096,
      temperature: 0.3
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error('OpenAI API Error: ' + (error.error?.message || response.status));
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || 'No response';
}

// Claude API (Sonnet)
async function callClaude(base64, mimeType, apiKey, platform) {
  const url = 'https://api.anthropic.com/v1/messages';
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [{
        role: 'user',
        content: [
          { type: 'image', source: { type: 'base64', media_type: mimeType, data: base64 } },
          { type: 'text', text: getAnalysisPrompt(platform) }
        ]
      }]
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error('Claude API Error: ' + (error.error?.message || response.status));
  }

  const data = await response.json();
  return data.content?.[0]?.text || 'No response';
}

// 分析プロンプト生成
function getAnalysisPrompt(platform) {
  const basePrompt = `You are an expert AI image prompt engineer. Analyze this image with extreme precision and generate a detailed prompt.

ANALYSIS CATEGORIES (200+ attributes):
1. SUBJECT IDENTIFICATION: Type, quantity, prominence, relationships
2. FACE MICRO-DETAILS: Eye shape/color/gaze, eyebrows, nose, lips, expression microexpressions
3. HAIR & HEAD: Style, texture, color, length, accessories, headwear
4. POSE & GESTURE: Body position, hand placement, weight distribution, dynamism
5. CLOTHING & ACCESSORIES: Style, fabric, fit, layers, jewelry, props
6. COMPOSITION: Rule of thirds, leading lines, negative space, depth layers
7. ENVIRONMENT: Setting type, atmosphere, time of day, weather, background elements
8. LIGHTING (40+ types): Direction, quality, color temperature, shadows, highlights, rim light
9. COLOR SCIENCE: Palette, harmony, saturation, contrast, mood colors
10. STYLE & TECHNICAL: Art movement, camera settings, post-processing, render quality

`;

  const platformPrompts = {
    Midjourney: basePrompt + `OUTPUT FORMAT FOR MIDJOURNEY v6.1:
- Single flowing paragraph, 300-500 words
- Start with main subject, then details
- Include: --ar [aspect], --style raw, --v 6.1
- Use evocative, descriptive language
- End with technical parameters`,
    
    SDXL: basePrompt + `OUTPUT FORMAT FOR SDXL:
Generate TWO sections:
POSITIVE: Detailed comma-separated tags, quality boosters (masterpiece, best quality, highly detailed)
NEGATIVE: Unwanted elements (worst quality, low quality, blurry, deformed)`,
    
    Flux: basePrompt + `OUTPUT FORMAT FOR FLUX.1:
- Natural language description
- Focus on composition and lighting
- Technical but readable
- 150-300 words`,
    
    DALLE: basePrompt + `OUTPUT FORMAT FOR DALL-E 3:
- Clear, descriptive sentences
- Specify style explicitly
- Include mood and atmosphere
- 100-200 words`,
    
    All: basePrompt + `OUTPUT ALL FORMATS:
=== MIDJOURNEY v6.1 ===
[300-500 word flowing paragraph with --ar and --v 6.1]

=== SDXL ===
POSITIVE: [comma-separated tags]
NEGATIVE: [unwanted elements]

=== FLUX.1 ===
[150-300 word natural description]

=== DALL-E 3 ===
[100-200 word clear description]`
  };

  return platformPrompts[platform] || platformPrompts.All;
}

// クリップボードにコピー
async function copyToClipboard(text, tabId) {
  try {
    await chrome.scripting.executeScript({
      target: { tabId },
      func: (text) => navigator.clipboard.writeText(text),
      args: [text]
    });
  } catch (error) {
    console.error('Clipboard error:', error);
  }
}

// 通知表示
function showNotification(title, message) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icons/icon128.png',
    title: 'Image Gen Prompter: ' + title,
    message: message
  });
}