<script lang="ts">
  import { designSystemStore } from "@/entities/design-system";
  import { settingsStore } from "@/entities/settings";
  import { content } from "@/shared/content";
  import { twJoin } from "tailwind-merge";

  $: hasTextStyles = $designSystemStore.textStyles.length > 0;
</script>

{#if hasTextStyles}
  <ul class="w-full text-sm">
    <li
      class="{twJoin(
        'grid grid-cols-3 justify-between gap-10',
        'font-medium',
        'border-b-[1px] border-indigo-600 py-1 px-3',
      )}"
    >
      <span
        >{content[$settingsStore.lang].pages.DESIGN.fontTableHead
          .fontFamily}</span
      >
      <span
        >{content[$settingsStore.lang].pages.DESIGN.fontTableHead
          .fontWeight}</span
      >
      <span
        >{content[$settingsStore.lang].pages.DESIGN.fontTableHead
          .fontSize}</span
      >
      <!-- <span>Кол-во</span> -->
    </li>
    {#each $designSystemStore.textStyles as style}
      <li
        class="{twJoin(
          'grid grid-cols-3 gap-10',
          'border-b-[1px] border-indigo-600 py-1 px-3',
        )}"
      >
        <span>{style.fontFamily}</span>
        <span>{style.fontWeight}</span>
        <span>{style.fontSize}px</span>
        <!-- <span>{style.amountOfConsumers}</span> -->
      </li>
    {/each}
  </ul>
{/if}
