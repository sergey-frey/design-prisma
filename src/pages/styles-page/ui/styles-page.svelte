<script lang="ts">
  import { selectedNodeStore } from "@/entities/selected-node";
  import { settingsStore } from "@/entities/settings";
  import { CodeField } from "@/features/code-field";
  import { content } from "@/shared/content";
  import { msgToUIObserver } from "@/shared/lib";
  import type { MessageToUI } from "@/shared/types";
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
    msgToUIObserver.subscribe(handleSelectedNodeChangeMessage);
  });

  onDestroy(() => {
    msgToUIObserver.unsubscribe(handleSelectedNodeChangeMessage);
  });
</script>

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
    <CodeField
      title="{content[$settingsStore.lang].pages.STYLES.nodeBlockTitle}"
      code="{$selectedNodeStore.nodeBlock}"
    />
  {/if}

  {#if hasNodeCSS}
    <CodeField
      title="{content[$settingsStore.lang].pages.STYLES.nodeCSSTitle}"
      code="{$selectedNodeStore.nodeCSS}"
    />
  {/if}

  {#if hasNodeSVG}
    <!-- FIXME: can't show formatted string code -->
    <CodeField title="SVG" code="{$selectedNodeStore.nodeSVG ?? ''}" isSVG />
  {/if}

  {#if hasNodeText}
    <CodeField
      title="{content[$settingsStore.lang].pages.STYLES.nodeTextTitle}"
      code="{$selectedNodeStore.nodeText}"
    />
  {/if}
</section>
