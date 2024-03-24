<script lang="ts">
  import { logger } from "@/shared/utils";
  import { Menu, MenuItem, MenuItems } from "@rgossiaux/svelte-headlessui";
  import { scale } from "svelte/transition";
  import { twJoin } from "tailwind-merge";
  import { contextMenuStore } from "..";

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

    getMenuPosition({});
  };

  const getMenuPosition = (a: any) => {
    if (menu.w === 0 || menu.h === 0) return;

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

    logger.log(menu);

    return pos;
  };

  $: getMenuPosition($contextMenuStore);
</script>

<Menu>
  {#if $contextMenuStore.isOpen}
    <div
      transition:scale="{{ duration: 150, opacity: 0 }}"
      use:getContextMenuDimension
      class="{twJoin('fixed')}"
      style="top: {pos.y + 1}px; left: {pos.x + 1}px"
    >
      <MenuItems
        static
        class="{twJoin(
          'relative',
          'flex flex-col overflow-hidden',
          'bg-popover rounded-md shadow-lg p-1'
        )}"
      >
        {#each $contextMenuStore.options as option}
          <MenuItem
            class="{twJoin(
              'px-4 py-1 whitespace-nowrap transition-colors',
              'cursor-pointer text-sm rounded-sm',
              'hover:bg-accent'
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
