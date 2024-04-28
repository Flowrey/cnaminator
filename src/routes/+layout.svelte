<script>
	import Headers from './Header.svelte';
</script>

<html lang="fr">
	<head>
		<meta charset="UTF-8" />
		<title>CNAMinator</title>
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" />
		<link
			href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
			rel="stylesheet"
		/>
	</head>
	<Headers />
	<body>
		<main>
			<slot />
		</main>
	</body>
</html>

<style>
	html,
	body {
		font-family: 'Fira Sans';
		background-color: #edf2f4;
		margin: 0;
	}

	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 15px;
	}
</style>
