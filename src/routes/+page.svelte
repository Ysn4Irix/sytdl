<script>
	import download from '$src/icons/download.svg'

	let vars = {
		loading: false,
		error: '',
		url: '',
		title: '',
		thumbnail: '',
		urlId: '',
		dataFormats: [],
		format: ''
	}

	const getVideo = async () => {
		const options = {
			method: 'POST',
			body: JSON.stringify({
				url: vars.url
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		}

		vars.loading = true

		try {
			const res = await fetch('/api/dl', options)
			if (res.ok) {
				const { response } = await res.json()
				const { thumbnail, title, dataFormats, urlId, format } = response
				vars.loading = false
				vars.thumbnail = thumbnail
				vars.title = title
				vars.format = format
				vars.urlId = urlId
				vars.dataFormats = dataFormats
				console.log('🚀 ~ file: +page.svelte ~ line 36 ~ getVideo ~ dataFormats', dataFormats)
			} else {
				vars.loading = false
				vars.error = 'Oops! Something went wrong, verify your url'
			}
		} catch {
			vars.loading = false
			vars.error = 'Oops! Something went wrong, verify your url'
		}
	}
</script>

<div class="justify-center text-center font-nunito">
	<div class="flex flex-col">
		<h1 class="text-6xl font-bold tracking-widest">
			<span class="text-[#FF3E00]">S</span>ytdl
		</h1>
		<p class="font-semibold text-lg p-5">
			The fastest and easiest way to download
			<a class="text-[#E60202] hover:opacity-60" href="https://youtube.com"> YouTube </a> videos
		</p>
	</div>
	<div class="flex justify-center text-center font-nunito">
		<div class="card bg-base-100 shadow-xl p-5 m-4 lg:w-3/4 xl:w-2/3">
			<div class="flex flex-col lg:flex-row xl:flex-row justify-center items-center">
				<input
					type="text"
					placeholder="Paste your video link here"
					class="input input-secondary input-bordered lg:mr-1 lg:w-1/2 xl:mr-1 xl:w-1/2"
					bind:value={vars.url}
				/>
				<button
					class:btn-disabled={vars.url === '' || vars.loading}
					on:click={getVideo}
					type="button"
					class="btn btn-secondary shadow-sm max-w-xs mt-2 lg:m-0 xl:m-0"
				>
					Search
				</button>
			</div>
			{#if vars.error}
				<p class="text-[#E60202] font-semibold text-lg mt-5">{vars.error}</p>
			{:else if vars.loading}
				<div class="flex flex-row justify-center mt-10 text-center">
					<div class="half-circle-spinner">
						<div class="circle circle-1" />
						<div class="circle circle-2" />
					</div>
				</div>
			{:else}
				<div class:hidden={!vars.thumbnail} class="flex flex-row justify-center mt-10 text-center">
					<div class="py-4 px-12">
						<img class="rounded-lg shadow-sm" src={vars.thumbnail} alt="thumbnail" />
						<h1 class="mt-3 font-semibold">{vars.title}</h1>
					</div>
				</div>
				<div
					class:hidden={!vars.dataFormats}
					class="flex flex-col lg:flex-row xl:flex-row justify-center items-center mt-10 text-center"
				>
					<div class="grid lg:grid-cols-2 lg:gap-2 xl:grid-cols-3 xl:gap-3 justify-center">
						{#each vars.dataFormats as item}
							<div>
								<a
									href={item.url}
									class="btn btn-secondary shadow-sm max-w-xs my-1 xl:mx-3"
									rel="noreferrer noopener"
									target="_blank"
									download={`${vars.title}.mp4`}
								>
									<img src={download} alt="download" /> &nbsp; {item.format}
								</a>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.half-circle-spinner {
		width: 60px;
		height: 60px;
		border-radius: 100%;
		position: relative;
	}

	.half-circle-spinner .circle {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 100%;
		border: calc(60px / 10) solid transparent;
	}

	.half-circle-spinner .circle.circle-1 {
		border-top-color: #ff1d5e;
		animation: half-circle-spinner-animation 1s infinite;
	}

	.half-circle-spinner .circle.circle-2 {
		border-bottom-color: #ff1d5e;
		animation: half-circle-spinner-animation 1s infinite alternate;
	}

	@keyframes half-circle-spinner-animation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
