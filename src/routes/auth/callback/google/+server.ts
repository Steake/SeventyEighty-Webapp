import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ cookies, url }) => {
  // Since we don't have Google OAuth implemented yet, 
  // redirect to login page with error
  throw redirect(302, "/auth/login?error=oauth");
};