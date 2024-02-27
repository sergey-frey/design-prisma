<script lang="ts">
  import NoticeView from "@/entities/notice/ui/notice-view.svelte";
  import { settingsStore } from "@/entities/settings";
  import { DesignPage } from "@/pages/design-page";
  import { SettingsPage } from "@/pages/settings-page";
  import { StylesPage } from "@/pages/styles-page";
  import { msgToUIObserver, postMessageToPlugin } from "@/shared/lib";
  import type {
    GetSettingsQuery,
    MessageToUI,
    MessageToUIEvent,
  } from "@/shared/types";
  import { DevTools } from "@/widgets/dev-tools";
  import { Donate } from "@/widgets/donate";
  import { Navigation } from "@/widgets/navigation";
  import { PageWrapper } from "@/widgets/page-wrapper";
  import Preloader from "@/widgets/preloader/ui/preloader.svelte";
  import { onDestroy, onMount } from "svelte";

  const isDev = process.env.NODE_ENV === "development";

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
    msgToUIObserver.subscribe(handleGetSettingsResponse);
  });

  onDestroy(() => {
    msgToUIObserver.unsubscribe(handleGetSettingsResponse);
  });
</script>

<main class="flex flex-col h-full">
  <Navigation class="sticky top-0 z-50" />

  <PageWrapper class="grow">
    {#if $settingsStore.nav === "STYLES"}
      <StylesPage />
    {:else if $settingsStore.nav === "DESIGN"}
      <DesignPage />
    {:else if $settingsStore.nav === "SETTINGS"}
      <SettingsPage />
    {/if}
  </PageWrapper>

  {#if !isDev}
    <Donate />
  {/if}

  {#if isDev}
    <div class="flex justify-end p-4">
      <DevTools />
    </div>
  {/if}
</main>

{#if isLoading}
  <Preloader />
{/if}

<NoticeView />
