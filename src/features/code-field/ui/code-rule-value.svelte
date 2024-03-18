<script lang="ts">
  import { settingsStore } from "@/entities/settings";
  import { pipe } from "@/shared/lib";

  export let value: string;

  const getColorPreview = (color: string) => {
    return `<span class="inline-block w-3 h-3 border-[1px] border-black mr-0.5" style="background-color: ${color};"></span>`;
  };

  const getColorWithPreview = (color: string) => {
    return `<span class="color-with-preview">${getColorPreview(color)}${color}</span>`;
  };

  const addPreview = (v: string): string => {
    const res = v
      .replace(/#([0-9a-fA-F]{6,8})/g, (match) => getColorWithPreview(match))
      .replace(
        /rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}(?:\s*,\s*\d*(?:\.\d+)?)?\s*\)/g,
        (match) => getColorWithPreview(match)
      )
      .replace("\n", "");

    return res;
  };

  // TODO: extract to lib
  $: value = pipe(value, [addPreview]);
</script>

<!-- <span class="text-[#26232a] flex items-center gap-1"> -->
{@html value}
<!-- </span> -->
