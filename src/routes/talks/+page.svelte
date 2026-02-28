<script lang="ts">
  import TalkList from '$lib/components/TalkList.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Talks — Adepeju Orefejo</title>
  <meta name="description" content="Tech talks and speaking engagements by Adepeju Orefejo." />

  <!-- Open Graph -->
  <meta property="og:title" content="Talks — Adepeju Orefejo" />
  <meta property="og:description" content="Tech talks and speaking engagements by Adepeju Orefejo." />
  <meta property="og:url" content="https://adepejuorefejo.com/talks" />
  <meta property="og:type" content="website" />

  <!-- Twitter -->
  <meta name="twitter:title" content="Talks — Adepeju Orefejo" />
  <meta name="twitter:description" content="Tech talks and speaking engagements by Adepeju Orefejo." />

  <!-- Canonical -->
  <link rel="canonical" href="https://adepejuorefejo.com/talks" />
</svelte:head>

<div class="py-24 px-6">
  <div class="mx-auto max-w-5xl">
    <TalkList talks={data.talks ?? []} />
  </div>
</div>
