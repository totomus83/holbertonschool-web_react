import HbSLogo from '../assets/holberton-logo.jpg';

function Header() {
  return (
    <div className='App-header flex border-b-2 border-(--main-color)'>
      <img src={HbSLogo} alt="holberton logo" className="w-[15%]" />
      <h1 className="content-center ml-4 text-(--main-color) font-[Arial,Helvetica,sans-serif]">School dashboard</h1>
    </div>
  );
}

export default Header;