# Next.js TODO App

シンプルで使いやすいTODO管理アプリケーション。ユーザー画面と管理者画面を分離したWebアプリケーションです。

## 🚀 デモ

GitHub Pages: [https://koki-yamamoto-system-exe-jp.github.io/koki-yamamoto-0702/nextjs-todo-app/](https://koki-yamamoto-system-exe-jp.github.io/koki-yamamoto-0702/nextjs-todo-app/)

## ✨ 機能

### ユーザー画面
- ✅ TODO作成・編集・削除（CRUD操作）
- ✅ チェックボックスによる完了/未完了の切り替え
- ✅ フィルター機能（全て/進行中/完了済み）
- ✅ ソート機能（作成日/期限日/優先度）
- ✅ 優先度設定（低/中/高）
- ✅ 期限日設定
- ✅ リアルタイム統計表示

### 管理者画面
- ✅ ユーザー画面と管理者画面の分離
- ✅ モード切り替え機能
- ✅ 管理者ダッシュボード

## 🛠️ 技術スタック

- **フロントエンド**: Next.js 14 + TypeScript
- **スタイリング**: Tailwind CSS
- **状態管理**: React Context API
- **データ永続化**: LocalStorage
- **デプロイ**: GitHub Pages + GitHub Actions

## 🏃‍♂️ ローカル開発

### 前提条件

- Node.js 18以上
- npm

### セットアップ

1. リポジトリをクローン
```bash
git clone https://github.com/koki-yamamoto-system-exe-jp/koki-yamamoto-0702.git
cd koki-yamamoto-0702/nextjs-todo-app
```

2. 依存関係をインストール
```bash
npm install
```

3. 開発サーバーを起動
```bash
npm run dev
```

4. ブラウザで [http://localhost:3000](http://localhost:3000) を開く

### ビルド

```bash
npm run build
```

## 🚀 GitHub Pagesへのデプロイ

このプロジェクトはGitHub Actionsを使用して自動的にGitHub Pagesにデプロイされます。

### デプロイ手順

1. **GitHubリポジトリ**
   - リポジトリ: `koki-yamamoto-0702`
   - URL: https://github.com/koki-yamamoto-system-exe-jp/koki-yamamoto-0702

2. **デプロイ用ファイルをコミット・プッシュ**
```bash
git add .
git commit -m "Add GitHub Pages deployment configuration"
git push origin main
```

3. **GitHub Pagesを有効化**
   - GitHubリポジトリの Settings > Pages に移動
   - Source を "GitHub Actions" に設定

4. **自動デプロイ**
   - mainブランチにプッシュすると自動的にデプロイされます
   - GitHub Actionsのワークフローが実行され、ビルドとデプロイが行われます

### 設定ファイル

- `.github/workflows/deploy.yml`: GitHub Actionsワークフロー
- `next.config.js`: GitHub Pages用の静的エクスポート設定

## 📁 プロジェクト構成

```
nextjs-todo-app/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actionsワークフロー
├── src/
│   ├── app/
│   │   ├── layout.tsx          # ルートレイアウト
│   │   ├── page.tsx            # メインページ
│   │   └── globals.css         # グローバルスタイル
│   ├── components/
│   │   ├── layout/
│   │   │   └── Header.tsx      # ヘッダーコンポーネント
│   │   └── todo/
│   │       ├── TodoCard.tsx    # TODOカードコンポーネント
│   │       └── TodoForm.tsx    # TODO作成フォーム
│   ├── contexts/
│   │   └── TodoContext.tsx     # TODO状態管理
│   ├── lib/
│   │   ├── storage.ts          # LocalStorage操作
│   │   └── utils.ts            # ユーティリティ関数
│   └── types/
│       └── todo.ts             # TypeScript型定義
├── .gitignore
├── next.config.js              # Next.js設定
├── package.json
├── tailwind.config.js          # Tailwind CSS設定
└── README.md
```

## 🎯 使用方法

1. **TODO追加**: 「+ 新しいTODOを追加」ボタンをクリック
2. **TODO完了**: チェックボックスをクリックして完了/未完了を切り替え
3. **フィルター**: 「全て」「進行中」「完了済み」でTODOを絞り込み
4. **ソート**: 「作成日」「期限日」「優先度」でTODOを並び替え
5. **管理者モード**: 右上の「管理者モード」ボタンで管理者画面に切り替え

## 📝 ライセンス

MIT License

## 🤝 コントリビューション

プルリクエストやイシューの報告を歓迎します！

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成