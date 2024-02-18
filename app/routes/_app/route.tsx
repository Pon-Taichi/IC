import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { parse } from "@supabase/ssr";
import Header from "~/routes/_app/header";
import { supabaseServerClient } from "~/supabase.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const cookies = parse(request.headers.get("Cookie") ?? "");
    const headers = new Headers();

    const supabase = supabaseServerClient(cookies, headers);

    const { data, error } = await supabase.auth.getSession();

    if (!data.session || error) {
        return redirect("/login");
    }

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
    return { menuList };
};

export default function App() {
    const { menuList } = useLoaderData<typeof loader>();
    return (
        <div className="flex flex-col h-screen">
            <div>
                <Header menuList={menuList} />
            </div>

            <div className="flex-grow">
                <Outlet />
            </div>
        </div>
    );
}
