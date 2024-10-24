<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<svelte:head>
  <title>Account - Seventy Eighty</title>
  <meta name="description" content="Manage your Seventy Eighty account" />
</svelte:head>

<div class="profile">
  <h1>Profile</h1>

  <div class="profile-info">
    <div class="info-group">
      <label for="email">Email</label>
      <p id="email">{data.user.email || 'Guest Account'}</p>
    </div>

    {#if data.user.guest}
      <div class="guest-notice">
        <p>You're currently using a guest account. Create an account to:</p>
        <ul>
          <li>Save your order history</li>
          <li>Track your orders</li>
          <li>Save your shipping information</li>
        </ul>
        <a href="/auth/login" class="create-account">Create Account</a>
      </div>
    {/if}
  </div>
</div>

<style>
  .profile {
    max-width: 600px;
  }

  h1 {
    margin-bottom: 2rem;
  }

  .profile-info {
    background: var(--color-white);
    padding: 2rem;
    border: 1px solid var(--color-light-gray);
  }

  .info-group {
    margin-bottom: 1.5rem;
  }

  .info-group label {
    display: block;
    font-family: var(--font-heading);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    color: var(--color-dark-gray);
  }

  .guest-notice {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid var(--color-light-gray);
  }

  .guest-notice ul {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }

  .guest-notice li {
    margin-bottom: 0.5rem;
  }

  .create-account {
    display: inline-block;
    padding: 1rem 2rem;
    background: var(--color-black);
    color: var(--color-white);
    font-family: var(--font-heading);
    text-decoration: none;
    margin-top: 1rem;
  }
</style>