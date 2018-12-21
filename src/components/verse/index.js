import React from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'

import './index.scss'

const Verse = ({ verse }) => {
	const verseName = `${verse.book} ${verse.chapter}:${verse.verse}`

	return (
		<div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
			<div className="verse">
				<div className="verse-info">
					<p className="verse-title">{verseName}</p>
					<p className="verse-testament" title={`${verse.testament} testament`}>{verse.testament}</p>
					<div className="verse-tags">
						{verse.tags.map((tag) => {
							return <div key={shortid.generate()} className="tag">{tag}</div>
						})}
					</div>
				</div>
				<div className="verse-text">
					<p>{verse.text}</p>
				</div>
			</div>
		</div>
	)
}

Verse.propTypes = {
	verse: PropTypes.object.isRequired
}

export default Verse
