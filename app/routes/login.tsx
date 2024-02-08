import { Form, Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function Login() {
    return (
        <div className="container w-1/3">
            <h1 className="text-3xl py-5 font-bold">ログイン</h1>
            <Form method="post" action="/login" className="space-y-2 py-3">
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" name="email" required />
                </div>
                <div>
                    <Label htmlFor="password">パスワード</Label>
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        required
                    />
                </div>
                <Button type="submit">ログイン</Button>
            </Form>
            <Link
                to={"/signup"}
                className="hover:border-b hover:border-slate-800"
            >
                新規登録はこちら
            </Link>
        </div>
    );
}
