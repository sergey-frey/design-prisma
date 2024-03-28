<script lang="ts">
  import { fade } from "svelte/transition";
  import { twJoin } from "tailwind-merge";
</script>

<article
  transition:fade="{{ duration: 200 }}"
  class="fixed top-0 left-0 w-screen h-screen grid place-content-center bg-white z-[99999]"
>
  <span
    class="{twJoin(
      'min-w-8 min-h-8',
      'border-[3px] border-x-indigo-700 border-y-transparent rounded-full',
      'animate-spin'
    )}"
  ></span>
</article>
