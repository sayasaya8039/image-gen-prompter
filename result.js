// Result page script - v4.0.6
document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.local.get(['resultData'], function(data) {
    if (!data.resultData) {
      document.getElementById('app').innerHTML = '<div class="loading">データがありません</div>';
      return;
    }

    var result = data.resultData.result;
    var serviceName = data.resultData.serviceName;
    var platform = data.resultData.platform;
    var imageUrl = data.resultData.imageUrl;

    var app = document.getElementById('app');

    // Header
    var header = document.createElement('div');
    header.className = 'header';

    var img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'Source';
    img.addEventListener('error', function() {
      this.style.display = 'none';
    });

    var headerInfo = document.createElement('div');
    headerInfo.className = 'header-info';

    var h1 = document.createElement('h1');
    h1.textContent = '🎯 プロンプト生成完了';

    var meta = document.createElement('div');
    meta.className = 'meta';

    var badge1 = document.createElement('span');
    badge1.className = 'badge';
    badge1.textContent = serviceName;

    var badge2 = document.createElement('span');
    badge2.className = 'badge';
    badge2.textContent = platform;

    meta.appendChild(badge1);
    meta.appendChild(badge2);
    headerInfo.appendChild(h1);
    headerInfo.appendChild(meta);

    header.appendChild(img);
    header.appendChild(headerInfo);

    // Content
    var content = document.createElement('div');
    content.className = 'content';

    var promptText = document.createElement('div');
    promptText.className = 'prompt-text';
    promptText.textContent = result;

    content.appendChild(promptText);

    // Actions
    var actions = document.createElement('div');
    actions.className = 'actions';

    var copyBtn = document.createElement('button');
    copyBtn.className = 'btn btn-primary';
    copyBtn.id = 'copyBtn';
    copyBtn.textContent = '📋 コピー';

    var closeBtn = document.createElement('button');
    closeBtn.className = 'btn btn-secondary';
    closeBtn.textContent = '✕ 閉じる';

    actions.appendChild(copyBtn);
    actions.appendChild(closeBtn);

    // Clear and append
    app.innerHTML = '';
    app.appendChild(header);
    app.appendChild(content);
    app.appendChild(actions);

    // Event listeners
    copyBtn.addEventListener('click', function() {
      navigator.clipboard.writeText(result).then(function() {
        copyBtn.textContent = '✅ コピーしました！';
        copyBtn.classList.add('copied');
        setTimeout(function() {
          copyBtn.textContent = '📋 コピー';
          copyBtn.classList.remove('copied');
        }, 2000);
      });
    });

    closeBtn.addEventListener('click', function() {
      window.close();
    });
  });
});