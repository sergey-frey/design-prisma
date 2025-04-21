<script lang="ts">
	import * as Select from "$lib/components/ui/select";
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

	$: text = content[$settingsStore.lang].pages.SETTINGS.switchUnits;

	const handleSelect = (units: Unit) => {
		$settingsStore.units = units;

		postMessageToPlugin<SetSettingsQuery>({
			action: "set-settings-query",
			settings: $settingsStore,
		});
	};

	const handleSelectedChange = (opt: any) => {
		if (!opt?.value) {
			return;
		}

		handleSelect(opt.value);
	};
</script>

<div class="flex items-center gap-3 justify-between">
	<p>{text}</p>

	<Select.Root onSelectedChange={handleSelectedChange}>
		<Select.Trigger class="w-[70px]">
			{$settingsStore.units}
		</Select.Trigger>
		<Select.Content>
			{#each unitsList as { label, value }}
				<Select.Item {value}>
					{label}
				</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>
</div>
