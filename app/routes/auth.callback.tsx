import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { parse } from "@supabase/ssr";
import { supabaseServerClient } from "~/supabase.server";

export async function loader({ request }: LoaderFunctionArgs) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");
    const next = requestUrl.searchParams.get("next") || "/";
    const headers = new Headers();

    if (code) {
        const cookies = parse(request.headers.get("Cookie") ?? "");
        const supabase = supabaseServerClient(cookies, headers);

        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            return redirect(next, { headers });
        }
    }

    // return the user to an error page with instructions
    return redirect("/signup", { headers });
}
