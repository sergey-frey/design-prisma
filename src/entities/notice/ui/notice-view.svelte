<script lang="ts">
	import { fly } from "svelte/transition";
	import { noticeStore } from "../model/notice-store";

	const NOTICE_TRANSITION_DURATION = 200;
	const NOTICE_DY = 10;
</script>

{#if $noticeStore.isShow}
	<div
		transition:fly={{ duration: NOTICE_TRANSITION_DURATION, y: NOTICE_DY }}
		class={["fixed w-full bottom-5 z-50", "flex justify-center"]}
	>
		<span class="px-4 py-2 text-sm bg-popover rounded-md shadow-lg select-none">
			{$noticeStore.message}
		</span>
	</div>
{/if}
