<script lang="ts">
  import LangSetting from "./lang-setting.svelte";
  import PreprocessorSetting from "./preprocessor-setting.svelte";
  import ResetSizeSetting from "./reset-size-setting.svelte";
  import TodoList from "./todo-list.svelte";
  import ToggleSetting from "./toggle-setting.svelte";
  import UnitsSetting from "./units-setting.svelte";
</script>

<section class="grow flex flex-col gap-4">
  <div class="grow flex flex-col gap-4">
    <LangSetting />
    <UnitsSetting />
    <ToggleSetting textKey="hideDesignSystem" settingKey="hideDesignSystem" />
    <ToggleSetting
      textKey="disableDesignVariables"
      settingKey="disableDesignVariables"
    />
    <ToggleSetting
      textKey="disableCodeComments"
      settingKey="disableCodeComments"
    />
    <PreprocessorSetting />
    <ResetSizeSetting />
  </div>
  <hr />
  <TodoList />
</section>
