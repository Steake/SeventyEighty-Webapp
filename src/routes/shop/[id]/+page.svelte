<script>
  import { page } from '$app/stores';
  import { cart } from '$lib/stores/cart';

  // In a real app, this would fetch from an API
  const products = [
    {
      id: 1,
      name: 'Classic Hoodie',
      price: 180,
      image: 'https://picsum.photos/600/800?random=1',
      description: 'Our signature hoodie crafted from premium cotton blend fabric.',
      sizes: ['S', 'M', 'L', 'XL'],
      details: [
        'Heavy-weight cotton blend',
        'Relaxed fit',
        'Kangaroo pocket',
        'Ribbed cuffs and hem'
      ]
    },
    // ... other products
  ];

  $: product = products.find(p => p.id === parseInt($page.params.id));
  $: selectedSize = product?.sizes[0] || '';

  function addToCart() {
    if (product && selectedSize) {
      cart.addItem({ ...product, selectedSize });
    }
  }
</script>

<svelte:head>
  {#if product}
    <title>{product.name} - Seventy Eighty</title>
    <meta name="description" content={product.description} />
  {/if}
</svelte:head>

{#if product}
  <div class="product-detail">
    <div class="product-image">
      <img src={product.image} alt={product.name} />
    </div>
    
    <div class="product-info">
      <h1>{product.name}</h1>
      <p class="price">${product.price}</p>
      <p class="description">{product.description}</p>
      
      <div class="size-selector">
        <label for="size">Size</label>
        <select id="size" bind:value={selectedSize}>
          {#each product.sizes as size}
            <option value={size}>{size}</option>
          {/each}
        </select>
      </div>
      
      <button on:click={addToCart}>ADD TO CART</button>
      
      <div class="product-details">
        <h2>Details</h2>
        <ul>
          {#each product.details as detail}
            <li>{detail}</li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
{/if}

<style>
  .product-detail {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    padding: 2rem 0;
  }

  .product-image img {
    width: 100%;
    height: auto;
  }

  .product-info {
    padding: 2rem 0;
  }

  h1 {
    margin-bottom: 1rem;
  }

  .price {
    font-size: 1.5rem;
    color: var(--color-dark-gray);
    margin-bottom: 2rem;
  }

  .description {
    margin-bottom: 2rem;
  }

  .size-selector {
    margin-bottom: 2rem;
  }

  .size-selector label {
    display: block;
    font-family: var(--font-heading);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }

  select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--color-light-gray);
    font-family: var(--font-body);
    font-size: 1rem;
    margin-bottom: 2rem;
  }

  .product-details {
    margin-top: 3rem;
  }

  .product-details h2 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 0.5rem;
  }

  @media (max-width: 768px) {
    .product-detail {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }
</style>