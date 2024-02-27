import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [{ title: "データ収集" }];
};

export default function Index() {
    return <h1>データ収集</h1>;
}
