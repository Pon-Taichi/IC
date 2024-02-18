import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { parse } from "@supabase/ssr";
import { supabaseServerClient } from "~/supabase.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const cookies = parse(request.headers.get("Cookie") ?? "");
    const headers = new Headers();
    const supabase = supabaseServerClient(cookies, headers);

    const { data } = await supabase.auth.getSession();
    if (data.session) {
        return redirect("/");
    }

    return null;
};
