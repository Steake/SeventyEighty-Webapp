import { auth, googleAuth } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ cookies, url, locals }) => {
  const storedState = cookies.get("google_oauth_state");
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");

  if (!storedState || !state || storedState !== state || !code) {
    throw new Error("Invalid state or code");
  }

  try {
    const { getExistingUser, googleUser, createUser } = await googleAuth.validateCallback(code);

    const getUser = async () => {
      const existingUser = await getExistingUser();
      if (existingUser) return existingUser;

      const user = await createUser({
        attributes: {
          email: googleUser.email,
          guest: false
        }
      });

      return user;
    };

    const user = await getUser();
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {}
    });

    const sessionCookie = auth.createSessionCookie(session);
    cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    });

    throw redirect(302, "/");
  } catch (e) {
    throw redirect(302, "/auth/login?error=oauth");
  }
};