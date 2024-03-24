<script lang="ts">
  import Button from "@/shared/lib/components/ui/button/button.svelte";
  import type { ResetPluginDataMessage } from "@/shared/types";
  import { postMessageToPlugin } from "@/shared/utils";

  const handleClick = () => {
    postMessageToPlugin<ResetPluginDataMessage>({
      action: "reset-plugin-data-message",
    });
  };
</script>

<div class="flex items-center justify-between">
  <p class="test-start">Reset plugin data</p>
  <Button size="sm" on:click="{handleClick}">Reset</Button>
</div>
