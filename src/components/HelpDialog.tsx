import { Dialog } from "./Dialog";

interface HelpDialogProps {
  onClose: () => void;
  show: boolean;
}

export const HelpDialog = ({ onClose, show }: HelpDialogProps) => {
  return (
    <Dialog title="Help" show={show} onClose={onClose}>
      <>
        <p className="warning-text">
          Bakedle has been archived. New bakes will be added infrequently.
        </p>
        <p>Guess the TOTAL baking time (minutes) in 5 attempts.</p>
        <p>Each incorrect guess will help guide you in the right direction.</p>
        <p>
          🔴 will appear next to an incorrect guess if you're getting close.
        </p>
        <p>
          Good luck on today's <span className="bake-text">Bake</span>
          dle!
        </p>
      </>
    </Dialog>
  );
};
