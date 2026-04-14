import { InventoryItem } from '../types/tiles';

type InventoryPanelProps = {
  items: InventoryItem[];
  onAdd: (item: InventoryItem) => void;
  disabled?: boolean;
};

export function InventoryPanel({
  items,
  onAdd,
  disabled = false
}: InventoryPanelProps) {
  return (
    <div className="inventory">
      {items.map((item) => (
        <button
          key={`${item.kind}-${item.sign}`}
          className={`inventory-item ${item.sign === 1 ? 'pos' : 'neg'}`}
          onClick={() => onAdd(item)}
          disabled={disabled}
          type="button"
        >
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}
