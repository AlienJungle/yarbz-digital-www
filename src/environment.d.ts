declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      SESSION_COOKIE_NAME: string;
      GOOGLE_CLIENT_SECRET: string;
      GOOGLE_SERVICEACCOUNT: string;
      STRIPE_SECRET_KEY: string;
    }
  }
}

export {};
