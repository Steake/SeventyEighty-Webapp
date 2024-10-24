<script>
  import { onMount } from 'svelte';

  let featured = [
    {
      id: 1,
      name: 'Classic Hoodie',
      price: 180,
      image: 'https://picsum.photos/600/800?random=1'
    },
    {
      id: 2,
      name: 'Premium T-Shirt',
      price: 85,
      image: 'https://picsum.photos/600/800?random=2'
    },
    {
      id: 3,
      name: 'Signature Sweater',
      price: 160,
      image: 'https://picsum.photos/600/800?random=3'
    }
  ];
</script>

<svelte:head>
  <title>Seventy Eighty - Luxury Streetwear</title>
  <meta name="description" content="Discover luxury streetwear reimagined. Shop the latest collection from Seventy Eighty." />
</svelte:head>

<section class="hero">
  <div class="hero-content">
    <h1>ELEVATE YOUR STYLE</h1>
    <p>Luxury streetwear for the modern connoisseur</p>
    <a href="/shop" class="cta">SHOP NOW</a>
  </div>
</section>

<section class="featured">
  <h2>FEATURED PIECES</h2>
  <div class="product-grid">
    {#each featured as product}
      <div class="product-card">
        <div class="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <h3>{product.name}</h3>
        <p>${product.price}</p>
        <button>ADD TO CART</button>
      </div>
    {/each}
  </div>
</section>

<style>
  .hero {
    height: calc(100vh - var(--header-height));
    background: var(--color-cream);
    margin: calc(var(--container-padding) * -1);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .hero-content {
    max-width: 800px;
    padding: 2rem;
  }

  .hero h1 {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  .hero p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  .cta {
    display: inline-block;
    background: var(--color-black);
    color: var(--color-white);
    padding: 1rem 2rem;
    font-family: var(--font-heading);
    font-size: 1rem;
    letter-spacing: 0.05rem;
  }

  .featured {
    padding: 4rem 0;
  }

  .featured h2 {
    text-align: center;
    margin-bottom: 3rem;
  }

  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .product-card {
    text-align: center;
  }

  .product-image {
    aspect-ratio: 3/4;
    background: var(--color-light-gray);
    margin-bottom: 1rem;
  }

  .product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .product-card h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }

  .product-card p {
    margin-bottom: 1rem;
  }
</style>