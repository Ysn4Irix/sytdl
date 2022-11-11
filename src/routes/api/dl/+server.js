import { json } from '@sveltejs/kit'
import ytdl from 'youtube-dl-exec'
/**
 *
 * @type {import('@sveltejs/kit').RequestHandler}
 * @param {import('@sveltejs/kit').RequestEvent} request
 */
export const POST = async ({ request }) => {
	const { url } = await request.json()

	let video_id
	if (url.includes('youtu.be')) video_id = url.split('/')[3]
	else video_id = url.split('v=')[1]

	const response = await ytdl(
		video_id,
		{
			dumpSingleJson: true,
			noWarnings: true,
			noCallHome: true,
			noCheckCertificate: true,
			preferFreeFormats: true,
			youtubeSkipDashManifest: true
		},
		{
			input: '-f "bv+ba/b" --sponsorblock-mark --sponsorblock-mark-remove'
		}
	)

	/**
	 * @type {Array<object>} dataFormats
	 */
	const dataFormats = []
	if (response.hasOwnProperty('uploader_url')) {
		const {
			uploader_url: ownerUrl,
			uploader_id: ownerId,
			channel_url: channelUrl,
			uploader,
			view_count: totalViews,
			id: urlId,
			thumbnail,
			duration,
			title,
			categories,
			formats
		} = response

		formats.map((item) => {
			if (
				item.ext === 'mp4' &&
				item.format_note !== '144p' &&
				item.format_note !== '240p' &&
				item.format_note !== '360p'
			) {
				const { url, format, format_note, ext, filesize, fps } = item

				dataFormats.push({
					url,
					format,
					format_note,
					ext,
					filesize,
					fps
				})
			}
		})
		const myHeaders = new Headers()
		myHeaders.append('Content-Disposition', `attachment; filename=${urlId}.mp4`)
		myHeaders.append('referer', 'youtube.com')
		return json(
			{
				status: 200,
				response: {
					title,
					ownerUrl,
					ownerId,
					channelUrl,
					uploader,
					totalViews,
					urlId,
					thumbnail,
					duration,
					categories,
					dataFormats
				}
			},
			{ headers: myHeaders }
		)
	}
	return new Response('Not Found')
}
