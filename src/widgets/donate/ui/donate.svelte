<script lang="ts">
  import { CoffeeIcon } from "@/shared/ui/icons";
  import { twJoin } from "tailwind-merge";

  const handleClick = () => {
    window.open("https://pay.cloudtips.ru/p/f514bd98", "_blank");
  };
</script>

<section class="min-h-14">
  <button
    class="{twJoin(
      'fixed bottom-4 left-4 overflow-hidden w-11',
      'flex items-center gap-2',
      'p-2 bg-[#aa6148] rounded-full transition-all',
      'hover:w-[210px]',
    )}"
    on:click="{handleClick}"
  >
    <CoffeeIcon class="min-w-7 min-h-7" />
    <p class="text-white pr-2 whitespace-nowrap">Поддержать проект</p>
  </button>
</section>
