<script lang="ts">
  import { selectedNodeStore } from "@/entities/selected-node";
  import { settingsStore } from "@/entities/settings";
  import { CodeField } from "@/features/code-field";
  import { content } from "@/shared/content";
  import { msgToUIObserver } from "@/shared/utils";
  import type { MessageToUI } from "@/shared/types";
  import { onDestroy, onMount } from "svelte";
  import PageWrapper from "@/widgets/page-wrapper/ui/page-wrapper.svelte";

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
      <CodeField code="{$selectedNodeStore.nodeBlock}" rmbNotice>
        <p slot="title">
          {content[$settingsStore.lang].pages.STYLES.nodeBlockTitle}
        </p>
      </CodeField>
    {/if}

    {#if hasNodeCSS}
      <CodeField code="{$selectedNodeStore.nodeCSS}" rmbNotice>
        <p slot="title">
          {content[$settingsStore.lang].pages.STYLES.nodeCSSTitle}
        </p>
      </CodeField>
    {/if}

    {#if hasNodeSVG}
      <CodeField code="{$selectedNodeStore.nodeSVG ?? ''}" isSVG>
        <p slot="title">SVG</p>
      </CodeField>
    {/if}

    {#if hasNodeText}
      <CodeField code="{$selectedNodeStore.nodeText}">
        <p slot="title">
          {content[$settingsStore.lang].pages.STYLES.nodeTextTitle}
        </p>
      </CodeField>
    {/if}
  </section>
</PageWrapper>
