<script lang="ts">
  import { ContextMenu, contextMenuStore } from "@/entities/context-menu";
  import NoticeView from "@/entities/notice/ui/notice-view.svelte";
  import { settingsStore } from "@/entities/settings";
  import ResizeController from "@/features/resize/ui/resize-controller.svelte";
  import { DesignPage } from "@/pages/design-page";
  import { SettingsPage } from "@/pages/settings-page";
  import { StylesPage } from "@/pages/styles-page";
  import type {
    GetSettingsQuery,
    MessageToUI,
    MessageToUIEvent,
  } from "@/shared/types";
  import { msgToUIObserver, postMessageToPlugin } from "@/shared/utils";
  import { Navigation } from "@/widgets/navigation";
  import Preloader from "@/widgets/preloader/ui/preloader.svelte";
  import { WelcomeMessage } from "@/widgets/welcome-message";
  import { onDestroy, onMount } from "svelte";

  let isLoading = true;

  const handleGetSettingsResponse = (msg: MessageToUI) => {
    if (msg.action !== "get-settings-response") return;
    $settingsStore = msg.settings;
    setTimeout(() => {
      isLoading = false;
    }, 100);
  };

  onmessage = (event: MessageToUIEvent) => {
    const msg = event.data.pluginMessage;
    msgToUIObserver.broadcast(msg);
  };

  onMount(() => {
    postMessageToPlugin<GetSettingsQuery>({
      action: "get-settings-query",
    });
    msgToUIObserver.subscribe(
      handleGetSettingsResponse,
      "get-settings-response"
    );
  });

  onDestroy(() => {
    msgToUIObserver.unsubscribe(
      handleGetSettingsResponse,
      "get-settings-response"
    );
  });
</script>

<svelte:window on:click="{() => ($contextMenuStore.isOpen = false)}" />

<main class="flex flex-col h-full px-2 pt-1">
  <Navigation class="grow">
    <StylesPage slot="styles-page" />
    <DesignPage slot="design-page" />
    <SettingsPage slot="settings-page" />
  </Navigation>
  <WelcomeMessage />
</main>

{#if isLoading}
  <Preloader />
{/if}

<ContextMenu />

<NoticeView />

<ResizeController />
