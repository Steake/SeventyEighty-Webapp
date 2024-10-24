<script>
  import ProductCard from '$lib/components/ProductCard.svelte';
  import ProductFilter from '$lib/components/ProductFilter.svelte';
  import { cart } from '$lib/stores/cart';

  let products = [
    {
      id: 1,
      name: 'Classic Hoodie',
      price: 180,
      image: 'https://picsum.photos/600/800?random=1',
      category: 'hoodies'
    },
    {
      id: 2,
      name: 'Premium T-Shirt',
      price: 85,
      image: 'https://picsum.photos/600/800?random=2',
      category: 'tshirts'
    },
    {
      id: 3,
      name: 'Signature Sweater',
      price: 160,
      image: 'https://picsum.photos/600/800?random=3',
      category: 'sweaters'
    }
  ];

  let categories = [
    { id: 'hoodies', name: 'Hoodies' },
    { id: 'tshirts', name: 'T-Shirts' },
    { id: 'sweaters', name: 'Sweaters' }
  ];

  let selectedCategory = '';
  let selectedSort = 'newest';

  $: filteredProducts = products
    .filter(product => !selectedCategory || product.category === selectedCategory)
    .sort((a, b) => {
      switch (selectedSort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        default:
          return 0;
      }
    });

  function handleFilterChange({ category, sort }) {
    selectedCategory = category;
    selectedSort = sort;
  }

  function addToCart(product) {
    cart.addItem(product);
  }
</script>

<svelte:head>
  <title>Shop - Seventy Eighty</title>
  <meta name="description" content="Shop luxury streetwear from Seventy Eighty. Browse our collection of premium hoodies, t-shirts, and sweaters." />
</svelte:head>

<div class="shop">
  <h1>SHOP</h1>
  
  <ProductFilter
    {categories}
    {selectedCategory}
    {selectedSort}
    onFilterChange={handleFilterChange}
  />

  <div class="product-grid">
    {#each filteredProducts as product (product.id)}
      <ProductCard {product} onAddToCart={addToCart} />
    {/each}
  </div>
</div>

<style>
  .shop {
    padding: 2rem 0;
  }

  h1 {
    text-align: center;
    margin-bottom: 3rem;
  }

  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }
</style>