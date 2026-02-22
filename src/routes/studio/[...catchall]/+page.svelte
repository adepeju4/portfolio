<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let container: HTMLDivElement;
	let unmount: (() => void) | undefined;

	onMount(async () => {
		const [{ createRoot }, { default: React }, { default: config }] = await Promise.all([
			import('react-dom/client'),
			import('react'),
			import('../../../../sanity.config')
		]);
		const { Studio } = await import('sanity');

		const root = createRoot(container);
		root.render(React.createElement(Studio, { config }));

		unmount = () => root.unmount();
	});

	onDestroy(() => {
		unmount?.();
	});
</script>

<svelte:head>
	<title>Studio — Portfolio</title>
</svelte:head>

<div
	bind:this={container}
	style="height: 100vh; width: 100vw; position: fixed; top: 0; left: 0; z-index: 9999;"
></div>
