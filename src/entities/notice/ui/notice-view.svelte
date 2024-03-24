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
    <span class="px-4 py-2 text-sm bg-popover rounded-md shadow-lg select-none">
      {$noticeStore.message}
    </span>
  </div>
{/if}
