import { InventoryItem } from '../types/tiles';

type InventoryPanelProps = {
  items: InventoryItem[];
  onAdd: (item: InventoryItem) => void;
};

export function InventoryPanel({ items, onAdd }: InventoryPanelProps) {
  return (
    <div className="inventory">
      {items.map((item) => (
        <button
          key={`${item.kind}-${item.sign}`}
          className={`inventory-item ${item.sign === 1 ? 'pos' : 'neg'}`}
          onClick={() => onAdd(item)}
          type="button"
        >
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}
