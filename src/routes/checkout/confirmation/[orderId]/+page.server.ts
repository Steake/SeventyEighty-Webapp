import { orders } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const order = await orders.getOrder(params.orderId);
  
  if (!order) {
    throw error(404, 'Order not found');
  }

  const items = await orders.getOrderItems(order.id);

  return {
    order: {
      ...order,
      items
    }
  };
};