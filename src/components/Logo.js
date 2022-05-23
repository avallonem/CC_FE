import React from 'react';

const Logo = (props) => {
  return (
    <img
      alt="Logo"
      src="/static/cclogo.png"
      width="180"
      {...props}
    />
  );
};

export default Logo;
