import { useEffect, useRef } from "react";
import classes from "./Dialog.module.css";

interface DialogProps {
  children: React.ReactNode;
  onClose: () => void;
  show: boolean;
  title: string;
}

export const Dialog = ({ children, onClose, show, title }: DialogProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (show) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [show]);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 0);
    }
  }, [show]);

  return (
    <dialog className={classes.dialog} ref={(ref) => (dialogRef.current = ref)}>
      <div className={classes.dialogHeader}>
        <div>{title}</div>
        <button
          className={classes.dialogCloseButton}
          type="button"
          onClick={onClose}
          title="Close"
          ref={(ref) => (closeButtonRef.current = ref)}
        >
          x
        </button>
      </div>
      <div className={classes.dialogBody}>{children}</div>
    </dialog>
  );
};
