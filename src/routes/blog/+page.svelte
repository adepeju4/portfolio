<script lang="ts">
	import BlogPostCard from '$lib/components/BlogPostCard.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Writing — Adepeju Orefejo</title>
	<meta name="description" content="Articles, tutorials, and thoughts on engineering, systems, and things I find interesting." />

	<!-- Open Graph -->
	<meta property="og:title" content="Writing — Adepeju Orefejo" />
	<meta property="og:description" content="Articles, tutorials, and thoughts on engineering, systems, and things I find interesting." />
	<meta property="og:url" content="https://adepejuorefejo.com/blog" />
	<meta property="og:type" content="website" />

	<!-- Twitter -->
	<meta name="twitter:title" content="Writing — Adepeju Orefejo" />
	<meta name="twitter:description" content="Articles, tutorials, and thoughts on engineering, systems, and things I find interesting." />

	<!-- Canonical -->
	<link rel="canonical" href="https://adepejuorefejo.com/blog" />
</svelte:head>

<div class="py-16 md:py-24 px-6 pt-28 md:pt-32">
	<div class="mx-auto max-w-6xl">

		<!-- Header -->
		<div class="mb-14 md:mb-20">
			<h1 class="text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[0.92] tracking-tight text-[var(--color-text)]">
				writing.
			</h1>
			<p class="text-sm font-light text-[var(--color-muted)] mt-4">thoughts on engineering, systems, and things i find interesting.</p>
		</div>

		{#if data.posts?.length > 0}
			<div class="flex flex-col gap-6">
				{#each data.posts as post (post._id)}
					<BlogPostCard {post} />
				{/each}
			</div>
		{:else}
			<p class="text-sm text-[var(--color-muted)]">
				Nothing here yet — check back soon.
			</p>
		{/if}
	</div>
</div>
