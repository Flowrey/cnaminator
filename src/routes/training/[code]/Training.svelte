<script lang="ts">
	import type { Training } from '$lib';
	import Block from './Block.svelte';
	export let training: Training;
	let hide_titles = false;
</script>

<div class="training">
	<div class="header">
		<h1>{training.code}</h1>
		<h2>{training.name}</h2>
		<label>
			<input type="checkbox" bind:checked={hide_titles} />
			Cacher le titre des UE
		</label>
	</div>
	<div class="curriculum">
		{#each training.curriculum as block}
			<Block {block} {hide_titles} />
		{/each}
	</div>
</div>

<style>
	.header {
		background-color: rgb(0 0 0 / 10%);
		border-radius: 5px;
		margin-bottom: 15px;
		padding: 30px;
		padding-bottom: 15px;
		padding-top: 15px;
		width: 100%;
		box-sizing: border-box;
	}

	.header h1 {
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.header h2 {
		font-weight: normal;
		margin-bottom: 10px;
		padding-bottom: 15px;
	}

	.training {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.curriculum {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		border-radius: 10px;
		padding: 15px;
	}
</style>
