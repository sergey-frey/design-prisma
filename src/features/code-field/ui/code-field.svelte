<script lang="ts">
  import { settingsStore } from "@/entities/settings";
  import { content } from "@/shared/content";
  import type { NodeCSS } from "@/shared/types";
  import { formatStyles } from "@/shared/utils";
  import { format } from "prettier";
  import htmlParser from "prettier/parser-html";
  import { Highlight } from "svelte-highlight";
  import { plaintext, xml } from "svelte-highlight/languages";
  import theme from "svelte-highlight/styles/atelier-cave-light";
  import CodeHighlight from "./code-highlight.svelte";
  import CopyButton from "./copy-button.svelte";

  import { applyModifications } from "../model/modification-node-css";
  import "../styles/index.css";

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
        <span class="text-sm font-semibold pr-1">
          {content[$settingsStore.lang].codeField.rmb}
        </span>
      {/if}
    </div>
    <div class="relative">
      {#if typeof code === "string"}
        {#await highlightProps then { language, code }}
          <CopyButton {code} class="absolute top-2 right-2" />
          <Highlight class="text-sm" {language} {code} />
        {/await}
      {:else}
        {@const codeWithModifications = applyModifications(
          code,
          $settingsStore
        )}
        {@const codeString = formatStyles(codeWithModifications)}
        <CopyButton code="{codeString}" class="absolute top-2 right-2" />
        <CodeHighlight code="{codeWithModifications}" />
      {/if}
    </div>
  </div>
{/if}
