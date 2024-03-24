<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import { settingsStore } from "@/entities/settings";
  import { NAVIGATION } from "@/shared/constants";
  import { content } from "@/shared/content";
  import type { NavPage, SetSettingsQuery } from "@/shared/types";
  import { postMessageToPlugin } from "@/shared/utils";

  const keys = Object.keys(NAVIGATION) as Array<NavPage>;

  const handleClick = (src: NavPage) => {
    $settingsStore.nav = src;

    postMessageToPlugin<SetSettingsQuery>({
      action: "set-settings-query",
      settings: $settingsStore,
    });
  };
</script>

<Tabs.Root {...$$restProps} value="{$settingsStore.nav}">
  <Tabs.List
    class="grid w-full sticky top-1 z-50 shadow-md"
    style="{`grid-template-columns: repeat(${keys.length}, minmax(0, 1fr));`}"
  >
    {#each keys as key}
      <Tabs.Trigger value="{key}" on:click="{() => handleClick(key)}">
        {content[$settingsStore.lang].nav[key]}
      </Tabs.Trigger>
    {/each}
  </Tabs.List>
  <Tabs.Content value="{'STYLES'}">
    <slot name="styles-page" />
  </Tabs.Content>
  <Tabs.Content value="{'DESIGN'}">
    <slot name="design-page" />
  </Tabs.Content>
  <Tabs.Content value="{'SETTINGS'}">
    <slot name="settings-page" />
  </Tabs.Content>
</Tabs.Root>
