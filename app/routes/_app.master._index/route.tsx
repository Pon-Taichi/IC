import { useLoaderData } from "@remix-run/react";
import { accounts } from "drizzle/schema";
import { db } from "~/utils/drizzle.server";

export const loader = async () => {
    const result = await db.select().from(accounts);
    return { result };
};

export default function MasterIndex() {
    const { result } = useLoaderData<typeof loader>();
    return (
        <>
            <ul>
                <li>勘定科目設定</li>
                <li>会社設定</li>
            </ul>
        </>
    );
}
