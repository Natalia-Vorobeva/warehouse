import './Footer.scss';

function Footer({ onClick }) {

return (
<div className="footer">
	<p className="footer__link-to-dev" onClick={onClick}>© 2025 Воробьёва корпорэйшион</p> 
</div>
);
}

export default Footer;