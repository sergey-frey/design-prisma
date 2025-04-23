<script lang="ts">
	import { copyToClipboard } from "@/shared/utils";
	import { CopyIcon, OkIcon } from "@/shared/ui/icons";
	import { fade } from "svelte/transition";
	import { twJoin } from "tailwind-merge";

	type CopyButtonProps = {
		class?: string;
		code: string;
	};

	const { class: className, code }: CopyButtonProps = $props();

	let wasCopied = $state(false);

	const handleClick = () => {
		copyToClipboard(code);
		wasCopied = true;

		setTimeout(() => {
			wasCopied = false;
		}, 800);
	};
</script>

<button
	type="button"
	class={twJoin(className, "text-indigo-600 w-6 h-6", "opacity-70")}
	onclick={handleClick}
	title="Copy"
>
	<div class="relative w-6 h-6">
		{#if wasCopied}
			<span class="absolute top-0 left-0" transition:fade={{ duration: 150 }}>
				<OkIcon />
			</span>
		{:else}
			<span class="absolute top-0 left-0" transition:fade={{ duration: 150 }}>
				<CopyIcon />
			</span>
		{/if}
	</div>
</button>
