<script lang="ts">
  import { initSettingsStore, settingsStore } from "@/entities/settings";
  import { Button } from "$lib/components/ui/button";
  import { content } from "@/shared/content";
  import { postMessageToPlugin } from "@/shared/utils";
  import type { SetSettingsQuery } from "@/shared/types";

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

  <Button on:click="{handleClick}" size="sm">
    {settingContent.buttonText}
  </Button>
</div>
