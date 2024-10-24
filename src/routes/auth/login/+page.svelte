<script>
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";

  let loading = false;
  let error = null;

  async function handleGuestCheckout() {
    loading = true;
    error = null;
    
    try {
      const response = await fetch("/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "action=guest"
      });
      
      if (response.ok) {
        goto("/checkout");
      } else {
        const data = await response.json();
        error = data.error || "Failed to create guest session";
      }
    } catch (e) {
      error = "An error occurred. Please try again.";
    } finally {
      loading = false;
    }
  }
</script>

<div class="auth-container">
  <h1>Sign In</h1>
  
  <div class="auth-options">
    <button 
      class="guest-button" 
      on:click={handleGuestCheckout}
      disabled={loading}
    >
      {loading ? 'Please wait...' : 'Continue as Guest'}
    </button>
  </div>

  {#if error}
    <p class="error">{error}</p>
  {/if}
</div>

<style>
  .auth-container {
    max-width: 400px;
    margin: 4rem auto;
    padding: 2rem;
  }

  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }

  .auth-options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .guest-button {
    width: 100%;
    padding: 1rem;
    font-family: var(--font-heading);
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;
    background: var(--color-black);
    color: var(--color-white);
  }

  .guest-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .error {
    color: red;
    text-align: center;
    margin-top: 1rem;
    font-size: 0.875rem;
  }
</style>