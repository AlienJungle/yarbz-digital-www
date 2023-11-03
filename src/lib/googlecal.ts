import fs from "fs";
import { Credentials } from "google-auth-library";
import { google } from "googleapis";

import path from "path";

const SCOPES = ["https://www.googleapis.com/auth/calendar.events", "https://www.googleapis.com/auth/calendar.readonly"];

const KEY_PATH = path.join(process.cwd(), "./google_client_secret.json");
const TOKEN_PATH = path.join(process.cwd(), "./google_auth_token.json");

let keys: any;
if (fs.existsSync(KEY_PATH)) {
  console.log("Loading keys from key path " + KEY_PATH);
  keys = JSON.parse(fs.readFileSync(KEY_PATH).toString()).web;
  console.log("Successfully loaded keys for client ID " + keys.client_id);
}

const oauth2Client = new google.auth.OAuth2(keys.client_id, keys.client_secret, keys.redirect_uris);

const savedToken = loadTokenFromDisk();
if (savedToken) {
  oauth2Client.setCredentials(savedToken);
  console.log("Successfully loaded Google token from disk.");
}

google.options({ auth: oauth2Client });

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
