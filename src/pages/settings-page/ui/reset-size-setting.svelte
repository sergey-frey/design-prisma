<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { settingsStore } from "@/entities/settings";
  import { INIT_SETTINGS } from "@/shared/constants";
  import { content } from "@/shared/content";
  import type { SetSettingsQuery } from "@/shared/types";
  import { postMessageToPlugin } from "@/shared/utils";

  $: settingContent = content[$settingsStore.lang].pages.SETTINGS.resetSize;

  const handleClick = () => {
    $settingsStore.size = INIT_SETTINGS.size;

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
