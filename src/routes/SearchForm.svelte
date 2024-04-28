<form action="/search">
	<input type="text" placeholder="Search.." />
	<button type="submit">
		<svg
			height="512"
			width="512"
			viewBox="0 0 512 512"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
			class="submit-icon"
			><path
				d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
			></path></svg
		>
	</button>
</form>

<style>
	form {
		--border-radius: 5000px;
		--submit-icon-size: 1.1em;
		display: flex;
	}

	form:focus-within {
		outline: 4px solid #457b9d;
		border-radius: var(--border-radius);
	}

	input {
		padding: 5px;
		padding-left: 10px;
		border: none;
		border-top-left-radius: var(--border-radius);
		border-bottom-left-radius: var(--border-radius);
		font-size: medium;
	}

	input:focus {
		outline: none;
	}

	button {
		border: none;
		width: 40px;
		border-top-right-radius: var(--border-radius);
		border-bottom-right-radius: var(--border-radius);
		cursor: pointer;
		background-color: #457b9d;
		display: inline-grid;
		place-items: center;
		padding-right: 5px;
		color: white;
	}

	.submit-icon {
		width: var(--submit-icon-size);
		height: var(--submit-icon-size);
	}
</style>
