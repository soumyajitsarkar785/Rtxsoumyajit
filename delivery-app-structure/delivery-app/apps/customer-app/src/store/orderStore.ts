import { create } from 'zustand';
import { Order, OrderStatus } from '@delivery/shared-types';

interface OrderStore {
  activeOrder: Order | null;
  orderHistory: Order[];
  setActiveOrder: (order: Order | null) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  activeOrder: null,
  orderHistory: [],
  setActiveOrder: (order) => set({ activeOrder: order }),
  updateOrderStatus: (id, status) =>
    set((state) => ({
      activeOrder:
        state.activeOrder?.id === id
          ? { ...state.activeOrder, status }
          : state.activeOrder,
    })),
}));
