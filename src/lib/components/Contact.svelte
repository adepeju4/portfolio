<script lang="ts">
	interface Props {
		author: {
			name?: string;
			socialLinks?: {
				github?: string;
				twitter?: string;
				linkedin?: string;
				email?: string;
			};
		} | null;
	}

	let { author }: Props = $props();
</script>

<section id="contact" class="py-24 px-6 border-t border-[var(--color-surface-border)]">
	<div class="mx-auto max-w-6xl">

		<p class="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-text)] leading-tight mb-8 md:mb-10">
			let's talk.
		</p>

		<div class="flex flex-wrap items-center gap-5 md:gap-6">
			{#if author?.socialLinks?.email}
				<a
					href="mailto:{author.socialLinks.email}"
					class="text-sm text-[var(--color-text)] border-b border-[var(--color-text)] pb-0.5 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors"
				>
					{author.socialLinks.email}
				</a>
			{/if}
			{#if author?.socialLinks?.linkedin}
				<a href={author.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" class="text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors">
					linkedin ↗
				</a>
			{/if}
			{#if author?.socialLinks?.github}
				<a href={author.socialLinks.github} target="_blank" rel="noopener noreferrer" class="text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors">
					github ↗
				</a>
			{/if}
			{#if !author?.socialLinks}
				<p class="text-sm text-[var(--color-muted)]">
					Add contact info in <a href="/studio" class="text-[var(--color-primary)] hover:underline">Sanity Studio</a>.
				</p>
			{/if}
		</div>

	</div>
</section>
