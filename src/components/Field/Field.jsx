import './Field.scss';

function Field() {

	return (
		<div className="field">
			<div className="field__acceptance">Приемка</div>
			<div className="field__warehouse">
				<div className="field__placement">Размещение</div>
				<div className="field__unformatted">Негабарит</div>
			</div>

		</div>
	);
}

export default Field;