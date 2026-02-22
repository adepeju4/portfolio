<script lang="ts">
	import { PortableText } from '@portabletext/svelte';

	interface Props {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		value: any[];
	}

	let { value }: Props = $props();
</script>

<div class="prose max-w-none">
	<PortableText {value} />
</div>
