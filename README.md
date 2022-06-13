This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev

# read .env
yarn add posthog-js


problem

The Serverless Function exceeds the maximum size limit of 50mb

use .vercelignore

# 自定义的Search不要跟react-notion-x重名.

# input 截流防抖动
  const changeHandler = (value) => {
    if (!value) return
    const result = searchNotion({
        query:value,
        ancestorId: config.rootNotionPageId,
    });
    console.log(value)
  };

  const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 300), []);

  useEffect(()=>{
    return()=>{
      debouncedChangeHandler.cancel();
    }
  })

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## problem
1、图片资源太大
引入`.vercelignore`加入api的过滤
2、加入`.vercelignore`过滤会过滤掉缓存的页面
需要对api下面加一层，单独对图片目录过滤
3、<components.Link 使用url会跳转到新的页面
因为转为a标签带有`target="_blank"` 改为`target=""·`
4、定时任务
yarn add node-schedule
