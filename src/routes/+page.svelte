<script lang="ts">
	import About from '$lib/components/About.svelte';
	import BlogPostList from '$lib/components/BlogPostList.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import ProjectGrid from '$lib/components/ProjectGrid.svelte';
	import { urlFor } from '$lib/sanity/image';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	const ogImage = data.author?.image
		? urlFor(data.author.image).width(1200).height(630).fit('crop').url()
		: null;
</script>

<svelte:head>
	<title>Adepeju Orefejo — Software Engineer</title>
	<meta name="description" content={data.author?.bioText ?? data.author?.headline ?? 'Software engineer building thoughtful products. Based in Berlin.'} />

	<!-- Open Graph -->
	<meta property="og:title" content="Adepeju Orefejo — Software Engineer" />
	<meta property="og:description" content={data.author?.bioText ?? data.author?.headline ?? 'Software engineer building thoughtful products. Based in Berlin.'} />
	<meta property="og:url" content="https://adepejuorefejo.com" />
	<meta property="og:type" content="website" />
	{#if ogImage}
		<meta property="og:image" content={ogImage} />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />
		<meta name="twitter:image" content={ogImage} />
	{/if}

	<!-- Twitter -->
	<meta name="twitter:title" content="Adepeju Orefejo — Software Engineer" />
	<meta name="twitter:description" content={data.author?.bioText ?? data.author?.headline ?? 'Software engineer building thoughtful products. Based in Berlin.'} />

	<!-- Canonical -->
	<link rel="canonical" href="https://adepejuorefejo.com" />

	<!-- JSON-LD -->
	{@html `<script type="application/ld+json">${JSON.stringify({
		"@context": "https://schema.org",
		"@type": "Person",
		"name": "Adepeju Orefejo",
		"url": "https://adepejuorefejo.com",
		"jobTitle": "Software Engineer",
		"sameAs": [
			data.author?.socialLinks?.github ?? "https://github.com/adepeju4",
			data.author?.socialLinks?.linkedin ?? ""
		].filter(Boolean)
	})}</script>`}
</svelte:head>

<Hero author={data.author} />
<About author={data.author} />
<ProjectGrid projects={data.featuredProjects ?? []} showViewAll title="Featured Projects" />
<BlogPostList posts={data.recentPosts ?? []} showViewAll title="Recent Writing" />
<Contact author={data.author} />
