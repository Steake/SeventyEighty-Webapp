import { orders } from '$lib/server/db';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) {
    throw redirect(302, '/auth/login');
  }

  const userOrders = await orders.getUserOrders(locals.user.userId);
  const ordersWithItems = await Promise.all(
    userOrders.map(async (order) => {
      const items = await orders.getOrderItems(order.id);
      return { ...order, items };
    })
  );

  return {
    orders: ordersWithItems
  };
};