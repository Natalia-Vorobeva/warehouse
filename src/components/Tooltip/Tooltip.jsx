import './Tooltip.scss';

function Tooltip({ text, className }) {

return (
<div className={`${className} tooltip`}>
	<span className="tooltip__text">
		{text}
	</span>
</div>
);
}

export default Tooltip;