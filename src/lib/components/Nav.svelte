<script lang="ts">
	import { page } from '$app/state';
	import { browser } from '$app/environment';
	import { animate } from 'motion';
	import { slide, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let mobileOpen = $state(false);
	let inverted = $state(browser ? localStorage.getItem('inverted') !== 'false' : true);

	$effect(() => {
		if (inverted) {
			document.documentElement.classList.add('inverted');
			localStorage.setItem('inverted', 'true');
		} else {
			document.documentElement.classList.remove('inverted');
			localStorage.setItem('inverted', 'false');
		}
	});

	function toggleTheme(el: HTMLElement) {
		inverted = !inverted;
		animate(
			el,
			{ rotate: [0, 360], scale: [1, 1.35, 1] },
			{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }
		);
	}
</script>

<header class="fixed top-0 left-0 right-0 z-50 px-6 py-5 bg-[var(--color-surface)]/80 backdrop-blur-sm">
	<div class="mx-auto max-w-6xl flex items-center justify-between">
		<a href="/" class="text-sm tracking-widest uppercase text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors font-medium">
			adepeju.
		</a>

		<!-- Desktop nav -->
		<nav class="hidden md:flex items-center gap-10">
			<a href="/#about" class="text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors">about</a>
			<a href="/projects" class="text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors">work</a>
			<a href="/blog" class="text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors {page.url.pathname.startsWith('/blog') ? 'text-[var(--color-text)]' : ''}">writing</a>
			<a href="/talks" class="text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors {page.url.pathname.startsWith('/talks') ? 'text-[var(--color-text)]' : ''}">talks</a>
			<a href="/#contact" class="text-sm text-[var(--color-primary)] hover:opacity-70 transition-opacity">say hi →</a>
			<button
				onclick={(e) => toggleTheme(e.currentTarget)}
				class="text-base w-8 h-8 flex items-center justify-center rounded-full border border-[var(--color-surface-border)] text-[var(--color-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-muted)] transition-colors"
				aria-label="Toggle negative mode"
			>{inverted ? '◑' : '◐'}</button>
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
		<div class="md:hidden mt-6 pb-4 flex flex-col gap-5 px-1" transition:slide={{ duration: 280, easing: quintOut }}>
			<a in:fly={{ y: 8, duration: 260, delay: 40, easing: quintOut }} href="/#projects" onclick={() => mobileOpen = false} class="text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors">work</a>
			<a in:fly={{ y: 8, duration: 260, delay: 85, easing: quintOut }} href="/#about" onclick={() => mobileOpen = false} class="text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors">about</a>
			<a in:fly={{ y: 8, duration: 260, delay: 130, easing: quintOut }} href="/blog" onclick={() => mobileOpen = false} class="text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors">writing</a>
			<a in:fly={{ y: 8, duration: 260, delay: 175, easing: quintOut }} href="/talks" onclick={() => mobileOpen = false} class="text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors">talks</a>
			<a in:fly={{ y: 8, duration: 260, delay: 220, easing: quintOut }} href="/#contact" onclick={() => mobileOpen = false} class="text-sm text-[var(--color-primary)]">say hi →</a>
			<button
				in:fly={{ y: 8, duration: 260, delay: 265, easing: quintOut }}
				onclick={(e) => toggleTheme(e.currentTarget)}
				class="text-base w-8 h-8 flex items-center justify-center rounded-full border border-[var(--color-surface-border)] text-[var(--color-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-muted)] transition-colors"
				aria-label="Toggle negative mode"
			>{inverted ? '◑' : '◐'}</button>
		</div>
	{/if}
</header>
