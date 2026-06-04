import { getCurrentYear, getFooterCopy } from '../utils/utils';

function Footer() {
  const currentYear = getCurrentYear();
  const footerText = getFooterCopy(true);
  return (
    <div className='App-footer text-center italic fixed bottom-0 w-full border-t-2 border-(--main-color)'>
      <p>Copyright {currentYear} - {footerText}</p>
    </div>
  );
}

export default Footer;