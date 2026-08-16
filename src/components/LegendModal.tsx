import { useEffect, useRef } from 'react';
import { TILE_LEGEND } from '../data/tiles';

type LegendModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function LegendModal({ isOpen, onClose }: LegendModalProps) {
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
          <h2>Legenda das pecas</h2>
          <button className="btn secondary" type="button" onClick={onClose}>
            Fechar
          </button>
        </div>
        <div className="legend-table-wrapper">
          <table className="legend-table">
            <thead>
              <tr>
                <th>Peca</th>
                <th>Dimensoes</th>
                <th>Representacao</th>
                <th>Leitura didatica</th>
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
                      <span>{entry.name}</span>
                    </div>
                  </td>
                  <td>{entry.dimensions}</td>
                  <td>{entry.representation}</td>
                  <td>{entry.reading}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </dialog>
  );
}
