<script lang="ts">
	interface Props {
		author: {
			name?: string;
			bio?: string;
			skills?: string[];
		} | null;
	}

	let { author }: Props = $props();
</script>

{#if author?.bio || author?.skills?.length}
	<section id="about" class="py-16 md:py-24 px-6 border-t border-[var(--color-surface-border)]">
		<div class="mx-auto max-w-6xl">

			<!-- Bio + Stack -->
			<div class="mb-14 md:mb-20">
				{#if author.bio}
					<p class="text-lg md:text-xl font-light text-[var(--color-text)] leading-relaxed mb-8 md:mb-12 max-w-2xl">
						{author.bio}
					</p>
				{/if}

				{#if author.skills?.length}
					<div>
						<p class="text-xs tracking-widest uppercase text-[var(--color-muted)] mb-4">stack</p>
						<div class="flex flex-wrap gap-2">
							{#each author.skills as skill}
								<span class="text-sm font-light px-3 py-1 rounded-full border border-[var(--color-surface-border)] text-[var(--color-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors cursor-default">
									{skill}
								</span>
							{/each}
						</div>
					</div>
				{/if}
			</div>

			<!-- Education + Research -->
			<div class="border-t border-[var(--color-surface-border)] pt-14 md:pt-20">
				<p class="text-xs tracking-widest uppercase text-[var(--color-muted)] mb-8 md:mb-10">education & research</p>

				<div class="flex flex-col gap-8 md:gap-12">
					<!-- MSc -->
					<div>
						<div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4 mb-1">
							<h3 class="text-base font-light text-[var(--color-text)]">M.Sc. Software Engineering</h3>
							<span class="text-xs text-[var(--color-muted)] shrink-0">2025</span>
						</div>
						<p class="text-sm font-light text-[var(--color-muted)]">Euclea Business School — France, Europe</p>
					</div>

					<!-- Research project -->
					<div>
						<div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4 mb-2">
							<h3 class="text-base font-light text-[var(--color-text)]">Emotion Detection for Autism Support</h3>
							<span class="text-xs text-[var(--color-muted)] shrink-0">2024 – 2025</span>
						</div>
						<p class="text-sm font-light text-[var(--color-muted)] leading-relaxed max-w-xl">
							Trained CNNs for facial emotion recognition on FER2013, CK+, and AffectNet datasets — improving detection accuracy by 35%. Built D3.js Sunburst visualisations to represent emotional states for researchers and developers.
						</p>
						<div class="flex flex-wrap gap-1.5 mt-3">
							{#each ['Python', 'CNN', 'Deep Learning', 'D3.js', 'FER2013', 'AffectNet'] as tag}
								<span class="text-xs font-light text-[var(--color-muted)]">#{tag}</span>
							{/each}
						</div>
					</div>
				</div>
			</div>

		</div>
	</section>
{/if}
