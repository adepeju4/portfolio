<script lang="ts">
	import { marked } from 'marked';
	import { urlFor } from '$lib/sanity/image';

	type ImageMedia = {
		_type: 'image';
		_key: string;
		asset?: unknown;
		caption?: string;
		alt?: string;
	};
	type VideoMedia = {
		_type: 'video';
		_key: string;
		url: string;
		caption?: string;
	};
	type MediaItem = ImageMedia | VideoMedia;

	let { data } = $props<{
		data: {
			project: {
				_id: string;
				title: string;
				slug?: { current?: string };
				year?: string;
				role?: string;
				description: string;
				summary?: string;
				highlights?: string[];
				body?: string;
				media?: MediaItem[];
				tags?: string[];
				liveUrl?: string;
				repoUrl?: string;
			};
		};
	}>();

	const project = $derived(data.project);

	function videoEmbed(rawUrl: string): { kind: 'iframe' | 'file'; src: string } {
		try {
			const url = new URL(rawUrl);
			const host = url.hostname.replace(/^www\./, '');

			if (host === 'youtube.com' || host === 'm.youtube.com') {
				const id = url.searchParams.get('v');
				if (id) return { kind: 'iframe', src: `https://www.youtube.com/embed/${id}` };
			}
			if (host === 'youtu.be') {
				const id = url.pathname.slice(1);
				if (id) return { kind: 'iframe', src: `https://www.youtube.com/embed/${id}` };
			}
			if (host === 'vimeo.com') {
				const id = url.pathname.split('/').filter(Boolean).pop();
				if (id) return { kind: 'iframe', src: `https://player.vimeo.com/video/${id}` };
			}
		} catch {
			// fall through to file
		}
		return { kind: 'file', src: rawUrl };
	}

	const summaryParagraphs = $derived(
		(project.summary ?? '')
			.split(/\n\s*\n/)
			.map((p: string) => p.trim())
			.filter(Boolean)
	);

	const bodyHtml = $derived.by(() => {
		const body = project.body;
		if (typeof body !== 'string' || !body.trim()) return '';
		return marked.parse(body) as string;
	});
</script>

<svelte:head>
	<title>{project.title} — Adepeju Orefejo</title>
	<meta name="description" content={project.description} />

	<meta property="og:title" content="{project.title} — Adepeju Orefejo" />
	<meta property="og:description" content={project.description} />
	<meta property="og:url" content="https://adepejuorefejo.com/projects/{project.slug?.current}" />
	<meta property="og:type" content="article" />

	<meta name="twitter:title" content="{project.title} — Adepeju Orefejo" />
	<meta name="twitter:description" content={project.description} />

	<link rel="canonical" href="https://adepejuorefejo.com/projects/{project.slug?.current}" />
</svelte:head>

<article class="py-20 md:py-28 px-6">
	<div class="mx-auto max-w-3xl">
		<!-- Back link -->
		<a
			href="/projects"
			class="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors mb-12"
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
			all projects
		</a>

		<!-- Meta row -->
		<div class="flex items-center gap-4 mb-6 text-xs tracking-widest uppercase text-[var(--color-muted)]">
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

		<!-- Title -->
		<h1 class="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[var(--color-text)] leading-[1.02] mb-6">
			{project.title}
		</h1>

		<!-- Tagline -->
		<p class="text-lg md:text-xl text-[var(--color-muted)] leading-relaxed mb-10 max-w-2xl">
			{project.description}
		</p>

		<!-- Action links -->
		{#if project.liveUrl || project.repoUrl}
			<div class="flex items-center gap-6 flex-wrap mb-14 pb-14 border-b border-[var(--color-surface-border)]">
				{#if project.liveUrl}
					<a
						href={project.liveUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 text-sm text-[var(--color-text)] border-b border-[var(--color-text)] pb-0.5 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors"
					>
						visit live site
						<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 7L7 17M17 7H9M17 7v8" />
						</svg>
					</a>
				{/if}
				{#if project.repoUrl}
					<a
						href={project.repoUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
					>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
						</svg>
						view source
					</a>
				{/if}
			</div>
		{/if}

		<!-- Media gallery -->
		{#if project.media?.length}
			<div class="flex flex-col gap-10 mb-14">
				{#each project.media as item (item._key)}
					{#if item._type === 'image' && item.asset}
						<figure class="flex flex-col gap-3">
							<div class="overflow-hidden rounded-xl border border-[var(--color-surface-border)]">
								<img
									src={urlFor(item).width(1400).fit('max').quality(90).url()}
									alt={item.alt ?? item.caption ?? ''}
									class="w-full h-auto"
									loading="lazy"
								/>
							</div>
							{#if item.caption}
								<figcaption class="text-xs tracking-wide text-[var(--color-muted)] px-1">
									{item.caption}
								</figcaption>
							{/if}
						</figure>
					{:else if item._type === 'video' && item.url}
						{@const embed = videoEmbed(item.url)}
						<figure class="flex flex-col gap-3">
							<div class="overflow-hidden rounded-xl border border-[var(--color-surface-border)] bg-[var(--color-surface-alt)]">
								{#if embed.kind === 'iframe'}
									<div class="aspect-video">
										<iframe
											src={embed.src}
											title={item.caption ?? 'Video'}
											allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
											allowfullscreen
											class="w-full h-full"
										></iframe>
									</div>
								{:else}
									<video src={embed.src} controls playsinline class="w-full h-auto">
										<track kind="captions" />
									</video>
								{/if}
							</div>
							{#if item.caption}
								<figcaption class="text-xs tracking-wide text-[var(--color-muted)] px-1">
									{item.caption}
								</figcaption>
							{/if}
						</figure>
					{/if}
				{/each}
			</div>
		{/if}

		<!-- Summary paragraphs -->
		{#if summaryParagraphs.length > 0}
			<div class="flex flex-col gap-5 text-base md:text-lg text-[var(--color-text)] leading-relaxed mb-14">
				{#each summaryParagraphs as para}
					<p>{para}</p>
				{/each}
			</div>
		{/if}

		<!-- Highlights -->
		{#if project.highlights?.length}
			<div class="mb-14">
				<h2 class="text-xs tracking-widest uppercase text-[var(--color-muted)] mb-5">highlights</h2>
				<ul class="flex flex-col gap-3 text-base text-[var(--color-text)] leading-relaxed">
					{#each project.highlights as item}
						<li class="flex gap-3">
							<span class="text-[var(--color-primary)] shrink-0" aria-hidden="true">→</span>
							<span>{item}</span>
						</li>
					{/each}
				</ul>
			</div>
		{/if}

		<!-- Body (long-form case study) -->
		{#if bodyHtml}
			<div class="prose prose-lg max-w-none mb-14">
				{@html bodyHtml}
			</div>
		{/if}

		<!-- Tags -->
		{#if project.tags?.length}
			<div class="pt-10 border-t border-[var(--color-surface-border)]">
				<h2 class="text-xs tracking-widest uppercase text-[var(--color-muted)] mb-4">built with</h2>
				<div class="flex flex-wrap gap-x-4 gap-y-2 text-sm text-[var(--color-muted)]">
					{#each project.tags as tag}
						<span>#{tag}</span>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</article>
