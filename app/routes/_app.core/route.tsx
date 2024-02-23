import { MetaFunction } from "@remix-run/node";
import { SubMenu } from "~/routes/_app/submenu";

export const meta: MetaFunction = () => {
    return [{ title: "データ入力" }];
};

export default function Projects() {
    return (
        <div className="flex h-full">
            <SubMenu />
            <div className="container">
                <h1>データ入力</h1>
            </div>
        </div>
    );
}
