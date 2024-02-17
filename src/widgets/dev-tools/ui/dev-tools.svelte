<script lang="ts">
  import {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
  } from "@rgossiaux/svelte-headlessui";
  import { postMessageToPlugin } from "@/shared/lib";
  import type { ResetPluginDataMessage } from "@/shared/types";
  import { twJoin, twMerge } from "tailwind-merge";
  import { fly } from "svelte/transition";

  const tools = [
    {
      label: "Reset plugin data",
      handler: () => {
        postMessageToPlugin<ResetPluginDataMessage>({
          action: "reset-plugin-data-message",
        });
      },
    },
  ];
</script>

<Menu class="{twMerge('relative', $$props.class)}" let:open>
  {#if open}
    <div
      transition:fly="{{ duration: 200, y: -5 }}"
      class="absolute bottom-full right-0 pb-[5px] min-w-fit"
    >
      <MenuItems
        static
        class="{twJoin('bg-slate-200 rounded-md overflow-hidden')}"
      >
        {#each tools as tool}
          <MenuItem
            class="{twJoin(
              'flex items-center gap-2 whitespace-nowrap',
              'px-2 py-[2px] transition-colors cursor-pointer text-sm',
              'hover:bg-slate-300',
              'first:pt-1',
              'last:pb-1'
            )}"
            on:click="{tool.handler}"
          >
            {tool.label}
          </MenuItem>
        {/each}
      </MenuItems>
    </div>
  {/if}
  <MenuButton
    class="{twJoin(
      'bg-slate-200 px-3 py-1',
      'rounded-md transition-colors',
      'text-sm',
      'hover:bg-slate-300',
      open && 'bg-slate-300'
    )}"
  >
    Tools
  </MenuButton>
</Menu>
