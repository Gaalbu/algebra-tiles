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
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
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
    </div>
  );
}
