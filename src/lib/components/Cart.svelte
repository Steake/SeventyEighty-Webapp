<script>
  import { fly } from 'svelte/transition';
  import { cart } from '$lib/stores/cart';
  import { goto } from '$app/navigation';

  export let isOpen = false;
  export let onClose = () => {};

  $: subtotal = $cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  function updateQuantity(item, newQuantity) {
    cart.updateQuantity(item.id, parseInt(newQuantity));
  }

  function removeItem(itemId) {
    cart.removeItem(itemId);
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      onClose();
    }
  }

  function handleCheckout() {
    onClose();
    goto('/checkout');
  }

  const formatPrice = (price) => `$${price.toFixed(2)}`;
</script>

{#if isOpen}
  <div 
    class="cart-overlay"
    on:keydown={handleKeydown}
    on:click={onClose}
    role="dialog"
    aria-label="Shopping Cart"
    tabindex="-1"
  >
    <button 
      class="close-overlay"
      on:click={onClose}
      aria-label="Close cart overlay"
    >
      <span class="sr-only">Close cart overlay</span>
    </button>
    
    <div 
      class="cart-container"
      on:click|stopPropagation
      role="document"
    >
      <div class="cart-header">
        <h2>Shopping Cart</h2>
        <button 
          class="close-button" 
          on:click={onClose}
          aria-label="Close cart"
        >
          &times;
        </button>
      </div>

      {#if $cart.length === 0}
        <div class="empty-cart">
          <p>Your cart is empty</p>
        </div>
      {:else}
        <div class="cart-items">
          {#each $cart as item (item.id)}
            <div class="cart-item">
              <div class="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div class="item-details">
                <h3>{item.name}</h3>
                {#if item.selectedSize}
                  <p class="size">Size: {item.selectedSize}</p>
                {/if}
                <div class="quantity-controls">
                  <select 
                    value={item.quantity} 
                    on:change={(e) => updateQuantity(item, e.target.value)}
                    aria-label={`Quantity for ${item.name}`}
                  >
                    {#each Array(10) as _, i}
                      <option value={i + 1}>{i + 1}</option>
                    {/each}
                  </select>
                  <button 
                    class="remove-button" 
                    on:click={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    Remove
                  </button>
                </div>
                <p class="price">{formatPrice(item.price * item.quantity)}</p>
              </div>
            </div>
          {/each}
        </div>

        <div class="cart-footer">
          <div class="subtotal">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <button class="checkout-button" on:click={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
  .cart-overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: flex;
    justify-content: flex-end;
  }

  .close-overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    border: none;
    background: transparent;
    cursor: default;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .cart-container {
    position: relative;
    width: 100%;
    max-width: 400px;
    background: var(--color-white);
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .cart-header {
    padding: 1.5rem;
    border-bottom: 1px solid var(--color-light-gray);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .cart-header h2 {
    margin: 0;
    font-size: 1.5rem;
  }

  .close-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--color-dark-gray);
    cursor: pointer;
    padding: 0.5rem;
  }

  .empty-cart {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-dark-gray);
  }

  .cart-items {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
  }

  .cart-item {
    display: flex;
    gap: 1rem;
    padding-bottom: 1.5rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid var(--color-light-gray);
  }

  .item-image {
    width: 80px;
    height: 80px;
  }

  .item-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .item-details {
    flex: 1;
  }

  .item-details h3 {
    margin: 0 0 0.5rem;
    font-size: 1rem;
  }

  .size {
    color: var(--color-dark-gray);
    margin-bottom: 0.5rem;
  }

  .quantity-controls {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  select {
    padding: 0.5rem;
    border: 1px solid var(--color-light-gray);
    border-radius: 0;
    font-family: var(--font-body);
  }

  .remove-button {
    background: none;
    border: none;
    color: var(--color-dark-gray);
    text-decoration: underline;
    padding: 0;
    font-size: 0.875rem;
  }

  .price {
    font-weight: bold;
  }

  .cart-footer {
    padding: 1.5rem;
    border-top: 1px solid var(--color-light-gray);
  }

  .subtotal {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    font-weight: bold;
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

  .checkout-button:hover {
    background: var(--color-dark-gray);
  }
</style>