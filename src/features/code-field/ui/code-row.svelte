<script lang="ts">
  import { contextMenuStore } from "@/entities/context-menu";
  import { notification } from "@/entities/notice";
  import { settingsStore } from "@/entities/settings";
  import { content } from "@/shared/content";
  import { copyToClipboard } from "@/shared/utils";
  import { twJoin } from "tailwind-merge";
  import CodeRuleValue from "./code-rule-value.svelte";
  import CodeRule from "./code-rule.svelte";

  export let rule: string | number;
  export let value: string;

  const copyWithNotice = (text: string) => {
    copyToClipboard(text).then(() => {
      notification("Copied", {
        delay: 800,
      });
    });
  };

  const copyRow = () => {
    copyWithNotice(`${rule}: ${value};`);
  };

  const copyValue = () => {
    copyWithNotice(value);
  };

  const handleRowOnContextmenu = (e: MouseEvent) => {
    $contextMenuStore.isOpen = true;
    $contextMenuStore.x = e.clientX;
    $contextMenuStore.y = e.clientY;
    $contextMenuStore.options = [
      {
        label: content[$settingsStore.lang].contextMenu.codeRowOptions.copyRow,
        fn: copyRow,
      },
      {
        label:
          content[$settingsStore.lang].contextMenu.codeRowOptions.copyValue,
        fn: copyValue,
      },
    ];
  };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="{twJoin(
    'cursor-pointer rounded-e-[4px] px-2 py-0.5 border-l-2 border-transparent',
    'hover:bg-slate-50 hover:border-l-black'
  )}"
  on:contextmenu="{handleRowOnContextmenu}"
>
  <CodeRule {rule} />: <CodeRuleValue {value} />;
</div>
