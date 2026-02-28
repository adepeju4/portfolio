<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} — Adepeju Orefejo</title>
</svelte:head>

<section class="flex flex-col justify-center px-6 pt-24 pb-16 min-h-screen">
	<div class="mx-auto max-w-6xl w-full">

		<!-- Top label row -->
		<div class="flex items-center justify-between mb-10 md:mb-16">
			<span class="text-xs tracking-widest uppercase text-[var(--color-muted)]">error</span>
			<span class="text-xs tracking-widest uppercase text-[var(--color-muted)]">page not found</span>
		</div>

		<!-- Big status code -->
		<div class="mb-6 md:mb-12">
			<p class="text-[clamp(5rem,20vw,14rem)] font-bold leading-[0.88] tracking-tight select-none">
				<span class="text-[var(--color-text)]">4</span><span class="text-[var(--color-primary)]">0</span><span class="text-[var(--color-text)]">4</span>
			</p>
		</div>

		<!-- Message + CTA row -->
		<div class="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
			<div class="max-w-sm">
				<p class="text-sm md:text-base text-[var(--color-muted)] leading-relaxed mb-8">
					this page doesn't exist — or it moved. either way, nothing to see here.
				</p>

				<a
					href="/"
					class="inline-flex items-center gap-2 text-sm text-[var(--color-text)] border-b border-[var(--color-text)] pb-0.5 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors"
				>
					go home
					<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
					</svg>
				</a>
			</div>

			<!-- Decorative code block -->
			<div class="text-xs text-[var(--color-muted)] leading-relaxed opacity-40 select-none hidden md:block">
				<p>$ curl https://adepejuorefejo.com{page.url.pathname}</p>
				<p class="text-[var(--color-primary)] opacity-100">HTTP/2 404</p>
				<p>content-type: text/html</p>
				<p>&#x276F; not found</p>
			</div>
		</div>

	</div>
</section>
