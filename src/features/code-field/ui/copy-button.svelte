<script lang="ts">
  import { copyToClipboard } from "@/shared/utils";
  import { CopyIcon, OkIcon } from "@/shared/ui/icons";
  import { fade } from "svelte/transition";
  import { twJoin } from "tailwind-merge";

  export let code: string;

  let wasCopied = false;

  const handleClick = () => {
    copyToClipboard(code);
    wasCopied = true;

    setTimeout(() => {
      wasCopied = false;
    }, 800);
  };
</script>

<button
  type="button"
  class="{twJoin($$props.class, 'text-indigo-600 w-6 h-6', 'opacity-70')}"
  on:click="{handleClick}"
  title="Copy"
>
  <div class="relative w-6 h-6">
    {#if wasCopied}
      <span class="absolute top-0 left-0" transition:fade="{{ duration: 150 }}">
        <OkIcon />
      </span>
    {:else}
      <span class="absolute top-0 left-0" transition:fade="{{ duration: 150 }}">
        <CopyIcon />
      </span>
    {/if}
  </div>
</button>
