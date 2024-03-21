import { MetaFunction } from "@remix-run/node";
import SubMenu from "~/components/layout/submenu";

export const meta: MetaFunction = () => {
    return [{ title: "連結決算" }];
};

export default function Projects() {
    return (
        <div className="flex h-full">
            <SubMenu submenuList={[]} />
            <div className="container">
                <h1>連結決算</h1>
            </div>
        </div>
    );
}
