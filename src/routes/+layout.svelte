<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>Adepeju Orefejo — Software Engineer</title>
	<meta name="description" content="Software engineer building thoughtful products. Based in Berlin." />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta charset="utf-8" />

	<!-- Open Graph -->
	<meta property="og:site_name" content="Adepeju Orefejo" />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:image" content="https://adepejuorefejo.com/og.jpeg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:creator" content="@adepejuorefejo" />
	<meta name="twitter:image" content="https://adepejuorefejo.com/og.jpeg" />

	<!-- Misc -->
	<meta name="author" content="Adepeju Orefejo" />
	<link rel="canonical" href="https://adepejuorefejo.com" />
</svelte:head>


<div class="flex flex-col min-h-screen">
	<Nav />
	<main class="pt-16 flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
