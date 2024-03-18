<script lang="ts">
  import { settingsStore } from "@/entities/settings";
  import { content } from "@/shared/content";
  import { postMessageToPlugin } from "@/shared/lib";
  import type { CSSPreprocessor, Lang, SetSettingsQuery } from "@/shared/types";
  import { FlagIcon } from "@/shared/ui/icons";
  import ChevronUpDownIcon from "@/shared/ui/icons/chevron-up-down-icon.svelte";
  import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
  } from "@rgossiaux/svelte-headlessui";
  import { fly } from "svelte/transition";
  import { twJoin } from "tailwind-merge";

  const preprocessorsList: CSSPreprocessor[] = ["css", "scss"];

  $: text = content[$settingsStore.lang].pages.SETTINGS.switchPreprocessor;

  const handleSelect = (preprocessor: CSSPreprocessor) => {
    $settingsStore.preprocessor = preprocessor;

    postMessageToPlugin<SetSettingsQuery>({
      action: "set-settings-query",
      settings: $settingsStore,
    });
  };
</script>

<div class="flex items-center gap-3 justify-between">
  <p>{text}</p>

  <Listbox let:open class="relative">
    <ListboxButton
      class="{twJoin(
        'flex items-center gap-2',
        'bg-slate-200 rounded-md px-2 py-1 transition-colors truncate',
        'hover:bg-slate-300',
        open && 'bg-slate-300'
      )}"
    >
      {$settingsStore.preprocessor}
      <ChevronUpDownIcon class="w-4 text-slate-700" />
    </ListboxButton>
    {#if open}
      <div
        transition:fly="{{ duration: 200, y: 5 }}"
        class="absolute z-10 pt-[5px] w-full"
      >
        <ListboxOptions
          static
          class="{twJoin('bg-slate-200 rounded-md overflow-hidden')}"
        >
          {#each preprocessorsList as preprocessor}
            <ListboxOption
              value="{preprocessor}"
              class="{twJoin(
                'flex items-center gap-2',
                'px-2 py-[2px] transition-colors cursor-pointer',
                'hover:bg-slate-300',
                'first:pt-1',
                'last:pb-1'
              )}"
              on:click="{() => handleSelect(preprocessor)}"
            >
              {preprocessor}
            </ListboxOption>
          {/each}
        </ListboxOptions>
      </div>
    {/if}
  </Listbox>
</div>
