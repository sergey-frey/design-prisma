<script lang="ts">
  import * as Table from "$lib/components/ui/table/index.js";
  import { designSystemStore } from "@/entities/design-system";
  import { settingsStore } from "@/entities/settings";
  import { content } from "@/shared/content";
  import type { LocalTextStyle } from "@/shared/types";

  $: hasTextStyles = $designSystemStore.textStyles.length > 0;
</script>

{#if hasTextStyles}
  <Table.Root>
    <Table.Header>
      <Table.Row>
        <Table.Head>
          {content[$settingsStore.lang].pages.DESIGN.fontTableHead.fontFamily}
        </Table.Head>
        <Table.Head>
          {content[$settingsStore.lang].pages.DESIGN.fontTableHead.fontWeight}
        </Table.Head>
        <Table.Head class="text-end">
          {content[$settingsStore.lang].pages.DESIGN.fontTableHead.fontSize}
        </Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each $designSystemStore.textStyles as style}
        <Table.Row>
          <Table.Cell class="font-medium">{style.fontFamily}</Table.Cell>
          <Table.Cell>{style.fontWeight}</Table.Cell>
          <Table.Cell class="text-end">{style.fontSize}</Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
{/if}
