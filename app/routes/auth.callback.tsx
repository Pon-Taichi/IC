import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { createClient } from "~/utils/supabase.server";

export async function loader({ request }: LoaderFunctionArgs) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");
    const next = requestUrl.searchParams.get("next") || "/";
    const headers = new Headers();

    if (code) {
        const supabase = createClient(request, headers);

        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            return redirect(next, { headers });
        }
    }

    // return the user to an error page with instructions
    return redirect("/signup", { headers });
}
