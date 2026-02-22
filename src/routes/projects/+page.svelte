<script lang="ts">
	import ProjectGrid from '$lib/components/ProjectGrid.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Projects — Adepeju Orefejo</title>
	<meta name="description" content="A collection of projects I've built — full-stack apps, research, and open source work." />

	<!-- Open Graph -->
	<meta property="og:title" content="Projects — Adepeju Orefejo" />
	<meta property="og:description" content="A collection of projects I've built — full-stack apps, research, and open source work." />
	<meta property="og:url" content="https://adepejuorefejo.com/projects" />
	<meta property="og:type" content="website" />

	<!-- Twitter -->
	<meta name="twitter:title" content="Projects — Adepeju Orefejo" />
	<meta name="twitter:description" content="A collection of projects I've built — full-stack apps, research, and open source work." />

	<!-- Canonical -->
	<link rel="canonical" href="https://adepejuorefejo.com/projects" />
</svelte:head>

<div class="py-24 px-6">
	<div class="mx-auto max-w-5xl">
		<ProjectGrid projects={data.projects ?? []} title="All Projects" />
	</div>
</div>
