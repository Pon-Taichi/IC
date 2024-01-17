import type { MetaFunction } from "@remix-run/node";
import { SubMenu } from "~/components/submenu";

export const meta: MetaFunction = () => {
    return [
        { title: "IC" },
        { name: "description", content: "Financial System" },
    ];
};

export default function Index() {
    return (
        <div className="flex h-full">
            <SubMenu />
            <div className="container">
                <h1>ダッシュボード</h1>
            </div>
        </div>
    );
}
