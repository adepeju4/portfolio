<script lang="ts">
  import { urlFor } from "$lib/sanity/image";
  import PortableText from "$lib/components/PortableText.svelte";
  import { formatDate } from "$lib/utils/date";
  import { marked } from "marked";
  import DOMPurify from "isomorphic-dompurify";

  let { data } = $props<{ data: { post?: { body?: string } } }>();

const safeHtml = $derived.by(() => {
    const body = data?.post?.body ?? ''
    return DOMPurify.sanitize(marked.parse(body) as string)})
</script>

<svelte:head>
  <title>{data.post.title} — Portfolio</title>
  <meta name="description" content={data.post.excerpt ?? data.post.title} />
</svelte:head>

<article class="py-24 px-6">
  <div class="mx-auto max-w-3xl">
    <!-- Back link -->
    <a
      href="/blog"
      class="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors mb-10"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      All posts
    </a>

    <!-- Header -->
    <header class="mb-10">
      {#if data.post.tags?.length}
        <div class="flex flex-wrap gap-2 mb-4">
          {#each data.post.tags as tag}
            <span
              class="text-xs px-2 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-medium"
            >
              {tag}
            </span>
          {/each}
        </div>
      {/if}

      <h1
        class="text-4xl sm:text-5xl font-bold text-[var(--color-text)] leading-tight mb-4"
      >
        {data.post.title}
      </h1>

      {#if data.post.excerpt}
        <p class="text-xl text-[var(--color-muted)] leading-relaxed mb-6">
          {data.post.excerpt}
        </p>
      {/if}

      <div class="flex items-center gap-4 text-sm text-[var(--color-muted)]">
        {#if data.post.author}
          <div class="flex items-center gap-2">
            {#if data.post.author.image}
              <img
                src={urlFor(data.post.author.image)
                  .width(32)
                  .height(32)
                  .fit("crop")
                  .url()}
                alt={data.post.author.name}
                class="w-8 h-8 rounded-full"
              />
            {/if}
            <span>{data.post.author.name}</span>
          </div>
          <span class="text-[var(--color-surface-border)]">·</span>
        {/if}
        <time>{formatDate(data.post.publishedAt)}</time>
      </div>
    </header>

    <!-- Cover image -->
    {#if data.post.coverImage}
      <div class="mb-10 rounded-xl overflow-hidden">
        <img
          src={urlFor(data.post.coverImage)
            .width(900)
            .height(500)
            .fit("crop")
            .url()}
          alt={data.post.title}
          class="w-full"
        />
      </div>
    {/if}

    <!-- Body -->
    {#if data.post.body}
      <div class="prose prose-lg max-w-none">
  {@html safeHtml}
</div>
    {/if}
  </div>
</article>
