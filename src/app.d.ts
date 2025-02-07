declare global {
  namespace App {
    interface Locals {
      user?: {
        id: string;
        email: string | null;
        guest: boolean;
      };
    }
  }
}

export {};