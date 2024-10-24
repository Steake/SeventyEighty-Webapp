<script lang="ts">
  import type { Order } from '$lib/server/db';

  export let order: Order;

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const statusColors = {
    pending: 'var(--color-medium-gray)',
    processing: 'var(--color-cream)',
    completed: 'var(--color-black)',
    cancelled: 'var(--color-dark-gray)'
  };
</script>

<div class="order-card">
  <div class="order-header">
    <div class="order-info">
      <h3>Order #{order.id.slice(0, 8)}</h3>
      <p class="order-date">{formatDate(order.orderDate)}</p>
    </div>
    <div class="order-status" style="background: {statusColors[order.status]}">
      {order.status}
    </div>
  </div>

  <div class="order-items">
    {#each order.items as item}
      <div class="order-item">
        <div class="item-details">
          <p class="item-name">{item.productId}</p>
          <p class="item-size">Size: {item.size}</p>
        </div>
        <div class="item-quantity">x{item.quantity}</div>
        <div class="item-price">{formatPrice(item.price)}</div>
      </div>
    {/each}
  </div>

  <div class="order-footer">
    <div class="order-total">
      <span>Total</span>
      <span>{formatPrice(order.total)}</span>
    </div>
    <a href="/account/orders/{order.id}" class="view-details">
      View Details
    </a>
  </div>
</div>

<style>
  .order-card {
    background: var(--color-white);
    border: 1px solid var(--color-light-gray);
    padding: 1.5rem;
  }

  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .order-info h3 {
    margin: 0;
    font-size: 1.25rem;
  }

  .order-date {
    color: var(--color-medium-gray);
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }

  .order-status {
    padding: 0.5rem 1rem;
    color: var(--color-white);
    font-family: var(--font-heading);
    font-size: 0.75rem;
    text-transform: uppercase;
  }

  .order-items {
    border-top: 1px solid var(--color-light-gray);
    border-bottom: 1px solid var(--color-light-gray);
    padding: 1rem 0;
    margin-bottom: 1rem;
  }

  .order-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .order-item:last-child {
    margin-bottom: 0;
  }

  .item-details {
    flex: 1;
  }

  .item-name {
    font-weight: bold;
  }

  .item-size {
    color: var(--color-medium-gray);
    font-size: 0.875rem;
  }

  .item-quantity {
    margin: 0 1rem;
    color: var(--color-medium-gray);
  }

  .order-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .order-total {
    font-family: var(--font-heading);
    font-size: 1.125rem;
  }

  .view-details {
    color: var(--color-black);
    text-decoration: underline;
    font-family: var(--font-heading);
    font-size: 0.875rem;
  }
</style>