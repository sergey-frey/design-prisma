<script lang="ts">
	import { selectedNodeStore } from "@/entities/selected-node";
	import { settingsStore } from "@/entities/settings";
	import { CodeField } from "@/features/code-field";
	import { content } from "@/shared/content";
	import type { MessageToUI } from "@/shared/types";
	import { msgToUIObserver } from "@/shared/utils";
	import PageWrapper from "@/widgets/page-wrapper/ui/page-wrapper.svelte";
	import { onDestroy, onMount } from "svelte";

	const handleSelectedNodeChangeMessage = (msg: MessageToUI) => {
		if (msg.action !== "selected-node-change") return;
		const { action, ...data } = msg;
		$selectedNodeStore = Object.assign($selectedNodeStore, data);
	};

	$: hasNodeBlock = Boolean($selectedNodeStore.nodeId);
	$: hasNodeCSS = Object.keys($selectedNodeStore.nodeCSS).length > 0;
	$: hasNodeSVG = Boolean($selectedNodeStore.nodeSVG);
	$: hasNodeText = Boolean($selectedNodeStore.nodeText);

	onMount(() => {
		msgToUIObserver.subscribe(
			handleSelectedNodeChangeMessage,
			"selected-node-change"
		);
	});

	onDestroy(() => {
		msgToUIObserver.unsubscribe(
			handleSelectedNodeChangeMessage,
			"selected-node-change"
		);
	});
</script>

<PageWrapper page="STYLES">
	<section class="flex flex-col gap-3">
		{#if $selectedNodeStore.nodeName}
			<p class="truncate max-w-[300px]">
				<span class="text-indigo-600 font-medium">
					{content[$settingsStore.lang].pages.STYLES.elementPrefix}:
				</span>
				{$selectedNodeStore.nodeName}
			</p>
		{/if}

		{#if hasNodeBlock}
			<CodeField code={$selectedNodeStore.nodeBlock} rmbNotice>
				{#snippet fieldTitle()}
					<p>
						{content[$settingsStore.lang].pages.STYLES.nodeBlockTitle}
					</p>
				{/snippet}
			</CodeField>
		{/if}

		{#if hasNodeCSS}
			<CodeField code={$selectedNodeStore.nodeCSS} rmbNotice>
				{#snippet fieldTitle()}
					<p>
						{content[$settingsStore.lang].pages.STYLES.nodeCSSTitle}
					</p>
				{/snippet}
			</CodeField>
		{/if}

		{#if hasNodeSVG}
			<CodeField code={$selectedNodeStore.nodeSVG ?? ""} isSVG>
				{#snippet fieldTitle()}
					<p>SVG</p>
				{/snippet}
			</CodeField>
		{/if}

		{#if hasNodeText}
			<CodeField code={$selectedNodeStore.nodeText}>
				{#snippet fieldTitle()}
					<p>
						{content[$settingsStore.lang].pages.STYLES.nodeTextTitle}
					</p>
				{/snippet}
			</CodeField>
		{/if}
	</section>
</PageWrapper>
