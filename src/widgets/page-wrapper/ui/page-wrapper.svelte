<script lang="ts">
  import { settingsStore } from "@/entities/settings";
  import { content } from "@/shared/content";
  import { twJoin } from "tailwind-merge";
</script>

<section class="{twJoin('p-4 flex flex-col', $$props.class)}">
  <h2 class="font-semibold text-lg pb-4">
    {content[$settingsStore.lang].pages[$settingsStore.nav].title}
  </h2>
  <slot />
</section>
