<script lang="ts">
  import type { NodeCSS } from "@/shared/types";
  import { twJoin } from "tailwind-merge";
  import CodeHighlightWrapper from "./code-highlight-wrapper.svelte";
  import CodeRow from "./code-row.svelte";

  export let code: NodeCSS;

  $: rules = Object.keys(code) as Array<keyof NodeCSS>;
</script>

<CodeHighlightWrapper
  class="{twJoin('text-sm py-3 px-4 overflow-auto', 'bg-[#efecf4] rounded-md')}"
>
  <div slot="rows" class="flex flex-col gap-0.5">
    {#each rules as rule}
      {#if code[rule]}
        {@const value = code[rule]}
        <CodeRow {rule} {value} />
      {/if}
    {/each}
  </div>
</CodeHighlightWrapper>
