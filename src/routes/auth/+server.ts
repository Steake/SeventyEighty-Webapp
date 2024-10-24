import { createGuestUser, createSession, getSessionCookie } from "$lib/server/auth";
import type { RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const data = await request.formData();
    const action = data.get("action");

    if (action === "guest") {
      const user = await createGuestUser();
      const sessionId = await createSession(user.id);
      const cookie = getSessionCookie(sessionId);

      cookies.set(cookie.name, cookie.value, {
        path: cookie.path,
        httpOnly: cookie.httpOnly,
        secure: cookie.secure,
        sameSite: cookie.sameSite,
        maxAge: cookie.maxAge
      });

      return json({ success: true });
    }

    return json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Auth error:", error);
    return json({ error: "An error occurred" }, { status: 500 });
  }
};