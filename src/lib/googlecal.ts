import fs from "fs";
import { Credentials, OAuth2Client } from "google-auth-library";
import { calendar_v3, google } from "googleapis";

import path from "path";
import { GlobalRef } from "./GlobalRef";
import { ItemCache } from "./item-cache";

// TODO: TIDY

const SCOPES = [
  "https://www.googleapis.com/auth/calendar.events",
  "https://www.googleapis.com/auth/calendar.readonly",
];

const KEY_PATH = path.join(process.cwd(), "./google_client_secret.json");
const TOKEN_PATH = path.join(process.cwd(), "./google_auth_token.json");

function createOAuthClient(): OAuth2Client {
  const keys = getKeys();

  const client = new google.auth.OAuth2(
    keys.client_id,
    keys.client_secret,
    keys.redirect_uris,
  );

  const savedToken = loadTokenFromDisk();
  if (savedToken) {
    client.setCredentials(savedToken);
  }

  google.options({ auth: client });

  return client;
}

function getKeys(): any {
  if (process.env.GOOGLE_CLIENT_SECRET) {
    const secret = JSON.parse(process.env.GOOGLE_CLIENT_SECRET);
    return secret.web;
  }

  if (fs.existsSync(KEY_PATH)) {
    return JSON.parse(fs.readFileSync(KEY_PATH).toString()).web;
  }

  throw "Could not load Google OAuth keys.";
}

const oauth2ClientRef = new GlobalRef<OAuth2Client>("google-oauth-client");
if (!oauth2ClientRef.value) {
  console.log("Creating new Google OAuth client...");
  oauth2ClientRef.value = createOAuthClient();
}

export const oauth2Client = oauth2ClientRef.value;

export const generateAuthUrl = () =>
  oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

export const saveCredentials = async (code: string) => {
  const { tokens } = await oauth2Client.getToken(code);
  saveToken(tokens);
};

export const googleClient = oauth2Client;

function saveToken(tokens: Credentials) {
  console.log("Saving Google token...");
  // Set credentials on client
  oauth2Client.setCredentials(tokens);
  // Save credentials to disk
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
  console.log("Google token saved successfully!");
}

function loadTokenFromDisk() {
  if (!fs.existsSync(TOKEN_PATH)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(TOKEN_PATH).toString());
}

export const cache = {
  calendarlist: new ItemCache<calendar_v3.Schema$CalendarListEntry[] | null>(
    null,
    10,
    async () => {
      let calendars: calendar_v3.Schema$CalendarListEntry[] = [];
      let nextPageToken: string | null = null;

      do {
        try {
          const gResponse = await googleCalendar.calendarList.list({
            pageToken: nextPageToken!,
          });
          calendars = [...calendars, ...(gResponse.data.items ?? [])];
        } catch (error: any) {
          console.error(
            "Could not fetch calendar list: " + error?.message ?? error,
          );
        }
      } while (nextPageToken);

      return calendars;
    },
    "calendar-list",
  ),
};

export const googleCalendar = google.calendar({
  version: "v3",
  auth: googleClient,
});
