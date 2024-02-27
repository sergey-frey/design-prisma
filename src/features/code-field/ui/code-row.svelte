<script lang="ts">
  import { twJoin } from "tailwind-merge";
  import CodeRuleValue from "./code-rule-value.svelte";
  import CodeRule from "./code-rule.svelte";
  import { copyToClipboard } from "@/shared/lib";
  import { noticeStore } from "@/entities/notice";

  export let rule: string | number;
  export let value: string;

  $: codeRowString = `${rule}: ${value};`;

  let noticeTimeout: number | null = null;

  const getNoticeTimeout = () => {
    return setTimeout(() => {
      $noticeStore.isShow = false;
    }, 800);
  };

  const copyRow = () => {
    copyToClipboard(codeRowString).then(() => {
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
</script>

<button
  class="{twJoin(
    'flex cursor-pointer rounded-[4px]',
    'hover:bg-indigo-200 px-2 py-[1px]'
  )}"
  on:click="{copyRow}"
>
  <CodeRule {rule} />: <CodeRuleValue {value} />;
</button>
