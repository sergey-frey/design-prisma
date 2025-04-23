<script lang="ts">
	import { twJoin } from "tailwind-merge";
	import { contextMenuStore } from "..";

	const handleOptionClick = (cb: () => void) => {
		return () => {
			cb();
			$contextMenuStore.isOpen = false;
		};
	};

	let menu = $state({ h: 0, w: 0 });
	let pos = $state({ x: 0, y: 0 });

	const getContextMenuDimension = (node: HTMLDivElement) => {
		let height = node.offsetHeight;
		let width = node.offsetWidth;

		menu = {
			h: height,
			w: width,
		};

		pos = getMenuPosition({
			clickX: $contextMenuStore.x,
			clickY: $contextMenuStore.y,
		});
	};

	const getMenuPosition = ({
		clickX,
		clickY,
	}: {
		clickX: number;
		clickY: number;
	}) => {
		if (menu.w === 0 || menu.h === 0) return { x: 0, y: 0 };

		const browser = {
			w: window.innerWidth,
			h: window.innerHeight,
		};

		const newPos = {
			x: clickX,
			y: clickY,
		};

		if (browser.h - newPos.y < menu.h) {
			newPos.y = newPos.y - menu.h;
		}
		if (browser.w - newPos.x < menu.w) {
			newPos.x = newPos.x - menu.w;
		}

		return newPos;
	};

	$effect(() => {
		pos = getMenuPosition({
			clickX: $contextMenuStore.x,
			clickY: $contextMenuStore.y,
		});
	});
</script>

<svelte:window on:click={() => ($contextMenuStore.isOpen = false)} />

{#if $contextMenuStore.isOpen}
	<div
		class={twJoin("fixed menu-dp")}
		style="top: {pos.y + 1}px; left: {pos.x + 1}px"
		use:getContextMenuDimension
	>
		<ul class={["bg-background rounded-md p-1", "flex flex-col", "shadow-md"]}>
			{#each $contextMenuStore.options as option}
				<li class="w-full">
					<button
						type={"button"}
						class={[
							"w-full",
							"px-4 py-1 whitespace-nowrap transition-colors",
							"cursor-pointer text-sm rounded-sm text-start",
							"hover:bg-accent",
						]}
						onclick={handleOptionClick(option.fn)}
					>
						{option.label}
					</button>
				</li>
			{/each}
		</ul>
	</div>
{/if}
