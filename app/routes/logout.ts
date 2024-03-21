import { redirect } from "@remix-run/react";

export const clientLoader = () => {
    return redirect("/login");
};
