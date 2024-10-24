<script lang="ts">
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import { cart } from '$lib/stores/cart';
  import type { PageData, ActionData } from './$types';

  export let data: PageData;
  export let form: ActionData;

  let loading = false;
  let error = form?.error || null;

  $: subtotal = $cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  $: shippingCost = 10;
  $: total = subtotal + shippingCost;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };
</script>

<div class="checkout">
  <h1>Checkout</h1>

  {#if $cart.length === 0}
    <div class="empty-cart">
      <p>Your cart is empty</p>
      <a href="/shop" class="shop-link">Continue Shopping</a>
    </div>
  {:else}
    <form 
      method="POST" 
      use:enhance={() => {
        loading = true;
        error = null;
        
        return async ({ result }) => {
          loading = false;
          
          if (result.type === 'success' && result.data?.orderId) {
            cart.clear();
            goto(`/checkout/confirmation/${result.data.orderId}`);
          } else if (result.type === 'failure') {
            error = 'Failed to process order. Please try again.';
          }
        };
      }}
    >
      <input type="hidden" name="cartItems" value={JSON.stringify($cart)} />
      <input type="hidden" name="total" value={total} />

      <div class="order-summary">
        <h2>Order Summary</h2>
        
        {#if error}
          <div class="error-message">
            {error}
          </div>
        {/if}

        <div class="cart-items">
          {#each $cart as item}
            <div class="cart-item">
              <div class="item-info">
                <h3>{item.name}</h3>
                {#if item.selectedSize}
                  <p>Size: {item.selectedSize}</p>
                {/if}
                <p>Quantity: {item.quantity}</p>
              </div>
              <p class="item-price">{formatPrice(item.price * item.quantity)}</p>
            </div>
          {/each}
        </div>

        <div class="summary-totals">
          <div class="summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div class="summary-row">
            <span>Shipping</span>
            <span>{formatPrice(shippingCost)}</span>
          </div>
          <div class="summary-row total">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>

        <button 
          type="submit" 
          class="checkout-button" 
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </div>
    </form>
  {/if}
</div>

<style>
  .checkout {
    padding: 2rem 0;
    max-width: 600px;
    margin: 0 auto;
  }

  h1 {
    text-align: center;
    margin-bottom: 3rem;
  }

  .order-summary {
    background: var(--color-white);
    padding: 2rem;
    border: 1px solid var(--color-light-gray);
  }

  .error-message {
    color: red;
    margin-bottom: 1rem;
    padding: 0.5rem;
    background: rgba(255, 0, 0, 0.1);
    border-radius: 4px;
  }

  .cart-items {
    margin-bottom: 2rem;
  }

  .cart-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--color-light-gray);
  }

  .item-info h3 {
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }

  .item-info p {
    color: var(--color-medium-gray);
    font-size: 0.875rem;
  }

  .summary-totals {
    margin-bottom: 2rem;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .summary-row.total {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--color-light-gray);
    font-family: var(--font-heading);
    font-size: 1.25rem;
  }

  .checkout-button {
    width: 100%;
    padding: 1rem;
    background: var(--color-black);
    color: var(--color-white);
    border: none;
    font-family: var(--font-heading);
    cursor: pointer;
  }

  .checkout-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .empty-cart {
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
</style>