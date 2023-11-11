import { jsonFromRaw } from "@/api-helpers";
import { auth, createDbUser, getDbUser } from "@/lib/firebase-admin";
import { setCookie } from "cookies-next";
import { StatusCodes } from "http-status-codes";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.send(StatusCodes.METHOD_NOT_ALLOWED);
  }

  const { idToken } = await jsonFromRaw(req);

  if (!idToken) {
    res.status(StatusCodes.BAD_REQUEST).send("idToken is missing from body.");
    return;
  }

  // 5 days
  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  // Create the cookie
  const cookie: string = await auth.createSessionCookie(idToken as string, {
    expiresIn,
  });

  const claims = await auth.verifySessionCookie(cookie, true);

  if (!(await getDbUser(claims.uid))) {
    createDbUser(claims.uid, {
      is_admin: false,
      available_sessions: 0,
    });

    console.log("Successfully created new user record for " + claims.uid);
  }

  setCookie(process.env.SESSION_COOKIE_NAME, cookie, {
    secure: true,
    sameSite: true,
    httpOnly: true,
    maxAge: expiresIn,
    req,
    res,
  });

  res.status(200).send(null);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
