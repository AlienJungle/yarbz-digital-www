import { Session } from "@/app/api/_models/session";
import Alert from "@/components/alert";
import { UserContext } from "@/components/providers/user-provider";
import { formatDate } from "@/helpers/misc-helpers";
import useSessions from "@/lib/useSessions";
import { useContext, useState } from "react";
import Button from "../button";
import { ModalActions } from "../modal";

interface CancelSessionModalContentProps {
  session: Session;
  onCancel: (session: Session) => void;
  onClose: () => void;
}

export default function CancelSessionModalContent({
  onClose,
  onCancel,
  session,
}: CancelSessionModalContentProps) {
  const userCtx = useContext(UserContext);
  const currUser = userCtx.currentUser;

  const { cancelSession } = useSessions(currUser!.uid);

  const [isDeleting, setIsDeleting] = useState(false);
  const { data, isLoading, error } = cancelSession(
    isDeleting ? session.uid : undefined,
  );

  const handleCancel = async () => {
    setIsDeleting(true);
  };

  return (
    <div className="prose">
      <>
        {error && <Alert type="error">{error?.message ?? error}</Alert>}
        <p>
          Are you sure you want to cancel your session on{" "}
          <strong>{formatDate(session.start_date)}</strong> for{" "}
          <strong>{session.duration_minutes} minutes</strong>?
        </p>
        <p>You can also choose to reschedule the lesson if you wish.</p>
        <ModalActions>
          <Button theme="black" onClick={onClose}>
            Close
          </Button>
          <Button theme="green" onClick={handleCancel} disabled={isLoading}>
            Cancel lesson
          </Button>
        </ModalActions>
      </>
    </div>
  );
}
