<script lang="ts">
  import * as Select from "$lib/components/ui/select";
  import { settingsStore } from "@/entities/settings";
  import { content } from "@/shared/content";
  import type { Lang, SetSettingsQuery } from "@/shared/types";
  import { FlagIcon } from "@/shared/ui/icons";
  import { postMessageToPlugin } from "@/shared/utils";
  import type { Selected } from "bits-ui";

  const langsList: Selected<Lang>[] = [
    {
      label: "Русский",
      value: "ru",
    },
    {
      label: "English",
      value: "en",
    },
  ];

  $: text = content[$settingsStore.lang].pages.SETTINGS.switchLanguage;

  const handleSelect = (lang: Lang) => {
    $settingsStore.lang = lang;

    postMessageToPlugin<SetSettingsQuery>({
      action: "set-settings-query",
      settings: $settingsStore,
    });
  };

  const handleSelectedChange = (
    opt: Selected<Lang | undefined> | undefined
  ) => {
    if (!opt?.value) {
      return;
    }

    handleSelect(opt.value);
  };
</script>

<div class="flex items-center gap-3 justify-between">
  <p>{text}</p>

  <Select.Root onSelectedChange="{handleSelectedChange}">
    <Select.Trigger class="w-fit flex items-center gap-2">
      <FlagIcon class="w-4" country="{$settingsStore.lang}" />
      <Select.Value
        placeholder="{langsList.find((o) => o.value === $settingsStore.lang)
          ?.label}"
      />
    </Select.Trigger>
    <Select.Content>
      {#each langsList as { label, value }}
        <Select.Item {value} class="flex items-center gap-2">
          <FlagIcon class="min-w-4 max-w-[16px]" country="{value}" />
          {label}
        </Select.Item>
      {/each}
    </Select.Content>
  </Select.Root>
</div>
