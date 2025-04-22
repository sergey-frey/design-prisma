<script lang="ts">
	import {
		Select,
		SelectContent,
		SelectItem,
		SelectTrigger,
	} from "$lib/components/ui/select";
	import { settingsStore } from "@/entities/settings";
	import { content } from "@/shared/content";
	import type { CSSPreprocessor, SetSettingsQuery } from "@/shared/types";
	import { postMessageToPlugin } from "@/shared/utils";

	const preprocessorsList = [
		{
			label: "css",
			value: "css",
		},
		{
			label: "scss",
			value: "scss",
		},
	];

	const text = $derived(
		content[$settingsStore.lang].pages.SETTINGS.switchPreprocessor
	);

	const handleValueChange = (preprocessor: string) => {
		$settingsStore.preprocessor = preprocessor as CSSPreprocessor;

		postMessageToPlugin<SetSettingsQuery>({
			action: "set-settings-query",
			settings: $settingsStore,
		});
	};
</script>

<div class="flex items-center gap-3 justify-between">
	<p>{text}</p>
	<Select type="single" name="preprocessor" onValueChange={handleValueChange}>
		<SelectTrigger class="w-[70px]">
			{$settingsStore.preprocessor}
		</SelectTrigger>
		<SelectContent>
			{#each preprocessorsList as { label, value }}
				<SelectItem {value}>
					{label}
				</SelectItem>
			{/each}
		</SelectContent>
	</Select>
</div>
