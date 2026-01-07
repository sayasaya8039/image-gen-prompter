# ImageGenPrompter 圧縮ルール（絶対遵守）

## 最重要：ファイル書き込み
Write/Editツール直接使用禁止 → JSスクリプト経由のみ
1. C:/Users/Owner/.local/bin/temp-write.js 作成
2. node temp-write.js 実行
3. スクリプト削除

## 基本動作
| ルール | 内容 |
|--------|------|
| 言語 | 日本語で回答 |
| 実行 | Yes/No確認せず最後まで実行 |
| 完了 | デバッグ・ビルドまで完了 |

## パッケージマネージャー優先順位
pnpm > bun > npm

## バージョン管理（必須）
- アプリ更新時は必ずバージョンアップ
- UIにバージョン表示必須
- manifest.json / 定数ファイル 一致必須
- SemVer: X.Y.Z (メジャー.マイナー.パッチ)

## Chrome拡張ルール
- Manifest V3
- eval()禁止、インラインスクリプト禁止
- 出力先: アプリ名フォルダ（dist禁止）
- 権限は最小限に

## コミットプレフィックス
[feat] 新機能 | [fix] バグ修正 | [refactor] リファクタ
[docs] ドキュメント | [test] テスト | [chore] 設定
[style] フォーマット | [perf] パフォーマンス

## コンテキスト管理
- 新鮮なコンテキスト維持
- 長時間作業 → HANDOFF.md作成
- 関係ないトピック → 新しい会話

## 禁止事項
- any型
- APIキーハードコード
- 1000行超ファイル
- 空のcatchブロック
- 古いモデル名使用

## プロジェクト情報
- 名前: Image Gen Prompter
- バージョン: 3.2.0
- 機能: Midjourney/SD/Flux/DALL-E向け超詳細プロンプト生成
- API: Gemini API使用

## ファイル構成
D:extensionsImageGenPrompter├── background.js      (18.6KB) - Service Worker
├── content.js         (2KB)    - コンテンツスクリプト
├── popup.html         (5.4KB)  - ポップアップUI
├── popup.js           (1.3KB)  - ポップアップロジック
├── manifest.json      - Manifest V3
├── icons/             - アイコン
└── .claude/           - Claudeルール
