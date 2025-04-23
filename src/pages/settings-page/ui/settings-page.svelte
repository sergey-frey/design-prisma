<script lang="ts">
	import { Separator } from "@/shared/lib/components/ui/separator";
	import { PageWrapper } from "@/widgets/page-wrapper";
	import AboutProjectSection from "./about-project-section.svelte";
	import ResetPluginData from "./dev-settings/reset-plugin-data.svelte";
	import LangSetting from "./lang-setting.svelte";
	import PreprocessorSetting from "./preprocessor-setting.svelte";
	import ResetSizeSetting from "./reset-size-setting.svelte";
	import ToggleSetting from "./toggle-setting.svelte";
	import UnitsSetting from "./units-setting.svelte";

	const isDev = process.env.NODE_ENV === "development";
</script>

<PageWrapper page="SETTINGS">
	<section class="grow flex flex-col gap-4 pb-4">
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

			{#if isDev}
				<Separator />
				<ResetPluginData />
			{/if}
		</div>
		<Separator />
		<AboutProjectSection />
		<!-- <TodoList /> -->
	</section>
</PageWrapper>
