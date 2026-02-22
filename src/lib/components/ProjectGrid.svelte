<script lang="ts">
	import ProjectCard from './ProjectCard.svelte';

	interface Props {
		projects: Array<{
			_id: string;
			title: string;
			description: string;
			image?: object;
			tags?: string[];
			liveUrl?: string;
			repoUrl?: string;
		}>;
		showViewAll?: boolean;
		title?: string;
	}

	let { projects, showViewAll = false, title = 'Projects' }: Props = $props();
</script>

<section id="projects" class="py-24 px-6 border-t border-[var(--color-surface-border)]">
	<div class="mx-auto max-w-6xl">

		<!-- Section label -->
		<div class="flex items-center justify-between mb-10 md:mb-14">
			<span class="text-xs tracking-widest uppercase text-[var(--color-muted)]">work</span>
			{#if showViewAll}
				<a href="/projects" class="text-sm text-[var(--color-primary)] hover:opacity-70 transition-opacity">
					see all →
				</a>
			{/if}
		</div>

		{#if projects.length > 0}
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
				{#each projects as project (project._id)}
					<ProjectCard {project} />
				{/each}
			</div>
		{:else}
			<p class="text-sm text-[var(--color-muted)]">
				No projects yet — add them in <a href="/studio" class="text-[var(--color-primary)] hover:underline">Sanity Studio</a>.
			</p>
		{/if}

	</div>
</section>
