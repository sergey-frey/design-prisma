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

  export let code: NodeCSS | string;
  export let title: string = "";
  export let isSVG: boolean = false;

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
    <p>{title}</p>
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
