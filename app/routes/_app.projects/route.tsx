import { MetaFunction } from "@remix-run/node";
import { SubMenu } from "~/components/submenu";

export const meta: MetaFunction = () => {
    return [
        { title: "プロジェクト" },
        { name: "description", content: "プロジェクト一覧" },
    ];
};

export default function Projects() {
    return (
        <div className="flex h-full">
            <SubMenu />
            <div className="container">
                <h1>プロジェクト</h1>
            </div>
        </div>
    );
}
