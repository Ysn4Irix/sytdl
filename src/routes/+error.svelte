<script>
	import { page } from '$app/stores'
</script>

<div class="flex justify-center items-center text-center mt-14 font-nunito">
	<main class="max-w-7xl w-full mx-auto">
		<div class="py-16">
			<p class="text-2xl font-semibold text-secondary uppercase tracking-wide py-2">
				{`${$page.status === 404 ? '404' : '500'}`}
			</p>
			<h1 class="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl py-2">
				{`${$page.status === 404 ? 'Page not found' : 'Unexpected Error'}`}
			</h1>
			<p class="mt-2 text-base py-2">
				{`${
					$page.status === 404
						? 'Sorry, we couldn’t find the page you’re looking for'
						: 'Oops! We have an problem in our backend 😢'
				}`}
			</p>
			<div class="mt-6">
				<a href="/" class="text-base font-medium text-secondary hover:text-secondary-focus">
					Go back home
					<span aria-hidden="true"> &rarr;</span>
				</a>
			</div>
		</div>
	</main>
</div>
