// @ts-nocheck
import { Menu, MenuItem, IconButton } from '@mui/material';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import React, { useState, useEffect } from 'react';

import './navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { logoutThunk } from 'store/authenticate/thunk';
import { useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';

// const AppBar = styled('div')(() => ({
//   height: '50px',
//   position: 'relative',
//   gridArea: 'header',
//   backgroundColor: '#013501'
// }));

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const { isLoggedIn } = useSelector((state) => ({
    isLoggedIn: state.authenticate.isLoggedIn
  }));

  useEffect(() => {
    if (isLoggedIn) {
      setShow(false);
    }
  }, [isLoggedIn]);
  const open = anchorEl ? true : false;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [show, setShow] = useState(false);
  return (
    <div className={'header'}>
      <IconButton className="login-button" aria-label="profile" onClick={handleClick}>
        <AccountCircleIcon
          fontSize="large"
          color="primary"
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ fontSize: '12px' }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}>
        {isLoggedIn ? (
          <div>
            <MenuItem onClick={() => {}}>Change Password</MenuItem>
            <MenuItem
              onClick={() => {
                dispatch(logoutThunk());
                handleClose();
                navigate('/home');
                localStorage.removeItem('token');
              }}>
              Logout
            </MenuItem>
          </div>
        ) : (
          <MenuItem
            onClick={() => {
              setShow(true);
              handleClose();
            }}>
            Login
          </MenuItem>
        )}
      </Menu>

      <LoginModal show={show} onClose={() => setShow(false)} />
    </div>
  );
}
