<script lang="ts">
  import { settingsStore } from "@/entities/settings";
  import { postMessageToPlugin } from "@/shared/utils";
  import type { SetSettingsQuery } from "@/shared/types";
  import { ResizeIcon } from "@/shared/ui/icons";
  import { twJoin } from "tailwind-merge";

  const resize = ({ width, height }: { width: number; height: number }) => {
    postMessageToPlugin<SetSettingsQuery>({
      action: "set-settings-query",
      settings: { ...$settingsStore, size: { width, height } },
    });
  };

  const handleResize = (node: HTMLButtonElement) => {
    node.onpointerdown = function (event) {
      node.setPointerCapture(event.pointerId);
      node.onpointermove = function (e) {
        const size = {
          width: Math.max(320, Math.floor(e.clientX + 4)),
          height: Math.max(520, Math.floor(e.clientY + 4)),
        };

        resize(size);
      };
      node.onpointerup = function () {
        node.onpointermove = null;
        node.onpointerup = null;
      };
    };
  };
</script>

<button
  use:handleResize
  class="{twJoin(
    'fixed bottom-0 right-0',
    'pr-1 pb-1',
    'text-indigo-700',
    'cursor-nw-resize'
  )}"
>
  <ResizeIcon />
</button>
