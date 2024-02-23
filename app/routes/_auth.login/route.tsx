import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { validate } from "./validate";
import { createClient } from "~/utils/supabase.server";

export const action = async ({ request }: ActionFunctionArgs) => {
    const headers = new Headers();
    const supabase = createClient(request, headers);

    const formData = await request.formData();
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    let errors: {
        email?: string;
        password?: string;
        supabase?: string;
    } | null = validate(email, password);

    if (errors) return errors;

    const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        errors = { supabase: error.message };
        return errors;
    }
    return redirect("/", { headers });
};

export default function Login() {
    const errors = useActionData<typeof action>();

    return (
        <div className="container w-1/3">
            <h1 className="text-3xl py-5 font-bold">ログイン</h1>
            <Form method="post" action="/login" className="space-y-3 pb-4">
                {errors?.email ? (
                    <p className="text-red-500 py-2">{errors.email}</p>
                ) : null}
                {errors?.password ? (
                    <p className="text-red-500 py-2">{errors.password}</p>
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
