<script lang="ts">
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
  import { Donate } from "@/widgets/donate";
  import { Navigation } from "@/widgets/navigation";
  import { PageWrapper } from "@/widgets/page-wrapper";
  import { onDestroy, onMount } from "svelte";

  const handleGetSettingsResponse = (msg: MessageToUI) => {
    if (msg.action !== "get-settings-response") return;
    $settingsStore = msg.settings;
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
  <Navigation />

  <PageWrapper class="grow">
    {#if $settingsStore.nav === "STYLES"}
      <StylesPage />
    {:else if $settingsStore.nav === "DESIGN"}
      <DesignPage />
    {:else if $settingsStore.nav === "SETTINGS"}
      <SettingsPage />
    {/if}
  </PageWrapper>

  <Donate />
</main>
