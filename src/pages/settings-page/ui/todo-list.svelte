<script lang="ts">
  const todoList = [
    "Добавить переключение единиц измерения",
    "Выделить в отдельный блок flex-стили элемента",
    "Добавить в :root селектор шрифты",
    "Добавить preview цветов в стилях",
  ];
</script>

<div class="flex flex-col gap-2">
  <h3 class="font-medium text-indigo-600">Ближайшие цели по развитию:</h3>
  <ul>
    {#each todoList as todo}
      <li class="flex gap-3">
        <span class="font-medium text-indigo-600 select-none">{">"}</span>
        <p>{todo}</p>
      </li>
    {/each}
  </ul>

  <p class="text-sm py-2 px-4 bg-[#efecf4] rounded-[5px]">
    Вопросы и предложения по развитию плагина принимаются на
    <span class="text-indigo-600">3str.webdev@gmail.com 🎉</span>
  </p>
</div>
