import timeout from './timeout'

const getVerses = (version, tag, callback) => {
	if (!navigator.onLine) {
		console.log("offline")
		return callback(new Error("You are offline!"))
	}

	const formattedTag = tag.toLowerCase().replace(/[^\w\s]/gi, '')
	if (formattedTag === "") return callback(null, [])

	timeout(10000, fetch(`https://api.versefor.galex.cc/bible/${version}?tag=${formattedTag}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		}
	})
		.then(response => {
			return response.status === 429 ?
				{ success: false, data: "Too many requests" } :
				response.json()
		})
		.then(data => {
			if (data.success) {
				return callback(null, data.data)
			} else {
				return callback(new Error(data.data))
			}
		})
	).catch(() => {
		return callback(new Error("Could not connect to database. Please try again later."))
	})
}

export {
	getVerses
}
