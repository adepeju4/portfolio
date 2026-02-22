<script lang="ts">
	import { urlFor } from '$lib/sanity/image';
	import { formatDateShort } from '$lib/utils/date';

	interface Props {
		post: {
			_id: string;
			title: string;
			slug: { current: string };
			excerpt?: string;
			coverImage?: object;
			tags?: string[];
			publishedAt: string;
			author?: { name: string; image?: object };
		};
	}

	let { post }: Props = $props();
</script>

<article class="group flex flex-col gap-3 border-b border-[var(--color-surface-border)] pb-8">
	<div class="flex items-center gap-3">
		<time class="text-xs text-[var(--color-muted)]">{formatDateShort(post.publishedAt)}</time>
		{#if post.tags?.length}
			{#each post.tags.slice(0, 2) as tag}
				<span class="text-xs text-[var(--color-muted)]">#{tag}</span>
			{/each}
		{/if}
	</div>

	<h3 class="text-base font-light text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors leading-snug">
		<a href="/blog/{post.slug.current}">{post.title}</a>
	</h3>

	{#if post.excerpt}
		<p class="text-sm font-light text-[var(--color-muted)] leading-relaxed line-clamp-2">
			{post.excerpt}
		</p>
	{/if}

	<a
		href="/blog/{post.slug.current}"
		class="text-xs text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors mt-1"
	>
		read →
	</a>
</article>
