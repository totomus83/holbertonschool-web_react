import { useContext } from "react";
import newContext from '../Context/context.js';
import { getCurrentYear, getFooterCopy } from '../utils/utils';

function Footer() {
  const contextValue = useContext(newContext);
  const currentYear = getCurrentYear();
  const footerText = getFooterCopy(true);
  return (
    <div className='App-footer text-center italic text-sm md:text-base border-t border-t-[2.5px] border-t-[var(--main-color)] mt-auto pb-8 pt-4'>
      <p>Copyright {currentYear} - {footerText}</p>
      {contextValue.user.isLoggedIn && (
        <p><a href="#">Contact us</a></p>
      )}
    </div>
  )
}

export default Footer;
