import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather';
import NavItem from './NavItem';
import keycloak from 'src/';


const user = {
  avatar: '/static/images/avatars/index.jpeg',
  jobTitle: 'User',
  name: 'User'
};

function getRole ()  {
  if(keycloak.hasRealmRole('Customer')){return 'Customer';}
  if(keycloak.hasRealmRole('Provider')){return 'Provider';}
  else return 'NoRole';
  }

function items (){
   if(keycloak.hasRealmRole('Customer')){ return [
  {
    href: '/financial/dashboard',
    icon: BarChartIcon,
    title: 'Wallet'
  },
   {
    href: '/financial/products',
    icon: ShoppingBagIcon,
    title: 'Subscribed Funds'
  },
  {
    href: '/financial/customers',
    icon: ShoppingBagIcon,
    title: 'Available Funds'
  },
 
];
}
else if(keycloak.hasRealmRole('Provider')){
  return [
    {
      href: '/financial/dashboard',
      icon: BarChartIcon,
      title: 'Financial Provider Dashboard'
    },
    
   
  ];
}

else {
  return [];
}}
const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));


const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/financial/account"
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {keycloak.idTokenParsed.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {getRole()}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items().map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
      
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
