<script lang="ts">
	import {
		Select,
		SelectContent,
		SelectItem,
		SelectTrigger,
	} from "$lib/components/ui/select/index";
	import { settingsStore } from "@/entities/settings";
	import { content } from "@/shared/content";
	import type { Lang, SetSettingsQuery } from "@/shared/types";
	import { FlagIcon } from "@/shared/ui/icons";
	import { postMessageToPlugin } from "@/shared/utils";

	const langsList = [
		{
			label: "Русский",
			value: "ru",
		},
		{
			label: "English",
			value: "en",
		},
	];

	const selectValue = $state(langsList[0]);

	const triggerContent = $derived(
		langsList.find((lang) => lang.value === selectValue.value)?.label ??
			langsList[0].label
	);

	const text = $derived(
		content[$settingsStore.lang].pages.SETTINGS.switchLanguage
	);

	const handleSelect = $derived((lang: Lang) => {
		$settingsStore.lang = lang;

		postMessageToPlugin<SetSettingsQuery>({
			action: "set-settings-query",
			settings: $settingsStore,
		});
	});

	const handleSelectedChange = $derived((opt: any) => {
		if (!opt?.value) {
			return;
		}

		handleSelect(opt.value);
	});
</script>

<div class="flex items-center gap-3 justify-between">
	<p>{text}</p>

	<Select onSelectedChange={handleSelectedChange}>
		<SelectTrigger class="w-fit flex items-center gap-2">
			<FlagIcon class="w-4" country={$settingsStore.lang} />
			{triggerContent}
		</SelectTrigger>
		<SelectContent>
			{#each langsList as { label, value }}
				<SelectItem {value} class="flex items-center gap-2">
					<FlagIcon class="min-w-4 max-w-[16px]" country={value as Lang} />
					{label}
				</SelectItem>
			{/each}
		</SelectContent>
	</Select>
</div>
