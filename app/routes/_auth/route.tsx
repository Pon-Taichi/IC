import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { createClient } from "~/utils/supabase.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const headers = new Headers();
    const supabase = createClient(request, headers);

    const { data } = await supabase.auth.getSession();
    if (data.session) {
        return redirect("/");
    }

    return null;
};
