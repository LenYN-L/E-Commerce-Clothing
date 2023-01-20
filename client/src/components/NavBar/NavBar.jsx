import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import logo from "./assets/iconHome.jpeg";
import logoProfile from "./assets/logoProfile.png";
import { LoginButton } from "../Login/Login";
import { LogoutButton } from "../Login/Logout";
import { useAuth0 } from "@auth0/auth0-react";
import { Profile } from "../Login/Profile";
import { faUser } from "@fortawesome/free-regular-svg-icons";
// import {  } from "@fortawesome/free-brands-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { style } from "@mui/system";

const NavBar = () => {
  const path = window.location.pathname;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  const users = useSelector((state) => state.users);
  const cart = useSelector((state) => state.cart);
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/searchResults/${name}`);
    setName("");
  };

  const { user, isAuthenticated } = useAuth0();

  // con el email puedo buscar en la BDD si el usuario es Admin, y hacer un renderizado condicional para mostrar la dashboard
  //   const userEmail = user.email

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbar}>
        <Link className={styles.logo} to="/">
          <img className={styles.logo} src={logo}></img>
        </Link>
        {/* {path !== '/' ? null : <SearchBar></SearchBar>} */}

        <Link className={styles.cart} to="/cart">
          <FontAwesomeIcon className={styles.faCart} icon={faCartShopping}></FontAwesomeIcon>
        </Link>
        {cart.length > 0 && cart.length}

        <div className={styles.login}>
          {isAuthenticated && (
            <Link className={styles.dashboard} to="/admin">
              Dashboard
            </Link>
          )}
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </div>

        <div className={styles.search}>
          <form onSubmit={handleSubmit}>
            <input
              className={styles.searchInput}
              type="text"
              value={name}
              placeholder="Search"
              onChange={(e) => setName(e.target.value)}
            />
            {/* <button disabled={name ? false : true}>🔍</button> */}
          </form>
        </div>

      </div>
    </div>
  );
};

export default NavBar;
