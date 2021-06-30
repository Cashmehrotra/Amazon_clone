import React from 'react'
import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
function Header() {
    const history=useHistory();
    const [{basket,user},dispatch]=useStateValue();
    const handleAuthentication = () => {
        if(user){
            auth.signOut();
            history.push('/');
        }
    }
    return (
        <div className="header">
            <div className="header-logo">

            <Link to="/">
            <img className="header-image" 
            src="https://sguru.org/wp-content/uploads/2018/02/amazon_logo_RGB.jpg" />
            </Link>
                
            </div>
            <div className="header-input">
                <input placeholder="Search" type="text"></input>
                <div className="header_searchicon"><SearchIcon/></div>
            </div>
            <div  className="header-option">
                <div className="wow"><AccountCircleIcon/></div>
                <Link to={!user && "/login"}>
                <div onClick={handleAuthentication} className="header-option1">

                   <div className="h-op1-1">
                     Hello {user ? user?.email:'Guest'}
                   </div>
                   <div  className="h-op1-2">
                        {user ? 'Sign Out':'Sign In'}
                   </div>
                </div>
                </Link>
                <Link to={user ? '/orders':'/Login'}>
                <div className="header-option1">
                    <div className="h-op1-1">
                        Returns
                    </div>
                    <div className="h-op1-2">
                        & Orders
                    </div>
                </div>
                </Link>
                
                <div className="header-option1">
                    <div className="h-op1-1">
                        Your
                    </div>
                    <div className="h-op1-2">
                        Prime
                    </div>
                </div>
                <Link to={user ? "/checkout":"/Login"}>
                  <div className="header-basket">
                    <div className="header-shopbasket"><ShoppingBasketIcon/></div>
                    <div className="header-basket-count">{user? basket?.length:0}</div>
                    
                  </div>
                </Link>

            </div>
        </div>
    )
}

export default Header
