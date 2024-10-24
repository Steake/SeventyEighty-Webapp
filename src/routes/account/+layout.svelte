<script>
  import { page } from '$app/stores';
</script>

<div class="account-layout">
  <aside class="sidebar">
    <nav>
      <ul>
        <li class:active={$page.url.pathname === '/account'}>
          <a href="/account">Profile</a>
        </li>
        <li class:active={$page.url.pathname === '/account/orders'}>
          <a href="/account/orders">Orders</a>
        </li>
        <li>
          <form action="/auth/logout" method="POST">
            <button type="submit">Sign Out</button>
          </form>
        </li>
      </ul>
    </nav>
  </aside>

  <main class="content">
    <slot />
  </main>
</div>

<style>
  .account-layout {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 2rem;
    padding: 2rem 0;
  }

  .sidebar {
    border-right: 1px solid var(--color-light-gray);
    padding-right: 2rem;
  }

  nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  nav li {
    margin-bottom: 1rem;
  }

  nav a {
    font-family: var(--font-heading);
    font-size: 0.875rem;
    color: var(--color-dark-gray);
    text-decoration: none;
    transition: color 0.2s;
  }

  nav a:hover {
    color: var(--color-black);
  }

  nav li.active a {
    color: var(--color-black);
    font-weight: bold;
  }

  nav button {
    width: 100%;
    text-align: left;
    padding: 0;
    background: none;
    border: none;
    font-family: var(--font-heading);
    font-size: 0.875rem;
    color: var(--color-dark-gray);
    cursor: pointer;
  }

  nav button:hover {
    color: var(--color-black);
  }

  .content {
    min-width: 0;
  }

  @media (max-width: 768px) {
    .account-layout {
      grid-template-columns: 1fr;
    }

    .sidebar {
      border-right: none;
      border-bottom: 1px solid var(--color-light-gray);
      padding-right: 0;
      padding-bottom: 1rem;
      margin-bottom: 1rem;
    }

    nav ul {
      display: flex;
      gap: 1rem;
      overflow-x: auto;
    }

    nav li {
      margin-bottom: 0;
    }
  }
</style>