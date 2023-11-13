import { DocumentReference } from "firebase-admin/firestore";

export interface Session {
  uid?: string;
  create_date: string;
  start_date: string;
  timezone: string;
  duration_minutes: number;
  confirmation_status?:
    | "cancelled"
    | "cancelled-refunded"
    | "no-show"
    | "complete";
  message: string;
  user: DocumentReference;
  meeting_link?: string;
  event_id?: string;
}

// cancelled - user has cancelled the lesson, but less than 4 hours before
// refunded - user has cancelled the lesson, but before 4 hours so refund issued
// no-show - user didn't show up, so admin marked the lesson as no-show
// complete - user showed up, and admin marked the lesson as complete
