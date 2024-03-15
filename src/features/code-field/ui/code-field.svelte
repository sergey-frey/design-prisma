<script lang="ts">
  import theme from "svelte-highlight/styles/atelier-cave-light";

  import { settingsStore } from "@/entities/settings";
  import { convertUtilsForNodeCSS, formatStyles } from "@/shared/lib";
  import type { NodeCSS } from "@/shared/types";
  import { format } from "prettier";
  import htmlParser from "prettier/parser-html";
  import { Highlight } from "svelte-highlight";
  import { plaintext, xml } from "svelte-highlight/languages";
  import CodeHighlight from "./code-highlight.svelte";
  import CopyButton from "./copy-button.svelte";

  import "../styles/index.css";
  import RmbIcon from "@/shared/ui/icons/rmb-icon.svelte";

  export let code: NodeCSS | string;
  export let isSVG: boolean = false;
  export let rmbNotice: boolean = false;

  const getHighlightProps = async (code: string | NodeCSS) => {
    if (isSVG && typeof code === "string") {
      return {
        language: xml,
        code: await format(code, {
          parser: "html",
          plugins: [htmlParser],
        }),
      };
    }

    return {
      language: plaintext,
      code: code as string,
    };
  };

  $: highlightProps = getHighlightProps(code);
</script>

<svelte:head>
  {@html theme}
</svelte:head>

{#if code}
  <div>
    <div class="flex items-center justify-between">
      <slot name="title" />
      {#if rmbNotice}
        <div class="flex items-center gap-1">
          <RmbIcon class="w-2" />
          <span class="text-sm px-1 pb-0.5 rounded-md bg-slate-200">пкм</span>
        </div>
      {/if}
    </div>
    <div class="relative">
      {#if typeof code === "string"}
        {#await highlightProps then { language, code }}
          <CopyButton {code} class="absolute top-2 right-2" />
          <Highlight class="text-sm" {language} {code} />
        {/await}
      {:else}
        {@const codeString = formatStyles(code, $settingsStore.units)}
        {@const codeWithCorrectUnits = convertUtilsForNodeCSS(
          code,
          $settingsStore.units
        )}
        <CopyButton code="{codeString}" class="absolute top-2 right-2" />
        <CodeHighlight code="{codeWithCorrectUnits}" />
      {/if}
    </div>
  </div>
{/if}
