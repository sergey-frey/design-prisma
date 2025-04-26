<script lang="ts">
	import { notification } from "@/entities/notice";
	import { CopyIcon, OkIcon } from "@/shared/ui/icons";
	import { copyToClipboard } from "@/shared/utils";
	import { fade } from "svelte/transition";

	const ICON_TRANSITION_DURATION = 150;
	const ICON_SHOW_DURATION = 800;

	type CopyButtonProps = {
		class?: string;
		code: string;
	};

	const { class: className, code }: CopyButtonProps = $props();

	let wasCopied = $state(false);

	const handleClick = () => {
		copyToClipboard(code).then(() => {
			notification("Copied", {
				delay: ICON_SHOW_DURATION,
			});
		});

		wasCopied = true;

		setTimeout(() => {
			wasCopied = false;
		}, ICON_SHOW_DURATION);
	};
</script>

<button
	type="button"
	class={[
		className,
		"text-indigo-700 w-8 h-8 bg-slate-100",
		"opacity-70 rounded-sm border transition-all",
		"hover:bg-slate-200 hover:opacity-100",
	]}
	onclick={handleClick}
	title="Copy"
>
	<div class="relative w-full h-full">
		{#if wasCopied}
			<span
				class="abs-center"
				transition:fade={{ duration: ICON_TRANSITION_DURATION }}
			>
				<OkIcon class="w-5 h-5" />
			</span>
		{:else}
			<span
				class="abs-center"
				transition:fade={{ duration: ICON_TRANSITION_DURATION }}
			>
				<CopyIcon class="w-5 h-5" />
			</span>
		{/if}
	</div>
</button>
