import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, FirebaseContext } from '../../store/firebaseContext';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';

function Header() {
  const { user } = useContext(AuthContext);
  const { auth } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut(); 
      navigate('/login'); 
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const handleSellClick = () => {
    navigate('/create');
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search />
          <input type="text" />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car, mobile phone, and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow />
        </div>
        <div className="loginPage">
          <span>{user ? `Welcome ${user.displayName}` : 'Login'}</span>
          <hr />
        </div>
        {user && (
          <span onClick={handleLogout} style={{ cursor: 'pointer' }}>
            Logout
          </span>
        )}
        <div className="sellMenu" onClick={handleSellClick} style={{ cursor: 'pointer' }}>
          <SellButton />
          <div className="sellMenuContent">
            <SellButtonPlus />
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
