<script lang="ts">
	import { urlFor } from '$lib/sanity/image';

	interface Talk {
		_id: string;
		title: string;
		event: string;
		date: string;
		description?: string;
		tags?: string[];
		image?: object;
		slidesUrl?: string;
		recordingUrl?: string;
		featured?: boolean;
	}

	interface Props {
		talks: Talk[];
	}

	let { talks }: Props = $props();
</script>

{#if talks.length === 0}
	<p class="text-sm text-[var(--color-muted)]">Nothing here yet — check back soon.</p>
{:else}
	<div class="flex flex-col gap-10">
		{#each talks as talk (talk._id)}
			<article class="group flex flex-col gap-3 border-b border-[var(--color-surface-border)] pb-10">
				{#if talk.image}
					<div class="overflow-hidden rounded-sm aspect-video mb-1">
						<img
							src={urlFor(talk.image).width(800).height(450).fit('crop').url()}
							alt={talk.title}
							class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
						/>
					</div>
				{/if}

				<div class="flex items-center gap-3">
					<time class="text-xs text-[var(--color-muted)]">{new Date(talk.date).getFullYear()}</time>
					<span class="text-xs text-[var(--color-muted)]">{talk.event}</span>
					{#if talk.tags?.length}
						{#each talk.tags.slice(0, 2) as tag}
							<span class="text-xs text-[var(--color-muted)]">#{tag}</span>
						{/each}
					{/if}
				</div>

				<h3 class="text-base font-light text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors leading-snug">
					{talk.title}
				</h3>

				{#if talk.description}
					<p class="text-sm font-light text-[var(--color-muted)] leading-relaxed line-clamp-2">
						{talk.description}
					</p>
				{/if}

				{#if talk.slidesUrl || talk.recordingUrl}
					<div class="flex items-center gap-4 mt-1">
						{#if talk.slidesUrl}
							<a
								href={talk.slidesUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="text-xs text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors"
							>
								slides →
							</a>
						{/if}
						{#if talk.recordingUrl}
							<a
								href={talk.recordingUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="text-xs text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors"
							>
								recording →
							</a>
						{/if}
					</div>
				{/if}
			</article>
		{/each}
	</div>
{/if}
