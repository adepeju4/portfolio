<script lang="ts">
	import About from '$lib/components/About.svelte';
	import BlogPostList from '$lib/components/BlogPostList.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import ProjectGrid from '$lib/components/ProjectGrid.svelte';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();

	const desc = data.author?.bioText ?? data.author?.headline ?? 'Software engineer building thoughtful products. Based in Berlin.';
</script>

<svelte:head>
	<title>Adepeju Orefejo — Software Engineer</title>
	<meta name="description" content={desc} />

	<!-- Open Graph -->
	<meta property="og:title" content="Adepeju Orefejo — Software Engineer" />
	<meta property="og:description" content={desc} />
	<meta property="og:url" content="https://adepejuorefejo.com" />
	<meta property="og:type" content="website" />

	<!-- Twitter -->
	<meta name="twitter:title" content="Adepeju Orefejo — Software Engineer" />
	<meta name="twitter:description" content={desc} />

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
