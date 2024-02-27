import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import Header from "~/routes/_app/header";
import { createClient } from "~/utils/supabase.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const headers = new Headers();
    const supabase = createClient(request, headers);

    const { data, error } = await supabase.auth.getSession();

    if (!data.session || error) {
        return redirect("/login");
    }

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
