<script>
  import '../app.css';
  import Cart from '$lib/components/Cart.svelte';
  import Logo from '$lib/components/Logo.svelte';
  import { cart } from '$lib/stores/cart';
  import { page } from '$app/stores';

  let isCartOpen = false;

  $: cartItemCount = $cart.reduce((sum, item) => sum + item.quantity, 0);
  $: user = $page.data.user;

  function toggleCart() {
    isCartOpen = !isCartOpen;
  }
</script>

<div class="layout">
  <header>
    <nav>
      <div class="logo">
        <a href="/">
          <Logo variant="primary" className="header-logo" />
        </a>
      </div>
      <ul>
        <li><a href="/shop">SHOP</a></li>
        <li><a href="/about">ABOUT</a></li>
      </ul>
      <div class="nav-actions">
        {#if user}
          <div class="user-menu">
            <a href="/account" class="account-link" class:active={$page.url.pathname.startsWith('/account')}>
              {user.guest ? 'GUEST' : 'ACCOUNT'}
            </a>
          </div>
        {:else}
          <a href="/auth/login" class="login-link">SIGN IN</a>
        {/if}
        <button class="cart-button" on:click={toggleCart}>
          CART ({cartItemCount})
        </button>
      </div>
    </nav>
  </header>

  <main>
    <slot />
  </main>

  <footer>
    <div class="footer-content">
      <div class="footer-logo">
        <Logo variant="secondary" color="var(--color-cream)" />
      </div>
      <p>&copy; {new Date().getFullYear()} Seventy Eighty. All rights reserved.</p>
    </div>
  </footer>

  <Cart isOpen={isCartOpen} onClose={() => isCartOpen = false} />
</div>

<style>
  .layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  header {
    height: var(--header-height);
    border-bottom: 1px solid var(--color-light-gray);
    position: fixed;
    width: 100%;
    background: var(--color-white);
    z-index: 1000;
  }

  nav {
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
  }

  ul {
    display: flex;
    gap: 2rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li a {
    font-family: var(--font-heading);
    font-size: 0.875rem;
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .login-link,
  .account-link {
    font-family: var(--font-heading);
    font-size: 0.875rem;
    text-decoration: none;
    color: var(--color-black);
  }

  .account-link.active {
    color: var(--color-medium-gray);
  }

  .cart-button {
    font-family: var(--font-heading);
    font-size: 0.875rem;
    background: none;
    border: none;
    padding: 0;
    color: var(--color-black);
    cursor: pointer;
  }

  main {
    flex: 1;
    margin-top: var(--header-height);
    padding: var(--container-padding);
    max-width: var(--max-width);
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    box-sizing: border-box;
  }

  footer {
    background: var(--color-black);
    color: var(--color-cream);
    padding: 4rem 0;
  }

  .footer-content {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 var(--container-padding);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .footer-logo {
    width: 180px;
  }

  @media (max-width: 768px) {
    .logo {
      width: 120px;
    }

    ul {
      gap: 1rem;
    }

    li a,
    .login-link,
    .account-link,
    .cart-button {
      font-size: 0.75rem;
    }

    .nav-actions {
      gap: 1rem;
    }
  }
</style>