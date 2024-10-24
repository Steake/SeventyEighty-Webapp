import { sessions } from "$lib/server/db";
import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ cookies, locals }) => {
  const sessionId = cookies.get('session');
  
  if (sessionId) {
    await sessions.delete(sessionId);
    cookies.delete('session', { path: '/' });
  }
  
  throw redirect(302, "/");
};