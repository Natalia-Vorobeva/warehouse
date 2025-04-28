import './Bookmark.scss';

function Bookmark({ text, subtext, onClick, className }) {

	return (
		<div onClick={() => onClick(`${text}${subtext}`)} className="bookmark">
			{/* <div  className="bookmark__container"></div> */}
			<div className="bookmark__text-container">
			<p className={`bookmark__text ${className}`}>{text}</p>
			<p className="bookmark__subtext">{subtext}</p>
			</div>
			
		</div>
	)
}

export default Bookmark;