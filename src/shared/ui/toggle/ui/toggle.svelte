<script lang="ts">
  import { twJoin } from "tailwind-merge";
  import "../animations/index.css";

  export let isChecked: boolean;
</script>

<div
  class="{twJoin(
    'relative w-9 h-5 rounded-full',
    'shadow-inner cursor-pointer transition-colors',
    isChecked ? 'bg-indigo-600' : 'bg-slate-200',
  )}"
>
  <span class="{twJoin('toggle', isChecked ? 'toggle-right' : 'toggle-left')}">
  </span>
</div>
