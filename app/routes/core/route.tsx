import { MetaFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import SubMenu from "~/components/layout/submenu";

export const meta: MetaFunction = () => {
    return [{ title: "データ入力" }];
};

export const clientLoader = () => {
    const submenuList = [
        { name: "財務数値", href: "#" },
        { name: "グループ内取引", href: "#" },
    ];

    return { submenuList };
};

export default function Core() {
    const { submenuList } = useLoaderData<typeof clientLoader>();

    return (
        <div className="flex h-full">
            <SubMenu submenuList={submenuList} />
            <div className="container">
                <Outlet />
            </div>
        </div>
    );
}
