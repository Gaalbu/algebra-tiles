import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { TILE_LEGEND } from '../data/tiles';

type LegendModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function LegendModal({ isOpen, onClose }: LegendModalProps) {
  const { t } = useTranslation();
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
        event.preventDefault();
        onClose();
      }}
    >
      <div className="modal legend-modal">
        <div className="legend-modal-header">
          <h2>{t('legend.title')}</h2>
          <button className="btn secondary" type="button" onClick={onClose}>
            {t('legend.close')}
          </button>
        </div>
        <div className="legend-table-wrapper">
          <table className="legend-table">
            <thead>
              <tr>
                <th>{t('legend.columns.piece')}</th>
                <th>{t('legend.columns.dimensions')}</th>
                <th>{t('legend.columns.representation')}</th>
                <th>{t('legend.columns.reading')}</th>
              </tr>
            </thead>
            <tbody>
              {TILE_LEGEND.map((entry) => (
                <tr key={entry.id}>
                  <td>
                    <div className="legend-piece">
                      <span
                        className={`legend-swatch ${entry.swatchClass ?? 'muted'}`}
                        aria-hidden="true"
                      />
                      <span>{t(`legend.entries.${entry.id}.name`)}</span>
                    </div>
                  </td>
                  <td>{t(`legend.entries.${entry.id}.dimensions`)}</td>
                  <td>{entry.representation}</td>
                  <td>{t(`legend.entries.${entry.id}.reading`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </dialog>
  );
}
