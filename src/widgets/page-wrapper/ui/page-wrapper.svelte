<script lang="ts">
  import { settingsStore } from "@/entities/settings";
  import { content } from "@/shared/content";
  import type { NavPage } from "@/shared/types";
  import { twJoin } from "tailwind-merge";

  export let page: NavPage;
</script>

<section class="{twJoin('px-2 py-1 flex flex-col grow', $$props.class)}">
  <h2 class="font-semibold text-lg pb-4">
    {content[$settingsStore.lang].pages[page].title}
  </h2>
  <slot />
</section>
