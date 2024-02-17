<script lang="ts">
  import {
    format,
    type BuiltInParserName,
    type LiteralUnion,
    type Plugin,
  } from "prettier";
  import parserPostCSS from "prettier/parser-postcss";
  import prettierPluginEstree from "prettier/plugins/estree";
  import Highlight from "svelte-highlight";
  import type { LanguageType } from "svelte-highlight/languages";
  import theme from "svelte-highlight/styles/atelier-cave-light";
  import CopyButton from "./copy-button.svelte";

  import "../styles/index.css";

  export let code: string;
  export let language: LanguageType<string>;
  export let title: string = "";
  export let enableFormatting = false;
  export let parser: LiteralUnion<BuiltInParserName, string> = "css";
  export let plugin: string | Plugin<any> = parserPostCSS;

  const getFormattedCode = async (code: string) => {
    if (enableFormatting) {
      return format(code, {
        parser,
        plugins: [plugin, prettierPluginEstree],
      });
    } else {
      return code;
    }
  };

  $: getFormattedCode(code).then((c) => (code = c ?? ""));
</script>

<svelte:head>
  {@html theme}
</svelte:head>

<div>
  <p>{title}</p>
  <div class="relative">
    {#if code}
      <CopyButton {code} class="absolute top-2 right-2" />
    {/if}
    <Highlight {code} {language} class="{'text-sm'}" />
  </div>
</div>
