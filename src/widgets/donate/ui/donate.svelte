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
      'fixed bottom-4 left-4 overflow-hidden w-8 h-8',
      'flex items-center gap-2',
      'px-1 bg-[#aa6148] rounded-full transition-all',
      'hover:w-[180px]'
    )}"
    on:click="{handleClick}"
  >
    <CoffeeIcon class="min-w-6 min-h-6" />
    <p class="text-white pr-[6px] whitespace-nowrap text-sm">
      Поддержать проект
    </p>
  </button>
</section>
