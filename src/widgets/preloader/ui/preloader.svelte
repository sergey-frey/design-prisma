<script lang="ts">
  import { fade } from "svelte/transition";
</script>

<article
  transition:fade="{{ duration: 200 }}"
  class="fixed top-0 left-0 w-screen h-screen bg-white"
></article>
