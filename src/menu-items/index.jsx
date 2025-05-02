import dashboard from './dashboard';
import Device from './Device';
import Component from './Component';
import Dispatch from './Dispatch';
import IMEIWiseConst from './IMEIWiseConst';
import other from 'menu-items/Other';
import swipe from './Swipe';

const menuItems = {
  items: [dashboard, Device, Component, Dispatch,IMEIWiseConst,other,swipe]
};

export default menuItems;
