import './Bookmark.scss';

function Bookmark({ text, subtext }) {

	return (
		<div className="bookmark">
			<div className="bookmark__container"></div>
			<div className="bookmark__text-container">
			<p className="bookmark__text">{text}</p>
			{/* <p className="bookmark__line"></p> */}
			<p className="bookmark__subtext">{subtext}</p>
			</div>
			
		</div>
	)
}

export default Bookmark;