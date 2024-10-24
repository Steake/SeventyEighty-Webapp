<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;

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
</script>

<svelte:head>
  <title>Order Confirmation - Seventy Eighty</title>
  <meta name="description" content="Your order has been confirmed" />
</svelte:head>

<div class="confirmation">
  <div class="confirmation-content">
    <h1>Order Confirmed</h1>
    <p class="thank-you">Thank you for your order!</p>

    <div class="order-details">
      <div class="order-header">
        <div>
          <h2>Order #{data.order.id.slice(0, 8)}</h2>
          <p class="order-date">{formatDate(data.order.order_date)}</p>
        </div>
        <div class="order-status">
          {data.order.status}
        </div>
      </div>

      <div class="items-list">
        {#each data.order.items as item}
          <div class="order-item">
            <div class="item-info">
              <h3>{item.product_id}</h3>
              <p>Size: {item.size}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
            <p class="item-price">{formatPrice(item.price * item.quantity)}</p>
          </div>
        {/each}
      </div>

      <div class="order-total">
        <span>Total</span>
        <span>{formatPrice(data.order.total)}</span>
      </div>
    </div>

    <div class="next-steps">
      <p>We'll send you shipping confirmation and tracking information by email.</p>
      <a href="/shop" class="continue-shopping">Continue Shopping</a>
    </div>
  </div>
</div>

<style>
  .confirmation {
    padding: 4rem 0;
    display: flex;
    justify-content: center;
  }

  .confirmation-content {
    max-width: 600px;
    width: 100%;
  }

  h1 {
    text-align: center;
    margin-bottom: 1rem;
  }

  .thank-you {
    text-align: center;
    color: var(--color-medium-gray);
    margin-bottom: 3rem;
  }

  .order-details {
    background: var(--color-white);
    border: 1px solid var(--color-light-gray);
    padding: 2rem;
    margin-bottom: 2rem;
  }

  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }

  .order-date {
    color: var(--color-medium-gray);
    font-size: 0.875rem;
  }

  .order-status {
    padding: 0.5rem 1rem;
    background: var(--color-cream);
    color: var(--color-black);
    font-family: var(--font-heading);
    font-size: 0.75rem;
    text-transform: uppercase;
  }

  .items-list {
    border-top: 1px solid var(--color-light-gray);
    border-bottom: 1px solid var(--color-light-gray);
    padding: 1.5rem 0;
    margin-bottom: 1.5rem;
  }

  .order-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .order-item:last-child {
    margin-bottom: 0;
  }

  .item-info h3 {
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }

  .item-info p {
    color: var(--color-medium-gray);
    font-size: 0.875rem;
    margin-bottom: 0.25rem;
  }

  .order-total {
    display: flex;
    justify-content: space-between;
    font-family: var(--font-heading);
    font-size: 1.25rem;
  }

  .next-steps {
    text-align: center;
  }

  .next-steps p {
    margin-bottom: 1.5rem;
    color: var(--color-medium-gray);
  }

  .continue-shopping {
    display: inline-block;
    padding: 1rem 2rem;
    background: var(--color-black);
    color: var(--color-white);
    font-family: var(--font-heading);
    text-decoration: none;
  }
</style>