import { InventoryItem } from '../types/tiles';

type InventoryPanelProps = {
  items: InventoryItem[];
  onDragStart?: (item: InventoryItem) => void;
  onDragEnd?: () => void;
  disabled?: boolean;
};

export function InventoryPanel({
  items,
  onDragStart,
  onDragEnd,
  disabled = false
}: InventoryPanelProps) {
  return (
    <div className="inventory">
      {items.map((item) => (
        <button
          key={`${item.kind}-${item.sign}`}
          className={`inventory-item ${item.sign === 1 ? 'pos' : 'neg'}`}
          draggable={!disabled}
          onDragStart={(event) => {
            event.dataTransfer.setData(
              'application/x-inventory-item',
              JSON.stringify(item)
            );
            onDragStart?.(item);
          }}
          onDragEnd={() => onDragEnd?.()}
          disabled={disabled}
          type="button"
        >
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}
