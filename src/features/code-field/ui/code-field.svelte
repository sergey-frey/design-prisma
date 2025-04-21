<script lang="ts">
	import { settingsStore } from "@/entities/settings";
	import { content } from "@/shared/content";
	import type { NodeCSS } from "@/shared/types";
	import { RmbIcon } from "@/shared/ui/icons";
	import { formatStyles } from "@/shared/utils";
	import clsx from "clsx";
	import { format } from "prettier";
	import htmlParser from "prettier/parser-html";
	import { Highlight } from "svelte-highlight";
	import { plaintext, xml } from "svelte-highlight/languages";
	import theme from "svelte-highlight/styles/atelier-cave-light";
	import type { HTMLAttributes } from "svelte/elements";
	import { applyModifications } from "../model/modification-node-css";
	import "../styles/index.css";
	import CodeHighlight from "./code-highlight.svelte";
	import CopyButton from "./copy-button.svelte";

	type Props = HTMLAttributes<HTMLDivElement> & {
		code: NodeCSS | string;
		isSVG?: boolean;
		rmbNotice?: boolean;
	};

	let { isSVG, rmbNotice, code }: Props = $props();

	const getHighlightProps = async (code: string | NodeCSS) => {
		if (isSVG && typeof code === "string") {
			return {
				language: xml,
				code: await format(code, {
					parser: "html",
					plugins: [htmlParser],
				}),
			};
		}

		return {
			language: plaintext,
			code: code as string,
		};
	};

	const highlightProps = $derived(getHighlightProps(code));
</script>

<svelte:head>
	{@html theme}
</svelte:head>

{#if code}
	<div>
		<div class="flex items-center justify-between">
			<slot name="title" />
		</div>
		<div class="relative">
			{#if typeof code === "string"}
				{#await highlightProps then { language, code }}
					<CopyButton {code} class="absolute top-2 right-2" />
					<Highlight class="text-sm" {language} {code} />
				{/await}
			{:else}
				{@const codeWithModifications = applyModifications(
					code,
					$settingsStore
				)}
				{@const codeString = formatStyles(codeWithModifications)}
				<CopyButton code={codeString} class="absolute top-2 right-2" />
				<CodeHighlight
					code={codeWithModifications}
					className={clsx({ ["rounded-b-none"]: rmbNotice })}
				/>
			{/if}
		</div>
		{#if rmbNotice}
			<span
				class="text-xs px-2 flex items-center gap-1 bg-slate-200 rounded-b-sm py-1"
			>
				{content[$settingsStore.lang].codeField.rmb}
				<RmbIcon class="w-3 h-3" />
			</span>
		{/if}
	</div>
{/if}
