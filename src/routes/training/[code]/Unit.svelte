<script lang="ts">
	import type { TeachingUnit } from '$lib';

	export let unit: TeachingUnit;
	export let selected = false;
	export let hide_titles = false;
</script>

<div class="unit">
	<button on:click class:selected>
		<div class="unit-code">{unit.code}</div>
		{#if !hide_titles}
			<div class="unit-title">{unit.title}</div>
		{/if}
		<div class="unit-ects">{unit.ects} ECTS</div>
	</button>
</div>

<style>
	.unit button {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		gap: 15px;
		appearance: none;
		font-size: 14px;

		width: 100%;
		height: 60px;

		margin-top: 5px;
		margin-bottom: 5px;

		border: 1px solid rgba(27, 31, 35, 0.15);
		border-radius: 5px;
		background-color: #fafbfc;
		transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
		font-family: inherit;
		box-shadow:
			rgba(27, 31, 35, 0.04) 0 1px 0,
			rgba(255, 255, 255, 0.25) 0 1px 0 inset;

		background-color: #efefef;
		margin: 8px;
		padding: 6px;
		width: 12em;
		height: fit-content;
	}

	.unit .selected {
		color: #24292e;
		background-color: #8fd177;
	}

	.unit-ects {
		width: 56px;
		text-align: center;
		font-weight: 500;
		font-size: 0.8em;
		border-radius: 3px;
		padding: 10px 8px;
		background-color: #857761;
		color: #fff;
	}

	.unit-code {
		padding: 0;
		margin: 0;
		font-weight: 500;
		font-size: 16px;
	}

	.unit-title {
		font-size: small;
	}
</style>
