import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import {} from "@supabase/supabase-js";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { supabaseServerClient } from "~/supabase.server";
import { validate } from "./validate";
import { parse } from "@supabase/ssr";

export const action = async ({ request }: ActionFunctionArgs) => {
    const cookies = parse(request.headers.get("Cookie") ?? "");
    const headers = new Headers();

    const supabase = supabaseServerClient(cookies, headers);

    const formData = await request.formData();
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const passwordCheck = String(formData.get("password-check"));

    let errors: {
        email?: string;
        password?: string;
        passwordCheck?: string;
        supabase?: string;
    } | null = validate(email, password, passwordCheck);

    if (errors) return errors;

    const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });

    if (error) {
        errors = { supabase: error.message };
        return errors;
    }

    return redirect("/signup/success");
};

export default function Signup() {
    const errors = useActionData<typeof action>();

    return (
        <div className="container w-1/3">
            <h1 className="text-3xl py-5 font-bold">新規登録</h1>
            <Form method="post" action="/signup" className="space-y-2 py-3">
                {errors?.email ? (
                    <p className="text-red-500 py-2">{errors.email}</p>
                ) : null}
                {errors?.password ? (
                    <p className="text-red-500 py-2">{errors.password}</p>
                ) : null}
                {errors?.passwordCheck ? (
                    <p className="text-red-500 py-2">{errors.passwordCheck}</p>
                ) : null}
                {errors?.supabase ? (
                    <p className="text-red-500 py-2">{errors.supabase}</p>
                ) : null}
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
                    <Label htmlFor="password-check">パスワード（確認用）</Label>
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
