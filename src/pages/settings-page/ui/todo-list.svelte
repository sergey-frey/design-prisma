<script lang="ts">
  import { settingsStore } from "@/entities/settings";
  import { CONTACTS } from "@/shared/constants";
  import { content } from "@/shared/content";

  $: todoList = content[$settingsStore.lang].pages.SETTINGS.todo.todoList;
  $: todoTitle = content[$settingsStore.lang].pages.SETTINGS.todo.todoTitle;

  $: feedbackAbout =
    content[$settingsStore.lang].pages.SETTINGS.feedback.aboutEmail;
  $: feedbackTg = content[$settingsStore.lang].pages.SETTINGS.feedback.aboutTg;
</script>

<div class="flex flex-col gap-2">
  <h3 class="font-medium text-indigo-600">{todoTitle}:</h3>
  <ul>
    {#each todoList as todo}
      <li class="flex gap-3">
        <span class="font-medium text-indigo-600 select-none">{">"}</span>
        <p>{todo}</p>
      </li>
    {/each}
  </ul>

  <p class="text-sm py-2 px-4 bg-muted rounded-md">
    {feedbackAbout}
    <span class="text-indigo-600">{CONTACTS.email} 🎉</span><br />
    {feedbackTg}:
    <a href="{CONTACTS.tg.href}" target="_blank">
      <span class="text-indigo-600 hover:font-semibold">
        {@html CONTACTS.tg.label}
      </span>
    </a>
  </p>
</div>
