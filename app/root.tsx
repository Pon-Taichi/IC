import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLocation,
    useRouteLoaderData,
} from "@remix-run/react";
import "./tailwind.css";
import Header from "./components/layout/header";

export function Layout({ children }: { children: React.ReactNode }) {
    const location = useLocation();

    const data = useRouteLoaderData<typeof clientLoader>("root");

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body>
                {location.pathname === "/login" ? (
                    <Outlet />
                ) : (
                    <div className="flex flex-col h-screen">
                        <div>
                            <Header menuList={data?.menuList ?? []} />
                        </div>

                        <div className="flex-grow">{children}</div>
                    </div>
                )}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export const clientLoader = () => {
    const menuList = [
        { name: "ダッシュボード", href: "/" },
        { name: "マスタ", href: "/master" },
        {
            name: "データ入力",
            href: "/core",
        },
        { name: "連結決算", href: "/consolidates" },
        // { name: "レポート", href: "/reports" },

        // { name: "設定", href: "/settings" },
    ];
    return { menuList };
};

export default function App() {
    return <Outlet />;
}

export function HydrateFallback() {
    return <p>Loading...</p>;
}
