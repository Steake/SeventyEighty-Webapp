import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { orders } from '$lib/server/db';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) {
    throw redirect(302, '/auth/login');
  }

  return {
    user: {
      email: locals.user.email,
      guest: locals.user.guest
    }
  };
};

export const actions = {
  default: async ({ request, locals }) => {
    if (!locals.user) {
      throw redirect(302, '/auth/login');
    }

    const data = await request.formData();
    const cartItemsJson = data.get('cartItems');
    const totalStr = data.get('total');

    if (!cartItemsJson || !totalStr) {
      return { error: 'Invalid form data' };
    }

    try {
      const cartItems = JSON.parse(cartItemsJson.toString());
      const total = parseFloat(totalStr.toString());

      const orderId = crypto.randomUUID();
      
      await orders.create(orderId, locals.user.id, Date.now(), total, 'pending');

      for (const item of cartItems) {
        await orders.createItem(
          crypto.randomUUID(),
          orderId,
          item.id,
          item.quantity,
          item.price,
          item.selectedSize || ''
        );
      }

      return { success: true, orderId };
    } catch (error) {
      console.error('Order creation error:', error);
      return { error: 'Failed to create order' };
    }
  }
} satisfies Actions;