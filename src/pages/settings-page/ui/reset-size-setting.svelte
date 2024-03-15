<script lang="ts">
  import { initSettingsStore, settingsStore } from "@/entities/settings";
  import { content } from "@/shared/content";
  import { postMessageToPlugin } from "@/shared/lib";
  import type { SetSettingsQuery } from "@/shared/types";
  import { twJoin } from "tailwind-merge";

  $: settingContent = content[$settingsStore.lang].pages.SETTINGS.resetSize;

  const handleClick = () => {
    $settingsStore.size = initSettingsStore.size;

    postMessageToPlugin<SetSettingsQuery>({
      action: "set-settings-query",
      settings: $settingsStore,
    });
  };
</script>

<div class="flex items-center gap-3 justify-between">
  <p>{settingContent.title}</p>

  <button
    on:click="{handleClick}"
    class="{twJoin(
      'bg-slate-200 transition-colors',
      'rounded-md px-2 py-1',
      'text-sm',
      'hover:bg-slate-300'
    )}"
  >
    {settingContent.buttonText}
  </button>
</div>
