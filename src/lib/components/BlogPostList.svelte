<script lang="ts">
	import BlogPostCard from './BlogPostCard.svelte';

	interface Props {
		posts: Array<{
			_id: string;
			title: string;
			slug: { current: string };
			excerpt?: string;
			coverImage?: object;
			tags?: string[];
			publishedAt: string;
			author?: { name: string; image?: object };
		}>;
		showViewAll?: boolean;
		title?: string;
	}

	let { posts, showViewAll = false, title = 'Writing' }: Props = $props();
</script>

{#if posts.length > 0}
	<section id="blog" class="py-16 md:py-24 px-6 border-t border-[var(--color-surface-border)]">
		<div class="mx-auto max-w-6xl">
			<div class="flex items-center justify-between mb-10 md:mb-14">
				<span class="text-xs tracking-widest uppercase text-[var(--color-muted)]">writing</span>
				{#if showViewAll}
					<a href="/blog" class="text-sm text-[var(--color-primary)] hover:opacity-70 transition-opacity">
						all posts →
					</a>
				{/if}
			</div>

			<div class="flex flex-col">
				{#each posts as post (post._id)}
					<BlogPostCard {post} />
				{/each}
			</div>
		</div>
	</section>
{/if}
