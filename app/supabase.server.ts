import { createServerClient, serialize } from "@supabase/ssr";

export const supabaseServerClient = (
    cookies: Record<string, string>,
    headers: Headers
) => {
    return createServerClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(key) {
                    return cookies[key];
                },
                set(key, value, options) {
                    headers.append(
                        "Set-Cookie",
                        serialize(key, value, options)
                    );
                },
                remove(key, options) {
                    headers.append("Set-Cookie", serialize(key, "", options));
                },
            },
        }
    );
};
