import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export const action = async ({ request }: ActionFunctionArgs) => {
    const supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!
    );

    const formData = await request.formData();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const passwordCheck = formData.get("password-check")?.toString();

    if (!email || !password || !passwordCheck) {
        return json({ message: "必須項目を入力してください" }, { status: 400 });
    }

    if (password !== passwordCheck) {
        return json({ message: "パスワードが一致しません" }, { status: 400 });
    }

    const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            emailRedirectTo: "/auth/callback",
        },
    });

    if (error) {
        return json({ message: error.message }, { status: error.status });
    }

    return redirect("/signup/success");
};

export default function Signup() {
    const data = useActionData<typeof action>();
    console.log(data);

    return (
        <div className="container w-1/3">
            <h1 className="text-3xl py-5 font-bold">新規登録</h1>
            {data ? <p className="text-red-500 py-2">{data.message}</p> : ""}
            <Form method="post" action="/signup" className="space-y-2 py-3">
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
                <div>
                    <Label htmlFor="password-check">パスワード確認</Label>
                    <Input
                        type="password"
                        id="password-check"
                        name="password-check"
                        required
                    />
                </div>
                <Button type="submit">登録</Button>
            </Form>
        </div>
    );
}
