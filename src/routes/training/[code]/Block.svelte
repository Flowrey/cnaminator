<script lang="ts">
	import Unit from './Unit.svelte';
	import type { SkillBlock, TeachingUnit } from '$lib';
	
	export let isMaster: boolean = true;
	export let block: SkillBlock;
	export let hide_titles: boolean = false;
	export let parent_selected: Set<TeachingUnit> | null = null;
	let selected: Set<TeachingUnit> = new Set();
	$: ects = Array.from(selected.values()).reduce((acc, val) => acc + val.ects, 0);
</script>

<div class="block">
	<p class="ects">{ects}/{block.ects} ECTS</p>
	<div class="children">
		{#each block.children as child}
			<svelte:self block={child} {hide_titles} bind:parent_selected={selected} isMaster={false} />
		{/each}
	</div>
	<div class:block-wrapper={isMaster}>
		{#each block.units as unit}
		<Unit
		{unit}
		{hide_titles}
		selected={selected.has(unit)}
		on:click={() => {
			if (!selected.has(unit)) {
				selected.add(unit);
				parent_selected?.add(unit);
			} else {
				selected.delete(unit);
				parent_selected?.delete(unit);
			}
			selected = selected;
			parent_selected = parent_selected;
		}}
		/>
		{/each}
	</div>
</div>

<style>
	.block {
		display: flex;
		flex-direction: column;
		align-items: center;
		border-radius: 5px;
		border: 2px solid #d90429;
		margin: 10px;
		padding: 10px;
		width: fit-content;
	}

	.block-wrapper {
		display: grid;
  		grid-template-columns: repeat(5, auto);
  		grid-auto-rows: minmax(100px, auto);

		@media screen and (max-width: 1000px) {
			display: flex;
			flex-direction: column;
		}
	}


	.children {
		display: flex;
		flex-direction: row;

		@media screen and (max-width: 1000px) {
			flex-direction: column;
		}
	}
	
	.ects {
		width: 70px;
		text-align: center;
		font-weight: 500;
		font-size: 0.8em;
		border-radius: 3px;
		padding: 10px 8px;
		background-color: #857761;
		color: #fff;
	}
</style>
