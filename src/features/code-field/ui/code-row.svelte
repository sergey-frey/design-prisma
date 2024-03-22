<script lang="ts">
  import { contextMenuStore } from "@/entities/context-menu";
  import { noticeStore } from "@/entities/notice";
  import { settingsStore } from "@/entities/settings";
  import { content } from "@/shared/content";
  import { copyToClipboard, pipe } from "@/shared/lib";
  import { twJoin } from "tailwind-merge";
  import CodeRuleValue from "./code-rule-value.svelte";
  import CodeRule from "./code-rule.svelte";

  export let rule: string | number;
  export let value: string;

  let noticeTimeout: number | null = null;

  const getNoticeTimeout = () => {
    return setTimeout(() => {
      $noticeStore.isShow = false;
    }, 800);
  };

  const copyWithNotice = (text: string) => {
    copyToClipboard(text).then(() => {
      if (!$noticeStore.isShow) {
        $noticeStore.message = "Скопировано";
        $noticeStore.isShow = true;
        noticeTimeout = getNoticeTimeout();
      } else if (noticeTimeout) {
        clearTimeout(noticeTimeout);
        noticeTimeout = getNoticeTimeout();
      }
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
    'cursor-pointer rounded-[4px]',
    'hover:bg-indigo-200 px-2 py-0.5'
  )}"
  on:contextmenu="{handleRowOnContextmenu}"
>
  <CodeRule {rule} />: <CodeRuleValue {value} />;
</div>
