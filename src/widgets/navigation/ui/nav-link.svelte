<script lang="ts">
  import { settingsStore } from "@/entities/settings";
  import { postMessageToPlugin } from "@/shared/lib";
  import type { NavPage, SetSettingsQuery } from "@/shared/types";
  import { twMerge } from "tailwind-merge";

  import "../animations/index.css";

  export let src: NavPage;
  export let isActive: boolean;

  const handleClick = () => {
    $settingsStore.nav = src;

    postMessageToPlugin<SetSettingsQuery>({
      action: "set-settings-query",
      settings: $settingsStore,
    });
  };
</script>

<button
  type="button"
  on:click="{handleClick}"
  class="{twMerge(
    'transition-colors nav-link',
    'py-1 border-r-[1px] border-b-[1px] border-slate-200',
    'self-center',
    isActive && 'bg-indigo-600 text-white'
  )}"
>
  <slot />
</button>
