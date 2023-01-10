import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const onAboutClick = () => {
    navigate('/about');
  };

  return (
    <h1>
      <ul>
        <li>
          <Link to={'/'}>Home</Link>
        </li>
        <li>
          <button onClick={onAboutClick}>About</button>
        </li>
      </ul>
    </h1>
  );
};

export default Header;
