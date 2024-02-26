<script lang="ts">
  export let value: string;

  const getColorPreview = (color: string) => {
    return `
      <div
        class="flex w-3 h-3 border-[1px] border-black"
        style="background-color: ${color};"
      ></div>`;
  };

  const getColorWithPreview = (color: string) => {
    return `<div style="display: flex; gap: 2px; align-items: center;">${getColorPreview(color)}${color}<div>`;
  };

  // TODO: extract to lib
  $: value = value
    .replace(/#([0-9a-fA-F]{6,8})/g, (match) => getColorWithPreview(match))
    .replace(
      /rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}(?:\s*,\s*\d*(?:\.\d+)?)?\s*\)/g,
      (match) => getColorWithPreview(match)
    );
</script>

<span class="text-[#26232a] flex items-center gap-1">
  <!-- <ColorPreview color="{value}" /> -->
  {@html value}
</span>
