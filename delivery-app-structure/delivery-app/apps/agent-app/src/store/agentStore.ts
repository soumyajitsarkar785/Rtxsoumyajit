import { create } from 'zustand';
import { Order } from '@delivery/shared-types';

interface AgentStore {
  isOnline: boolean;
  activeOrder: Order | null;
  pendingOrders: Order[];
  toggleOnline: () => void;
  setActiveOrder: (order: Order | null) => void;
  setPendingOrders: (orders: Order[]) => void;
}

export const useAgentStore = create<AgentStore>((set) => ({
  isOnline: false,
  activeOrder: null,
  pendingOrders: [],
  toggleOnline: () => set((s) => ({ isOnline: !s.isOnline })),
  setActiveOrder: (order) => set({ activeOrder: order }),
  setPendingOrders: (orders) => set({ pendingOrders: orders }),
}));
