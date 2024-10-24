<script>
  export let variant = 'primary';
  export let className = '';
</script>

<div class={`logo-wrapper ${className}`}>
  <img
    src={variant === 'primary' 
      ? '/images/logo-primary.svg'
      : variant === 'secondary'
      ? '/images/logo-secondary.svg'
      : '/images/logo-tertiary.svg'}
    alt="Seventy Eighty"
    class="logo"
  />
</div>

<style>
  .logo-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .logo {
    width: 100%;
    height: auto;
    display: block;
  }
</style>