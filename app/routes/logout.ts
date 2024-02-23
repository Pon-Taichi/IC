import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { createClient } from "~/utils/supabase.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const headers = new Headers();
    const supabase = createClient(request, headers);
    await supabase.auth.signOut();

    return redirect("/login", { headers });
};
