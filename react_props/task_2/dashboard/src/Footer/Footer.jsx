import { getCurrentYear, getFooterCopy } from '../utils/utils';
import './Footer.css';

function Footer() {
  const currentYear = getCurrentYear();
  const footerText = getFooterCopy(true);
  return (
    <div className='App-footer'>
      <p>Copyright {currentYear} - {footerText}</p>
    </div>
  )
}

export default Footer;