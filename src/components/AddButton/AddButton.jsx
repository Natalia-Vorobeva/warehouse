import './AddButton.scss';

function AddButton({ className, 
	onClick, 
	disableNewBlock
 }) {		
	

return (
<div 
onClick={onClick} 
className={`${className} `}>
	<div className={`add-button ${disableNewBlock}`}>
	</div>	
</div>
);
}

export default AddButton;