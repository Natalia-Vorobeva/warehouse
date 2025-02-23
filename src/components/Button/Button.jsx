import './Button.scss';

function Button( { btnText, handleClickButton, className } ) {
	

return (
<div onClick={handleClickButton} className={`button ${className}`}>
	{btnText}
</div>
);
}

export default Button;