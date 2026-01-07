// Image Gen Prompter - Content Script
// Version: 1.2.0

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('[IGP] Message:', request.type);
  
  if (request.type === 'fetchImage') {
    fetchImage(request.url)
      .then(data => sendResponse(data))
      .catch(err => sendResponse({ error: err.message }));
    return true;
  }
  
  if (request.type === 'copyToClipboard') {
    navigator.clipboard.writeText(request.text)
      .then(() => {
        showToast('✅ プロンプトをコピーしました！');
        sendResponse({ success: true });
      })
      .catch(err => sendResponse({ error: err.message }));
    return true;
  }
  
  if (request.type === 'showToast') {
    showToast(request.message, request.duration);
    sendResponse({ success: true });
  }
});

async function fetchImage(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve({
      base64: reader.result.split(',')[1],
      mimeType: blob.type || 'image/jpeg'
    });
    reader.onerror = () => reject(new Error('Failed to read image'));
    reader.readAsDataURL(blob);
  });
}

function showToast(message, duration = 3000) {
  const existing = document.getElementById('igp-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'igp-toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 12px;
    font-family: system-ui, sans-serif;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 10px 40px rgba(102, 126, 234, 0.4);
    z-index: 2147483647;
  `;

  document.body.appendChild(toast);
  if (duration > 0) {
    setTimeout(() => toast.remove(), duration);
  }
}
