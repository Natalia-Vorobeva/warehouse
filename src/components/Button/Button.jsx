import './Button.scss';

function Button( { type, btnText, handleClickButton, className } ) {
	

return (
<button type={type} onClick={handleClickButton} className={`button ${className}`}
 aria-label="Закрыть"
 >
	{btnText || "Сохранить"}
</button>
);
}

export default Button;