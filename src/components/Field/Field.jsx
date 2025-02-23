// import { useState, useEffect } from 'react'

import FieldElement from '../FieldElement/FieldElement';

import './Field.scss';
import Form from '../Form/Form';
import Grid from '../Grid/Grid';

function Field({ devMode }) {

	// const layout = [
	// 	{ i: "a", x: 0, y: 0, w: 2, h: 1 },
	// 	{ i: "b", x: 2, y: 0, w: 2, h: 1 },
	// 	{ i: "c", x: 4, y: 0, w: 2, h: 1 },
	// 	{ i: "d", x: 6, y: 0, w: 2, h: 1 },
	// 	{ i: "e", x: 0, y: 2, w: 2, h: 1 }
	// ];



	return (
		<div className="field">
			{
				!devMode
					?
					<div className="field__user">
						<FieldElement className="field__acceptance" text="Приемка" />

						<div className="field__warehouse">
							<FieldElement className="field__placement" text="Размещение" />
							<FieldElement className="field__unformatted" text="Негабарит" />
						</div>
					</div>
					:
					<div className="field__dev">
						<Grid />
					</div>
			}
			
		</div >
	);
}

export default Field;