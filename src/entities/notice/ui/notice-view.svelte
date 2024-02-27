<script lang="ts">
  import { twJoin } from "tailwind-merge";
  import { noticeStore } from "..";
  import { fly } from "svelte/transition";
</script>

{#if $noticeStore.isShow}
  <div
    transition:fly="{{ duration: 200, y: 10 }}"
    class="{twJoin('fixed w-full bottom-5 z-50', 'flex justify-center')}"
  >
    <span class="px-3 py-1 text-sm rounded-md bg-slate-200 select-none">
      {$noticeStore.message}
    </span>
  </div>
{/if}
