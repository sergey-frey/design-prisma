<script lang="ts">
	import type { NodeCSS } from "@/shared/types";
	import clsx from "clsx";
	import { twJoin } from "tailwind-merge";
	import CodeRow from "./code-row.svelte";

	type CodeHighlightProps = {
		code: NodeCSS;
		className?: string;
	};

	let { code, className }: CodeHighlightProps = $props();

	const rules = $derived(Object.keys(code) as Array<keyof NodeCSS>);
</script>

<div class={clsx("rounded-sm overflow-hidden", className)}>
	<div class="flex overflow-auto max-h-[300px] bg-muted">
		<div class={twJoin("grow text-sm py-1 px-1", "whitespace-nowrap")}>
			{#each rules as rule}
				{#if code[rule]}
					{@const value = code[rule]}
					<CodeRow {rule} {value} />
				{/if}
			{/each}
		</div>
	</div>
</div>
