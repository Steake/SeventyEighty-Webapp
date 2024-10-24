<script>
  export let categories = [];
  export let selectedCategory = '';
  export let onFilterChange;

  export let sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' }
  ];
  export let selectedSort = 'newest';
</script>

<div class="filters">
  <div class="category-filter">
    <label for="category">Category</label>
    <select
      id="category"
      bind:value={selectedCategory}
      on:change={() => onFilterChange({ category: selectedCategory, sort: selectedSort })}
    >
      <option value="">All Categories</option>
      {#each categories as category}
        <option value={category.id}>{category.name}</option>
      {/each}
    </select>
  </div>

  <div class="sort-filter">
    <label for="sort">Sort By</label>
    <select
      id="sort"
      bind:value={selectedSort}
      on:change={() => onFilterChange({ category: selectedCategory, sort: selectedSort })}
    >
      {#each sortOptions as option}
        <option value={option.value}>{option.label}</option>
      {/each}
    </select>
  </div>
</div>

<style>
  .filters {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .category-filter,
  .sort-filter {
    flex: 1;
  }

  label {
    display: block;
    font-family: var(--font-heading);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }

  select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--color-light-gray);
    border-radius: 0;
    font-family: var(--font-body);
    font-size: 1rem;
    background-color: var(--color-white);
    cursor: pointer;
  }

  select:focus {
    outline: none;
    border-color: var(--color-dark-gray);
  }
</style>