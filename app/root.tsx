import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    json,
    useLoaderData,
} from "@remix-run/react";
import styles from "./tailwind.css";
import Header from "./components/header";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: styles },
    ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = () => {
    const menuList = [
        { name: "ダッシュボード", href: "/" },
        { name: "プロジェクト", href: "/projects" },
        {
            name: "入力",
            href: "/input",
        },
        { name: "レポート", href: "/reports" },
        { name: "設定", href: "/settings" },
    ];
    return json({ menuList });
};

export default function App() {
    const { menuList } = useLoaderData<typeof loader>();

    return (
        <html lang="ja">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body className="font-sans">
                <div className="flex flex-col h-screen">
                    <div>
                        <Header menuList={menuList} />
                    </div>

                    <div className="flex-grow">
                        <Outlet />
                    </div>
                </div>

                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
