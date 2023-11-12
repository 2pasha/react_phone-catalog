import { useContext } from 'react';
import cn from 'classnames';
import { NavLinkMain } from '../NavLinkMain/NavLink';
import { NavBar } from '../Navbar/NavBar';
import './Header.scss';
import { CartContext } from '../../context/CartContext';

export const Header = () => {
  const { totalQuantity } = useContext(CartContext);

  return (
    <header className="Header">
      <div className="Header__navigation">
        <NavBar />
      </div>

      <div className="Header__actions">
        <NavLinkMain
          type="favourite"
          to="favourite"
        >
          <img
            src="icons/favourites.svg"
            alt="favourites"
          />
        </NavLinkMain>

        <NavLinkMain
          type="cart"
          to="cart"
        >
          <img
            src="icons/cart.svg"
            alt="favourites"
          />
          <span
            className={cn('Counter', { isActive: !!totalQuantity })}
          >
            {totalQuantity}
          </span>
        </NavLinkMain>
      </div>
    </header>
  );
};
