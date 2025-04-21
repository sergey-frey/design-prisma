<script lang="ts">
	import {
		Tabs,
		TabsContent,
		TabsList,
		TabsTrigger,
	} from "$lib/components/ui/tabs";
	import { settingsStore } from "@/entities/settings";
	import { NAVIGATION } from "@/shared/constants";
	import { content } from "@/shared/content";
	import type { NavPage, SetSettingsQuery } from "@/shared/types";
	import { postMessageToPlugin } from "@/shared/utils";
	import type { Snippet } from "svelte";

	type NavigationProps = {
		className?: string;
		stylesPage: Snippet;
		designPage: Snippet;
		settingsPage: Snippet;
	};

	let { stylesPage, designPage, settingsPage, className }: NavigationProps =
		$props();

	const keys = Object.keys(NAVIGATION) as Array<NavPage>;

	const handleClick = $derived((src: NavPage) => {
		$settingsStore.nav = src;

		postMessageToPlugin<SetSettingsQuery>({
			action: "set-settings-query",
			settings: $settingsStore,
		});
	});
</script>

<Tabs value={$settingsStore.nav} className={[className]}>
	<TabsList
		class="grid w-full sticky top-1 z-50 shadow-md"
		style={`grid-template-columns: repeat(${keys.length}, minmax(0, 1fr));`}
	>
		{#each keys as key}
			<TabsTrigger value={key} onclick={() => handleClick(key)}>
				{content[$settingsStore.lang].nav[key]}
			</TabsTrigger>
		{/each}
	</TabsList>
	<TabsContent value={"STYLES"}>
		{@render stylesPage?.()}
	</TabsContent>
	<TabsContent value={"DESIGN"}>
		{@render designPage?.()}
	</TabsContent>
	<TabsContent value={"SETTINGS"}>
		{@render settingsPage?.()}
	</TabsContent>
</Tabs>
