<script lang="ts">
  import { designSystemStore } from "@/entities/design-system";
  import { settingsStore } from "@/entities/settings";
  import { CodeField } from "@/features/code-field";
  import { content } from "@/shared/content";
  import {
    msgToUIObserver,
    postMessageToPlugin,
    sortByField,
  } from "@/shared/lib";
  import type {
    GetDesignLocalPaintStylesQuery,
    GetDesignLocalTextStylesQuery,
    MessageToUI,
  } from "@/shared/types";
  import { onDestroy, onMount } from "svelte";
  import TextStylesView from "./text-styles-view.svelte";

  const handleGetDesignLocalTextStylesResponse = (msg: MessageToUI) => {
    if (msg.action !== "get-design-local-text-styles-response") return;

    $designSystemStore.textStyles = msg.textStyles
      .sort(sortByField("amountOfConsumers"))
      .sort(sortByField("fontSize"))
      .sort(sortByField("fontWeight"))
      .sort(sortByField("fontFamily"));
  };

  const handleGetDesignLocalPaintStylesResponse = (msg: MessageToUI) => {
    if (msg.action !== "get-design-local-paint-styles-response") return;

    $designSystemStore.paintStyles = msg.paintStiles;
  };

  $: hasPaintStyles = Object.keys($designSystemStore.paintStyles).length > 0;

  onMount(() => {
    msgToUIObserver.subscribe(handleGetDesignLocalTextStylesResponse);
    msgToUIObserver.subscribe(handleGetDesignLocalPaintStylesResponse);

    postMessageToPlugin<GetDesignLocalTextStylesQuery>({
      action: "get-design-local-text-styles-query",
    });
    postMessageToPlugin<GetDesignLocalPaintStylesQuery>({
      action: "get-design-local-paint-styles-query",
    });
  });

  onDestroy(() => {
    msgToUIObserver.unsubscribe(handleGetDesignLocalTextStylesResponse);
    msgToUIObserver.unsubscribe(handleGetDesignLocalPaintStylesResponse);
  });
</script>

<section class="flex flex-col gap-5">
  {#if hasPaintStyles && $settingsStore.hideDesignSystem === false}
    <CodeField
      title="{content[$settingsStore.lang].pages.DESIGN.colorsTitle}"
      code="{$designSystemStore.paintStyles}"
    />
  {/if}

  <TextStylesView />
</section>
