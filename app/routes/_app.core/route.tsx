import { MetaFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import SubMenu from "~/routes/_app/submenu";

export const meta: MetaFunction = () => {
    return [{ title: "データ入力" }];
};

export const loader = () => {
    const submenuList = [
        { name: "データ", href: "#" },
        { name: "マスタ", href: "#" },
    ];

    return { submenuList };
};

export default function Core() {
    const { submenuList } = useLoaderData<typeof loader>();

    return (
        <div className="flex h-full">
            <SubMenu submenuList={submenuList} />
            <div className="container">
                <Outlet />
            </div>
        </div>
    );
}
