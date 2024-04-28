<script>
	import { base } from '$app/paths';
	import { trainings } from '$lib';
</script>

<h1>Welcome to CNAMinator</h1>
<ul>
	{#each trainings as training}
		<li><a href={base + '/training/' + training.code}>{training.name}</a></li>
	{/each}
</ul>

<style>
	ul {
		display: flex;
		flex-direction: column;
		padding: 0;
	}

	li {
		float: left;
		list-style: none;
		text-align: center;
		border: 1px solid black;
		border-radius: 50px;
		margin: 5px 0px;
		padding: 15px;
		background-color: #fff;
	}

	li:hover {
		background-color: rgba(27, 31, 35, 0.15);
	}

	li a {
		text-decoration: none;
		display: block;
		color: black;
	}

	li a:hover {
		text-decoration: none;
	}
</style>
