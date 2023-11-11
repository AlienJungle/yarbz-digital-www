declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      SESSION_COOKIE_NAME: string;
      NEXT_PUBLIC_SITE_URL: string;
      GOOGLE_CLIENT_SECRET: string;
      GOOGLE_SERVICEACCOUNT: string;
    }
  }
}

export {};
