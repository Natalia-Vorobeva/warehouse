import './AddButton.scss';

function AddButton({ className, onClick, disableNewBlock }) {		
	return (
		<div 
			onClick={onClick} 
			className={`add-button-container ${className} ${disableNewBlock ? 'disable' : ''}`}
		>
			<div className="add-button">
				<span className="add-button__line add-button__line--vertical"></span>
				<span className="add-button__line add-button__line--horizontal"></span>
			</div>	
		</div>
	);
}

export default AddButton;