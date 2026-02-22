<script lang="ts">
	import ProjectGrid from '$lib/components/ProjectGrid.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Projects — Portfolio</title>
	<meta name="description" content="All my projects and work." />
</svelte:head>

<div class="py-24 px-6">
	<div class="mx-auto max-w-5xl">
		<ProjectGrid projects={data.projects ?? []} title="All Projects" />
	</div>
</div>
