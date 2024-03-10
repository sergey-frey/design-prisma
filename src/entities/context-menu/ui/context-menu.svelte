<script lang="ts">
  import { Menu, MenuItems, MenuItem } from "@rgossiaux/svelte-headlessui";
  import { twJoin } from "tailwind-merge";
  import { contextMenuStore } from "..";
  import { scale } from "svelte/transition";
  import { cubicIn, cubicOut } from "svelte/easing";

  const handleOptionClick = (cb: () => void) => {
    return () => {
      cb();
      $contextMenuStore.isOpen = false;
    };
  };

  let menu = { h: 0, w: 0 };
  let pos = { x: 0, y: 0 };

  const getContextMenuDimension = (node: HTMLDivElement) => {
    let height = node.offsetHeight;
    let width = node.offsetWidth;

    menu = {
      h: height,
      w: width,
    };
  };

  const getMenuPosition = (a: any) => {
    const browser = {
      w: window.innerWidth,
      h: window.innerHeight,
    };

    pos = {
      x: $contextMenuStore.x,
      y: $contextMenuStore.y,
    };

    if (browser.h - pos.y < menu.h) {
      pos.y = pos.y - menu.h;
    }
    if (browser.w - pos.x < menu.w) {
      pos.x = pos.x - menu.w;
    }

    return pos;
  };

  $: getMenuPosition($contextMenuStore);
</script>

<Menu>
  {#if $contextMenuStore.isOpen}
    <div
      transition:scale="{{ duration: 150, opacity: 0 }}"
      use:getContextMenuDimension
      class="{twJoin('fixed transition-all')}"
      style="top: {pos.y}px; left: {pos.x}px"
    >
      <MenuItems
        static
        class="{twJoin(
          'relative',
          'flex flex-col overflow-hidden',
          'bg-slate-100 rounded-md shadow-lg'
        )}"
      >
        {#each $contextMenuStore.options as option}
          <MenuItem
            class="{twJoin(
              'px-4 py-0.5 whitespace-nowrap transition-colors',
              'cursor-pointer text-sm',
              'hover:bg-slate-300',
              'first:pt-1',
              'last:pb-1'
            )}"
            on:click="{handleOptionClick(option.fn)}"
          >
            {option.label}
          </MenuItem>
        {/each}
      </MenuItems>
    </div>
  {/if}
</Menu>
