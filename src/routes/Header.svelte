<script>
  import Logo from '$lib/components/Logo.svelte';
  import { page } from '$app/stores';
</script>

<header>
  <div class="container">
    <div class="logo">
      <a href="/">
        <Logo />
      </a>
    </div>

    <nav>
      <ul>
        <li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
          <a href="/">Home</a>
        </li>
        <li aria-current={$page.url.pathname === '/shop' ? 'page' : undefined}>
          <a href="/shop">Shop</a>
        </li>
        <li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
          <a href="/about">About</a>
        </li>
      </ul>
    </nav>
  </div>
</header>

<style>
  header {
    height: var(--header-height);
    border-bottom: 1px solid var(--color-light-gray);
    background: var(--color-white);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }

  .container {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    width: 160px;
    height: 28px;
    display: flex;
    align-items: center;
  }

  nav {
    height: 100%;
  }

  ul {
    height: 100%;
    display: flex;
    gap: 2rem;
    list-style: none;
    margin: 0;
    padding: 0;
    align-items: center;
  }

  li a {
    font-family: var(--font-heading);
    font-size: 0.875rem;
    letter-spacing: 0.05rem;
    color: var(--color-black);
    text-decoration: none;
    transition: color 0.2s;
  }

  li a:hover {
    color: var(--color-medium-gray);
  }

  li[aria-current='page'] a {
    color: var(--color-medium-gray);
  }

  @media (max-width: 768px) {
    .logo {
      width: 120px;
      height: 21px;
    }

    ul {
      gap: 1rem;
    }

    li a {
      font-size: 0.75rem;
    }
  }
</style>