<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>Portfolio</title>
	<meta name="description" content="Developer portfolio" />
</svelte:head>


<div class="flex flex-col min-h-screen">
	<Nav />
	<main class="pt-16 flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
