<script lang="ts">
  import { settingsStore } from "@/entities/settings";
  import { content } from "@/shared/content";
  import { postMessageToPlugin } from "@/shared/lib";
  import type { SetSettingsQuery, Settings } from "@/shared/types";
  import { Toggle } from "@/shared/ui/toggle";

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
    <Toggle isChecked="{Boolean($settingsStore[settingKey])}" />
  </button>
{/if}
