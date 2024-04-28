<script lang="ts">
	import SearchForm from './SearchForm.svelte';
	import { base } from '$app/paths';
</script>

<header>
	<h1><a href={base + '/'}>CNAMinator</a></h1>
	<SearchForm />
</header>

<style>
	header {
		display: flex;
		background-color: #e63946;
		justify-content: center;
		align-items: center;
		padding: 1em;
		gap: 20px;
		border-bottom: 2px solid #d90429;

		@media screen and (max-width: 600px) {
			flex-direction: column;
		}
	}

	h1 {
		margin: 0;
		color: #fff;
	}

	a {
		color: inherit;
		text-decoration: none;
	}
</style>
