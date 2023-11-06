declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SESSION_COOKIE_NAME: string;
      NEXT_PUBLIC_SITE_URL: string;
    }
  }
}

export {};
