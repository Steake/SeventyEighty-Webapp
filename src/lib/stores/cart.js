import { writable } from 'svelte/store';

function createCartStore() {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    addItem: (product) => update(items => {
      const existingItem = items.find(item => item.id === product.id);
      if (existingItem) {
        return items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...items, { ...product, quantity: 1 }];
    }),
    removeItem: (productId) => update(items => items.filter(item => item.id !== productId)),
    updateQuantity: (productId, quantity) => update(items =>
      items.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      )
    ),
    clear: () => set([])
  };
}

export const cart = createCartStore();