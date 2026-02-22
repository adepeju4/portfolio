<script lang="ts">
	import { page } from '$app/state';
	let mobileOpen = $state(false);
</script>

<header class="fixed top-0 left-0 right-0 z-50 px-6 py-5 bg-[var(--color-surface)]/80 backdrop-blur-sm">
	<div class="mx-auto max-w-6xl flex items-center justify-between">
		<a href="/" class="text-sm tracking-widest uppercase text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors font-medium">
			adepeju.
		</a>

		<!-- Desktop nav -->
		<nav class="hidden md:flex items-center gap-10">
			<a href="/#projects" class="text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors">work</a>
			<a href="/#about" class="text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors">about</a>
			<a href="/blog" class="text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors {page.url.pathname.startsWith('/blog') ? 'text-[var(--color-text)]' : ''}">writing</a>
			<a href="/#contact" class="text-sm text-[var(--color-primary)] hover:opacity-70 transition-opacity">say hi →</a>
		</nav>

		<!-- Mobile hamburger -->
		<button
			class="md:hidden text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
			onclick={() => (mobileOpen = !mobileOpen)}
			aria-label="Toggle menu"
		>
			{#if mobileOpen}
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
				</svg>
			{:else}
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			{/if}
		</button>
	</div>

	<!-- Mobile menu -->
	{#if mobileOpen}
		<div class="md:hidden mt-6 pb-4 flex flex-col gap-5 px-1">
			<a href="/#projects" onclick={() => mobileOpen = false} class="text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors">work</a>
			<a href="/#about" onclick={() => mobileOpen = false} class="text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors">about</a>
			<a href="/blog" onclick={() => mobileOpen = false} class="text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors">writing</a>
			<a href="/#contact" onclick={() => mobileOpen = false} class="text-sm text-[var(--color-primary)]">say hi →</a>
		</div>
	{/if}
</header>
