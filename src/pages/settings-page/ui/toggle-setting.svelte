<script lang="ts">
  import Switch from "$lib/components/ui/switch/switch.svelte";
  import { settingsStore } from "@/entities/settings";
  import { content } from "@/shared/content";
  import type { SetSettingsQuery, Settings } from "@/shared/types";
  import { postMessageToPlugin } from "@/shared/utils";

  $: toggleSettings =
    content[$settingsStore.lang].pages.SETTINGS.toggleSettings;

  export let textKey: keyof typeof toggleSettings;
  export let settingKey: keyof Settings;

  $: text = toggleSettings[textKey];

  const handleToggle = () => {
    // @ts-expect-error
    $settingsStore[settingKey] = !$settingsStore[settingKey];

    postMessageToPlugin<SetSettingsQuery>({
      action: "set-settings-query",
      settings: $settingsStore,
    });
  };
</script>

{#if typeof $settingsStore[settingKey] === "boolean"}
  <button
    type="button"
    class="flex gap-3 justify-between items-center"
    on:click="{handleToggle}"
  >
    <p class="text-start">{text}</p>
    <Switch checked="{Boolean($settingsStore[settingKey])}">{text}</Switch>
  </button>
{/if}
