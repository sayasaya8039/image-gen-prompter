# 【Chrome拡張機能】Image Gen Prompter v4.0.6 - 画像からAIプロンプトを自動生成

## はじめに

AI画像生成を使っていて、こんな経験はありませんか？

- 「この画像と同じような絵を生成したいけど、プロンプトが書けない...」
- 「参考画像のスタイルを言葉にできない...」
- 「毎回プロンプトを考えるのが面倒...」

そんな悩みを解決するChrome拡張機能「**Image Gen Prompter**」を公開しました！

---

## Image Gen Prompterとは？

**右クリック一発で、任意の画像から詳細なAIプロンプトを自動生成**するChrome拡張機能です。

Midjourney、Stable Diffusion、Flux、DALL-Eなど、主要なAI画像生成サービス向けに最適化されたプロンプトを瞬時に作成できます。

---

## 主な機能

### 🎯 マルチプラットフォーム対応

以下のサービス向けに最適化されたプロンプトを生成：

| プラットフォーム | 特徴 |
|----------------|------|
| Midjourney v6.1 | `--ar`、`--style`などのパラメータ付き |
| Stable Diffusion XL | ネガティブプロンプト対応 |
| Flux.1 | 詳細な自然言語形式 |
| DALL-E 3 | 指示形式のプロンプト |

### 🤖 3つのAIエンジン

お好みのAIを選択可能：

- **Google Gemini (Flash)** - 高速＆無料枠あり
- **OpenAI GPT-4o** - 高品質な分析
- **Anthropic Claude (Sonnet)** - 詳細な理解力

### 📊 200以上の属性を分析

- 被写体の識別と関係性
- 顔の細部と表情
- 服装・アクセサリー・スタイリング
- 構図と環境
- 40種類以上のライティング
- 色彩とムード
- カメラ設定（レンズ、アングルなど）

---

## 使い方

### 1. インストール

Chrome Web Storeからインストール（審査中）
または、GitHubからソースをダウンロードして開発者モードでインストール

### 2. APIキーを設定

拡張機能のアイコンをクリックして、お持ちのAPIキーを入力：

- **Gemini API**（無料枠あり）: https://aistudio.google.com/apikey
- **OpenAI API**: https://platform.openai.com/api-keys
- **Claude API**: https://console.anthropic.com/

### 3. プロンプト生成

1. 任意の画像を**右クリック**
2. 「**🎯 プロンプトを生成**」を選択
3. AIサービスとプラットフォームを選択
4. 詳細なプロンプトが即座に生成！

---

## 実際の使用例

### Before（手動でプロンプトを書く場合）

```
woman, portrait, beautiful
```

### After（Image Gen Prompterを使用）

```
A young woman with delicate features, porcelain skin with subtle
freckles across the bridge of her nose, honey-brown eyes with
golden flecks catching soft window light, naturally wavy
chestnut hair with caramel highlights cascading over shoulders,
wearing an oversized cream knit sweater, soft golden hour
lighting from the left creating gentle shadows, shallow depth
of field with creamy bokeh background, shot on Sony A7IV with
85mm f/1.4 lens, intimate portrait composition --ar 3:4 --style raw
```

**圧倒的な情報量の差！**

---

## プライバシーについて

- APIキーはブラウザ内にローカル保存
- 当社サーバーへのデータ送信なし
- 選択したAI APIに直接通信

詳細: https://sayasaya8039.github.io/image-gen-prompter/

---

## リンク

- **GitHub**: https://github.com/sayasaya8039/image-gen-prompter
- **Chrome Web Store**: （審査中）

---

## 更新履歴

### v4.0.6 (2026/01/07)
- 初回公開リリース
- Gemini / OpenAI / Claude API対応
- Midjourney / SDXL / Flux / DALL-E対応
- 日本語・英語UI

---

## 最後に

AI画像生成のプロンプト作成を効率化したい方は、ぜひ試してみてください！

質問やフィードバックがあれば、GitHubのIssueまたはコメントでお知らせください。

---

#AI画像生成 #Midjourney #StableDiffusion #DALL-E #Chrome拡張機能 #プロンプトエンジニアリング
