import React from 'react';

const CustomSwitch = ({ children }) => {
  const childrenArray = React.Children.toArray(children);

  for (let i = 0; i < childrenArray.length; i++) {
    const child = childrenArray[i];
    if (child.props.path === window.location.pathname) {
      return child;
    }
  }

  return null;
};

export default CustomSwitch;
