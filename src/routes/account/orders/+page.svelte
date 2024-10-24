<script lang="ts">
  import OrderCard from '$lib/components/OrderCard.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>Order History - Seventy Eighty</title>
  <meta name="description" content="View your order history at Seventy Eighty" />
</svelte:head>

<div class="orders-page">
  <h1>Order History</h1>

  {#if data.orders.length === 0}
    <div class="empty-orders">
      <p>You haven't placed any orders yet.</p>
      <a href="/shop" class="shop-link">Start Shopping</a>
    </div>
  {:else}
    <div class="orders-grid">
      {#each data.orders as order}
        <OrderCard {order} />
      {/each}
    </div>
  {/if}
</div>

<style>
  .orders-page {
    padding: 2rem 0;
  }

  h1 {
    text-align: center;
    margin-bottom: 3rem;
  }

  .empty-orders {
    text-align: center;
    padding: 4rem 0;
  }

  .shop-link {
    display: inline-block;
    margin-top: 1rem;
    padding: 1rem 2rem;
    background: var(--color-black);
    color: var(--color-white);
    font-family: var(--font-heading);
    text-decoration: none;
  }

  .orders-grid {
    display: grid;
    gap: 2rem;
    max-width: var(--max-width);
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .orders-grid {
      grid-template-columns: 1fr;
    }
  }
</style>