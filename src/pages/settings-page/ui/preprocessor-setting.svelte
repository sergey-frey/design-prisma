<script lang="ts">
  import * as Select from "$lib/components/ui/select";
  import { settingsStore } from "@/entities/settings";
  import { content } from "@/shared/content";
  import { postMessageToPlugin } from "@/shared/utils";
  import type { CSSPreprocessor, SetSettingsQuery } from "@/shared/types";
  import type { Selected } from "bits-ui";

  const preprocessorsList: Selected<CSSPreprocessor>[] = [
    {
      label: "css",
      value: "css",
    },
    {
      label: "scss",
      value: "scss",
    },
  ];

  $: text = content[$settingsStore.lang].pages.SETTINGS.switchPreprocessor;

  const handleSelect = (preprocessor: CSSPreprocessor) => {
    $settingsStore.preprocessor = preprocessor;

    postMessageToPlugin<SetSettingsQuery>({
      action: "set-settings-query",
      settings: $settingsStore,
    });
  };

  const handleSelectedChange = (
    opt: Selected<CSSPreprocessor | undefined> | undefined
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
    <Select.Trigger class="w-[70px]">
      <Select.Value placeholder="{$settingsStore.preprocessor}" />
    </Select.Trigger>
    <Select.Content>
      {#each preprocessorsList as { label, value }}
        <Select.Item {value}>
          {label}
        </Select.Item>
      {/each}
    </Select.Content>
  </Select.Root>
</div>
