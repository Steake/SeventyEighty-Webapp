<script>
  export let product;
  export let onAddToCart = () => {};

  const formatPrice = (price) => `$${price.toFixed(2)}`;
</script>

<div class="product-card">
  <a href="/shop/{product.id}" class="product-link">
    <div class="product-image">
      <img src={product.image} alt={product.name} />
    </div>
    <h3>{product.name}</h3>
    <p>{formatPrice(product.price)}</p>
  </a>
  <button on:click={() => onAddToCart(product)}>ADD TO CART</button>
</div>

<style>
  .product-card {
    text-align: center;
  }

  .product-link {
    display: block;
    margin-bottom: 1rem;
  }

  .product-image {
    aspect-ratio: 3/4;
    background: var(--color-light-gray);
    margin-bottom: 1rem;
    overflow: hidden;
  }

  .product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .product-link:hover .product-image img {
    transform: scale(1.05);
  }

  h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 1rem;
    color: var(--color-dark-gray);
  }
</style>