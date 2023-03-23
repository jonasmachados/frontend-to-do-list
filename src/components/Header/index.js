import React, { useState } from "react";
import { AiFillHome, AiFillProject } from 'react-icons/ai';
import { FaBars, FaTimes } from "react-icons/fa";
import './styles.css';

const Header = () => {

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <div className='nav-bar'>
      <div className="hamburger" onClick={handleClick} >
        {click ? (
          <FaTimes size={30} style={{ color: "#f8f8f8" }} />
        ) : (
          <FaBars size={30} style={{ color: "#f8f8f8" }} />
        )}
      </div>

      <div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li>
            <a href="/#"><AiFillHome /> Home</a>
          </li>
          <li>
            <a href="/#"><AiFillProject /> Projetos</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;