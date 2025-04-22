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

	const triggerContent = $derived(
		langsList.find((lang) => lang.value === $settingsStore.lang)?.label
	);

	const handleValueChange = (value: string) => {
		$settingsStore.lang = value as Lang;

		postMessageToPlugin<SetSettingsQuery>({
			action: "set-settings-query",
			settings: $settingsStore,
		});
	};

	const text = $derived(
		content[$settingsStore.lang].pages.SETTINGS.switchLanguage
	);
</script>

<div class="flex items-center gap-3 justify-between">
	<p>{text}</p>

	<Select type="single" name="lang" onValueChange={handleValueChange}>
		<SelectTrigger class="w-fit flex items-center gap-2">
			<FlagIcon class="w-4" country={$settingsStore.lang} />
			{triggerContent}
		</SelectTrigger>
		<SelectContent>
			{#each langsList as lang (lang.value)}
				<!-- <SelectItem {value} {label} class="flex items-center gap-2">
					<FlagIcon class="min-w-4 max-w-[16px]" country={value as Lang} />
					{label}
				</SelectItem> -->
				<SelectItem value={lang.value} label={lang.label} />
			{/each}
		</SelectContent>
	</Select>
</div>
