<script lang="ts">
	type CodeRuleProps = {
		rule: string | number;
	};

	const { rule }: CodeRuleProps = $props();
</script>

<span class="inline text-indigo-700">{rule}</span>
