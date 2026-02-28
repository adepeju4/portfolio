<script lang="ts">
  const year = new Date().getFullYear();
</script>

<footer class="py-8 px-6 border-t border-[var(--color-surface-border)]">
  <div class="mx-auto max-w-6xl flex items-center justify-between">
    <p class="text-xs text-[var(--color-muted)] tracking-wide">
      &copy; {year} adepeju orefejo
    </p>

    {#if import.meta.env.DEV}
      <a
        href="/studio"
        class="text-xs text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors"
      >
        studio ↗
      </a>
    {/if}
  </div>
</footer>
