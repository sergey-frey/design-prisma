<script lang="ts">
  import type { NodeCSS } from "@/shared/types";
  import { twJoin } from "tailwind-merge";
  import CodeRow from "./code-row.svelte";

  export let code: NodeCSS;

  $: rules = Object.keys(code) as Array<keyof NodeCSS>;
</script>

<div
  class="{twJoin(
    'text-sm py-3 px-3 overflow-auto max-h-[300px]',
    'bg-[#efecf4] rounded-md',
    'whitespace-nowrap'
  )}"
>
  {#each rules as rule}
    {#if code[rule]}
      {@const value = code[rule]}
      <CodeRow {rule} {value} />
    {/if}
  {/each}
</div>
