import { useEffect, useMemo } from 'react';

type ContextMenuItem = {
  id: string;
  label: string;
  onSelect: () => void;
  disabled?: boolean;
};

type ContextMenuProps = {
  isOpen: boolean;
  x: number;
  y: number;
  items: ContextMenuItem[];
  onClose: () => void;
};

export function ContextMenu({
  isOpen,
  x,
  y,
  items,
  onClose
}: ContextMenuProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleClick = () => onClose();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    const handleContext = () => onClose();
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKey);
    document.addEventListener('contextmenu', handleContext);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('contextmenu', handleContext);
    };
  }, [isOpen, onClose]);

  const enabledItems = useMemo(
    () => items.filter((item) => !item.disabled),
    [items]
  );

  if (!isOpen) {
    return null;
  }

  return (
    <div className="context-menu" style={{ left: x, top: y }} role="menu">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className="context-menu-item"
          role="menuitem"
          onClick={() => {
            if (item.disabled) {
              return;
            }
            item.onSelect();
            onClose();
          }}
          disabled={item.disabled}
        >
          {item.label}
        </button>
      ))}
      {enabledItems.length === 0 && (
        <div className="context-menu-empty">Nenhuma acao disponivel</div>
      )}
    </div>
  );
}
