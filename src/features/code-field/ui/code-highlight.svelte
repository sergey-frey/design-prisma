<script lang="ts">
  import * as ContextMenu from "$lib/components/ui/context-menu";
  import type { NodeCSS } from "@/shared/types";
  import { twJoin } from "tailwind-merge";
  import CodeRow from "./code-row.svelte";

  export let code: NodeCSS;

  $: rules = Object.keys(code) as Array<keyof NodeCSS>;
</script>

<div class="rounded-sm overflow-hidden">
  <div class="flex overflow-auto max-h-[300px] bg-muted">
    <div class="{twJoin('grow text-sm py-1 px-1', 'whitespace-nowrap')}">
      {#each rules as rule}
        {#if code[rule]}
          {@const value = code[rule]}
          <CodeRow {rule} {value} />
        {/if}
      {/each}
    </div>
  </div>
</div>
