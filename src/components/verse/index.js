import React from 'react'
import PropTypes from 'prop-types'

import './index.scss'

const Verse = ({ verse }) => {
	const verseName = `${verse.book} ${verse.chapter}:${verse.verse}`

	return (
		<div className="verse">
			<div className="verse-info">
				<p className="verse-title">{verseName}</p>
				<p className="verse-testament" title={`${verse.testament} testament`}>{verse.testament}</p>
				<div className="verse-tags">
					{verse.tags.map((tag) => {
						return <div key={tag} className="tag">{tag}</div>
					})}
				</div>
			</div>
			<div className="verse-text">
				<p>{verse.text}</p>
			</div>
		</div>
	)
}

Verse.propTypes = {
	verse: PropTypes.object.isRequired
}

export default Verse
