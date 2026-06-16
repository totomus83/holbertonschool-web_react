import { getCurrentYear, getFooterCopy } from '../utils/utils';

function Footer() {
  const currentYear = getCurrentYear();
  const footerText = getFooterCopy(true);

  return (
    <div className="App-footer text-center italic fixed bottom-0 w-full border-t-2 border-(--main-color) max-[520px]:text-sm max-[520px]:p-2">
      <p>
        Copyright {currentYear} - {footerText}
      </p>
    </div>
  );
}

export default Footer;