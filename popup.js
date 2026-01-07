// Image Gen Prompter - Popup Script
// Version: 4.0.0

document.addEventListener('DOMContentLoaded', async () => {
  const geminiApiKeyInput = document.getElementById('geminiApiKey');
  const openaiApiKeyInput = document.getElementById('openaiApiKey');
  const claudeApiKeyInput = document.getElementById('claudeApiKey');
  const saveBtn = document.getElementById('saveBtn');
  const status = document.getElementById('status');

  // 保存済みの設定を読み込み
  const { geminiApiKey, openaiApiKey, claudeApiKey } = await chrome.storage.sync.get([
    'geminiApiKey', 'openaiApiKey', 'claudeApiKey'
  ]);

  if (geminiApiKey) geminiApiKeyInput.value = geminiApiKey;
  if (openaiApiKey) openaiApiKeyInput.value = openaiApiKey;
  if (claudeApiKey) claudeApiKeyInput.value = claudeApiKey;

  saveBtn.addEventListener('click', async () => {
    const geminiApiKey = geminiApiKeyInput.value.trim();
    const openaiApiKey = openaiApiKeyInput.value.trim();
    const claudeApiKey = claudeApiKeyInput.value.trim();

    if (!geminiApiKey && !openaiApiKey && !claudeApiKey) {
      showStatus('少なくとも1つのAPIキーを入力してください', 'error');
      return;
    }

    try {
      await chrome.storage.sync.set({ geminiApiKey, openaiApiKey, claudeApiKey });
      showStatus('設定を保存しました！', 'success');
    } catch (error) {
      showStatus('保存に失敗しました: ' + error.message, 'error');
    }
  });

  function showStatus(message, type) {
    status.textContent = message;
    status.className = 'status ' + type;
    setTimeout(() => { status.className = 'status'; }, 3000);
  }
});