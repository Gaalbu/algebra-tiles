import { useEffect, useRef } from 'react';

type ResultModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  primaryLabel: string;
  onPrimary: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
};

export function ResultModal({
  isOpen,
  title,
  message,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary
}: ResultModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }
    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog
      className="modal-overlay"
      ref={dialogRef}
      onCancel={(event) => {
        if (onSecondary) {
          event.preventDefault();
          onSecondary();
        }
      }}
    >
      <div className="modal">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="modal-actions">
          {secondaryLabel && onSecondary && (
            <button className="btn secondary" onClick={onSecondary}>
              {secondaryLabel}
            </button>
          )}
          <button className="btn" onClick={onPrimary}>
            {primaryLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
}
