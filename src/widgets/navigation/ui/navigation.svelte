<script lang="ts">
  import { settingsStore } from "@/entities/settings";
  import { NAVIGATION } from "@/shared/constants";
  import { content } from "@/shared/content";
  import type { NavPage } from "@/shared/types";
  import { twMerge } from "tailwind-merge";
  import NavLink from "./nav-link.svelte";

  const keys = Object.keys(NAVIGATION) as Array<NavPage>;
</script>

<nav {...$$restProps}>
  <ul
    class="{twMerge(`grid justify-between bg-white`)}"
    style="{`grid-template-columns: repeat(${keys.length}, minmax(0, 1fr));`}"
  >
    {#each keys as key}
      {@const isActive = $settingsStore.nav === key}
      <NavLink src="{key}" {isActive}>
        {content[$settingsStore.lang].nav[key]}
      </NavLink>
    {/each}
  </ul>
</nav>
