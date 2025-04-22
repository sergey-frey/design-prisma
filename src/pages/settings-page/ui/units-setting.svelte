<script lang="ts">
	import {
		Select,
		SelectContent,
		SelectTrigger,
		SelectItem,
	} from "$lib/components/ui/select";
	import { settingsStore } from "@/entities/settings";
	import { content } from "@/shared/content";
	import { Unit, type SetSettingsQuery } from "@/shared/types";
	import { postMessageToPlugin } from "@/shared/utils";

	const unitsList = [
		{
			label: "px",
			value: Unit.px,
		},
		{
			label: "rem",
			value: Unit.rem,
		},
	];

	const text = $derived(
		content[$settingsStore.lang].pages.SETTINGS.switchUnits
	);

	const handleValueChange = (units: string) => {
		$settingsStore.units = units as Unit;

		postMessageToPlugin<SetSettingsQuery>({
			action: "set-settings-query",
			settings: $settingsStore,
		});
	};
</script>

<div class="flex items-center gap-3 justify-between">
	<p>{text}</p>

	<Select type="single" onValueChange={handleValueChange}>
		<SelectTrigger class="w-[70px]">
			{$settingsStore.units}
		</SelectTrigger>
		<SelectContent>
			{#each unitsList as units (units.value)}
				<SelectItem value={units.value} label={units.label} />
			{/each}
		</SelectContent>
	</Select>
</div>
