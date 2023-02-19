// @ts-nocheck
import styles from './sidenav.module.css';

import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

import { useEffect, useState } from 'react';
import React from 'react';
import { useSelector } from 'react-redux';
import jwt from 'jwt-decode';

import { navData } from 'lib/navData';
import { NavLink } from 'react-router-dom';

export default function Sidenav() {
  const [open, setopen] = useState(true);
  const [menuList, setMenuList] = useState([]);
  const isLoggedIn = useSelector((state) => state.authenticate.isLoggedIn);
  {
    menuList;
  }
  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem('token');
      const data = jwt(token);
      setMenuList(data.menuList); //add Home
    } else {
      setMenuList(['Home']);
    }
  }, [isLoggedIn]);
  const toggleOpen = () => {
    setopen(!open);
  };

  return (
    <div className={`${open ? styles.sidenav : styles.sidenavClosed} sidebar`}>
      <button className={styles.menuBtn} onClick={toggleOpen}>
        {open ? <KeyboardDoubleArrowLeftIcon /> : <KeyboardDoubleArrowRightIcon />}
      </button>
      {/* 
      {SidebarData.map((item, index) => {
        return <SubMenu item={item} key={index} />;
      })} */}
      <br />
      <br />

      {navData
        .filter((m) => menuList.includes(m.name))
        .map((item) => {
          return (
            <NavLink key={item.id} className={styles.sideitem} to={item.link}>
              {item.icon}
              <span className={styles.linkText}>{item.text}</span>
            </NavLink>
          );
        })}
    </div>
  );
}
