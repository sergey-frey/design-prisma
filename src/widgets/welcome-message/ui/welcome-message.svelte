<script lang="ts">
  import { settingsStore } from "@/entities/settings";
  import { CONTACTS } from "@/shared/constants";
  import * as Alert from "@/shared/lib/components/ui/alert";
  import Checkbox from "@/shared/lib/components/ui/checkbox/checkbox.svelte";
  import Label from "@/shared/lib/components/ui/label/label.svelte";
  import type { SetSettingsQuery } from "@/shared/types";
  import { postMessageToPlugin } from "@/shared/utils";

  const checkboxId = "dont-show-again";

  let isShow = true;

  const handleCloseClick = () => {
    isShow = false;

    if (!dontShowAgainChecked) return;

    $settingsStore.showWelcomeMessage = false;
    postMessageToPlugin<SetSettingsQuery>({
      action: "set-settings-query",
      settings: $settingsStore,
    });
  };

  let dontShowAgainChecked: boolean;
</script>

{#if isShow && $settingsStore.showWelcomeMessage}
  <Alert.Root class="sticky z-50 bottom-2">
    <Alert.Title class="flex justify-between">
      Привет!
      <button on:click="{handleCloseClick}">close</button>
    </Alert.Title>
    <Alert.Description>
      Вступай в мою группу в телеграм,
      <a
        class="font-medium underline"
        href="{CONTACTS.tg.href}"
        target="_blank"
      >
        {@html CONTACTS.tg.label}
      </a>
      Это очень меня порадует, заранее спасибо {":)"}
    </Alert.Description>
    <div class="flex items-center gap-2 mt-1">
      <Checkbox id="{checkboxId}" bind:checked="{dontShowAgainChecked}" />
      <Label for="{checkboxId}" class="text-xs">Don't show again</Label>
    </div>
  </Alert.Root>
{/if}
