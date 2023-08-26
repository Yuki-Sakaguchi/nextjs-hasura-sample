# Next.js + Hasura + Apollo Client で GraphQL の開発を学ぶ

- Next.js
- Hasura
- Apollo Client
- TailwindCSS
- Jest
- msw
- next-page-tester

## 参考
- https://www.udemy.com/course/hasura-nextjs-hasura-apollo-client-graphql-web/
- https://github.com/GomaGoma676/nextjs-hasura-basic-lesson

## ざっくり学んだこと

細かくは学習中のコミットにコメントを書いた

- Hasura の管理画面の操作方法
- どうやってコードを自動生成するのか
  - https://github.com/Yuki-Sakaguchi/nextjs-hasura-sample/commit/9b0589caf713e840f6f44ba106c97f5a9f00a626
- Apollo Client を用いた状態管理
  - https://github.com/Yuki-Sakaguchi/nextjs-hasura-sample/commit/44820ad1ec42bca66400496cc2b6bc5cb162573f
- Apollo Client の初期化方法
  - https://github.com/Yuki-Sakaguchi/nextjs-hasura-sample/commit/17e954a0f78e2aeb6ecd4ffe7f27b9d5b1ee498d
- `@client` がついているだけでキャッシュを見に行くクエリになる
  - https://github.com/Yuki-Sakaguchi/nextjs-hasura-sample/commit/e59fe011afa2a7c6ef2f73678e71cb996e761342
- 4つのデータ取得ポリシー（`cache-first`, `network-only`, `cache-and-network`, `no-cache`）
  - https://github.com/Yuki-Sakaguchi/nextjs-hasura-sample/commit/df26b5b8d59e0a4c1001d9eedc0ef39d7eccc996
- クライアントからCRUDを試す
  - https://github.com/Yuki-Sakaguchi/nextjs-hasura-sample/commit/479eeb9a3ae7c49b7add90cca4d118cbf92baa1d
- 自動生成のソースをいじった、ビルド時にエラーになった時の解決方法
  - https://github.com/Yuki-Sakaguchi/nextjs-hasura-sample/commit/cc5c42989c2439b2fdb306875c660b72d6c5c90d
- カスタムフックは `useCallback` を全てやった方がいい
  - https://github.com/Yuki-Sakaguchi/nextjs-hasura-sample/commit/b28fa270b09d23a92e91b9c755c4174a7b184305
 
