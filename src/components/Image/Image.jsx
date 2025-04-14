import './Image.scss';

function Image({ src, className }) {

return (
	<img src={src} className={`image ${className}` } alt="Моё фото" />

);
}

export default Image;