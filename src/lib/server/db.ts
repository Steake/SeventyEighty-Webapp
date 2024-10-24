import { writable } from 'svelte/store';

// In-memory storage since we can't use SQLite in the browser
const storage = {
  users: new Map(),
  sessions: new Map(),
  orders: new Map(),
  orderItems: new Map()
};

export const users = {
  async create(id: string, email: string | null, guest: boolean) {
    storage.users.set(id, { id, email, guest });
  },

  async get(id: string) {
    return storage.users.get(id) || null;
  },

  async getByEmail(email: string) {
    return Array.from(storage.users.values()).find(user => user.email === email) || null;
  }
};

export const sessions = {
  async create(id: string, userId: string, expiresAt: number) {
    storage.sessions.set(id, { id, userId, expiresAt });
  },

  async get(id: string) {
    return storage.sessions.get(id) || null;
  },

  async delete(id: string) {
    storage.sessions.delete(id);
  },

  async deleteByUserId(userId: string) {
    for (const [id, session] of storage.sessions.entries()) {
      if (session.userId === userId) {
        storage.sessions.delete(id);
      }
    }
  }
};

export const orders = {
  async create(id: string, userId: string, orderDate: number, total: number, status: string) {
    storage.orders.set(id, { id, userId, orderDate, total, status });
  },

  async createItem(id: string, orderId: string, productId: string, quantity: number, price: number, size: string) {
    storage.orderItems.set(id, { id, orderId, productId, quantity, price, size });
  },

  async getOrder(id: string) {
    return storage.orders.get(id) || null;
  },

  async getOrderItems(orderId: string) {
    return Array.from(storage.orderItems.values()).filter(item => item.orderId === orderId);
  },

  async getUserOrders(userId: string) {
    return Array.from(storage.orders.values())
      .filter(order => order.userId === userId)
      .sort((a, b) => b.orderDate - a.orderDate);
  }
};

// Export types
export interface User {
  id: string;
  email: string | null;
  guest: boolean;
}

export interface Session {
  id: string;
  userId: string;
  expiresAt: number;
}

export interface Order {
  id: string;
  userId: string;
  orderDate: number;
  total: number;
  status: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  size: string;
}