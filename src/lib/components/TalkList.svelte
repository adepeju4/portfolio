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

<section id="talks" class="py-16 md:py-24 px-6">
  <div class="mx-auto max-w-6xl">
    <span class="text-xs tracking-widest uppercase text-[var(--color-muted)] block mb-10 md:mb-14">
      talks
    </span>

    {#if talks.length === 0}
      <p class="text-sm text-[var(--color-muted)]">No talks yet.</p>
    {:else}
      <div class="flex flex-col">
        {#each talks as talk (talk._id)}
          <article class="group flex flex-col gap-3 border-b border-[var(--color-surface-border)] pb-8 mb-8">
            {#if talk.image}
              <img
                src={urlFor(talk.image).width(800).height(450).fit('crop').url()}
                alt={talk.title}
                class="w-full aspect-video object-cover rounded-sm mb-1"
              />
            {/if}

            <div class="flex items-center gap-3">
              <time class="text-xs text-[var(--color-muted)]">
                {new Date(talk.date).getFullYear()}
              </time>
              <span class="text-xs text-[var(--color-muted)]">{talk.event}</span>
              {#if talk.tags?.length}
                {#each talk.tags.slice(0, 2) as tag}
                  <span class="text-xs text-[var(--color-muted)]">#{tag}</span>
                {/each}
              {/if}
            </div>

            <h3 class="text-base font-light text-[var(--color-text)] leading-snug">
              {talk.title}
            </h3>

            {#if talk.description}
              <p class="text-sm font-light text-[var(--color-muted)] leading-relaxed">
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
  </div>
</section>
