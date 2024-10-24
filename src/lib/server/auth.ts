import { dev } from "$app/environment";
import { users, sessions } from "./db";
import type { User } from "./db";

export async function createSession(userId: string): Promise<string> {
  const sessionId = crypto.randomUUID();
  const expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days
  
  await sessions.create(sessionId, userId, expiresAt);
  return sessionId;
}

export async function validateSession(sessionId: string): Promise<User | null> {
  const session = await sessions.get(sessionId);
  if (!session || session.expiresAt < Date.now()) {
    return null;
  }
  
  return await users.get(session.userId);
}

export async function createGuestUser(): Promise<User> {
  const userId = crypto.randomUUID();
  await users.create(userId, null, true);
  return await users.get(userId);
}

export function getSessionCookie(sessionId: string) {
  return {
    name: 'session',
    value: sessionId,
    path: '/',
    httpOnly: true,
    secure: !dev,
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  };
}