<script lang="ts">
  import CodeRuleValue from "./code-rule-value.svelte";
  import CodeRule from "./code-rule.svelte";

  export let rule: string | number;
  export let value: string;
</script>

<div class="flex">
  <CodeRule {rule} />: <CodeRuleValue {value} />;
</div>
