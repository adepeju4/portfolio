<script lang="ts">
	interface Props {
		project: {
			_id: string;
			title: string;
			slug?: { current?: string };
			year?: string;
			role?: string;
			description: string;
			summary?: string;
			highlights?: string[];
			tags?: string[];
			liveUrl?: string;
			repoUrl?: string;
		};
		index: number;
	}

	let { project, index }: Props = $props();

	const numberLabel = String(index + 1).padStart(2, '0');
	const paragraphs = $derived(
		(project.summary ?? '')
			.split(/\n\s*\n/)
			.map((p) => p.trim())
			.filter(Boolean)
	);
</script>

<article class="group py-10 md:py-14 border-t border-[var(--color-surface-border)] first:border-t-0">
	<!-- Meta row: index · year · role -->
	<div class="flex items-center gap-4 mb-6 text-xs tracking-widest uppercase text-[var(--color-muted)]">
		<span class="text-[var(--color-text)] font-medium">{numberLabel}</span>
		<span class="flex-1 h-px bg-[var(--color-surface-border)]"></span>
		{#if project.year}
			<span>{project.year}</span>
		{/if}
		{#if project.year && project.role}
			<span aria-hidden="true">·</span>
		{/if}
		{#if project.role}
			<span>{project.role}</span>
		{/if}
	</div>

	<!-- Title row + links -->
	<div class="flex items-start justify-between gap-6 mb-4">
		{#if project.slug?.current}
			<a
				href="/projects/{project.slug.current}"
				class="text-2xl md:text-4xl font-medium tracking-tight text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors"
			>
				<h3>{project.title}</h3>
			</a>
		{:else}
			<h3 class="text-2xl md:text-4xl font-medium tracking-tight text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
				{project.title}
			</h3>
		{/if}

		<div class="flex items-center gap-5 shrink-0 pt-2">
			{#if project.liveUrl}
				<a
					href={project.liveUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-1.5 text-xs tracking-widest uppercase text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors"
				>
					live
					<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 7L7 17M17 7H9M17 7v8" />
					</svg>
				</a>
			{/if}
			{#if project.repoUrl}
				<a
					href={project.repoUrl}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Repository"
					class="text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
						<path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
					</svg>
				</a>
			{/if}
		</div>
	</div>

	<!-- Short tagline -->
	<p class="text-sm md:text-base text-[var(--color-muted)] leading-relaxed max-w-2xl mb-6">
		{project.description}
	</p>

	<!-- Body: rich summary + highlights -->
	{#if paragraphs.length > 0 || project.highlights?.length}
		<div class="grid md:grid-cols-5 gap-8 md:gap-12 mb-6">
			{#if paragraphs.length > 0}
				<div class="md:col-span-3 flex flex-col gap-4 text-sm md:text-[0.95rem] text-[var(--color-text)] leading-relaxed">
					{#each paragraphs as para}
						<p>{para}</p>
					{/each}
				</div>
			{/if}

			{#if project.highlights?.length}
				<ul class="md:col-span-2 flex flex-col gap-2.5 text-sm text-[var(--color-muted)] leading-relaxed">
					{#each project.highlights as item}
						<li class="flex gap-3">
							<span class="text-[var(--color-primary)] shrink-0" aria-hidden="true">→</span>
							<span>{item}</span>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/if}

	<!-- Tags + read more -->
	<div class="flex items-end justify-between gap-6 flex-wrap">
		{#if project.tags?.length}
			<div class="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-[var(--color-muted)]">
				{#each project.tags as tag}
					<span>#{tag}</span>
				{/each}
			</div>
		{:else}
			<span></span>
		{/if}

		{#if project.slug?.current}
			<a
				href="/projects/{project.slug.current}"
				class="inline-flex items-center gap-1.5 text-xs tracking-widest uppercase text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors"
			>
				read case study →
			</a>
		{/if}
	</div>
</article>
