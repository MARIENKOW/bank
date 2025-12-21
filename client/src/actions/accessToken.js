"use server";

import { cookies } from "next/headers";

export async function getAccessTokenUser() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;
    return accessToken;
}
export async function getAccessTokenAdmin() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessTokenAdmin")?.value || null;
    return accessToken;
}
