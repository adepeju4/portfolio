<script lang="ts">
	import About from '$lib/components/About.svelte';
	import BlogPostList from '$lib/components/BlogPostList.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import ProjectGrid from '$lib/components/ProjectGrid.svelte';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.author?.name ?? 'Portfolio'}</title>
	<meta name="description" content={data.author?.bio ?? 'Developer portfolio'} />
</svelte:head>

<Hero author={data.author} />
<About author={data.author} />
<ProjectGrid projects={data.featuredProjects ?? []} showViewAll title="Featured Projects" />
<BlogPostList posts={data.recentPosts ?? []} showViewAll title="Recent Writing" />
<Contact author={data.author} />
