import dashboard from './dashboard';
import Device from './Device';
import Component from './Component';
import Dispatch from './Dispatch';
import IMEIWiseConst from './IMEIWiseConst';
import other from 'menu-items/Other';
import swipe from './Swipe';
import SwipeDispatch from './SwipeDispatch';
import { menuIcons } from './icons';
import SwipeLocation from './SwipeLocation';
import OnDeviceTrainingOutlinedIcon from '@mui/icons-material/OnDeviceTrainingOutlined';

const menuItems = {
  items: [
    {
      id: 'soundbox',
      title: 'Soundbox',
      type: 'group',
      children: [
        {
          id: 'soundbox-section',
          title: 'Soundbox',
          type: 'collapse',
          icon: menuIcons.soundbox,
          children: [
            {
              id: 'soundbox-dashboard',
              title: 'Dashboard',
              type: 'item',
              url: '/dashboard',
              icon: dashboard.children[0].icon,
              breadcrumbs: false
            },
            {
              id: 'device-section',
              title: 'Device',
              type: 'collapse',
              icon:  Device.children[0].icon,
              children: Device.children
            },
            {
              id: 'component-section',
              title: 'Component',
              type: 'collapse',
              icon: Component.children[0].icon,
              children: Component.children
            },
            {
              id: 'dispatch-section',
              title: 'Dispatch',
              type: 'collapse',
              icon: Dispatch.children[0].icon,
              children: Dispatch.children
            },
            {
              id: 'imei-section',
              title: 'IMEI Reports',
              type: 'collapse',
              icon: IMEIWiseConst.children[0].icon,
              children: IMEIWiseConst.children
            },
            {
              id: 'other-section',
              title: 'Others',
              type: 'collapse',
              icon: other.children[0].icon,
              children: other.children
            }
          ]
        }
      ]
    },
    {
      id: 'swipedevice',
      title: 'Swipe Device',
      type: 'group',
      children: [
        {
          id: 'swipeDevice-section',
          title: 'Swipe Device',
          type: 'collapse',
          icon: menuIcons.swipeDevice,
          children: [
            {
              id: 'swipe-section',
              title: 'Swipe Reports',
              type: 'collapse',
              icon: swipe.children[0].icon,
              children: swipe.children
            },
            {
              id: 'swipe-device-section',
              title: 'Device',
              type: 'collapse',
              icon: OnDeviceTrainingOutlinedIcon,
              children: SwipeLocation.children
            },
            {
              id: 'swipe-dispatch-section',
              title: 'Dispatch',
              type: 'collapse',
              icon: SwipeDispatch.children[0].icon,
              children: SwipeDispatch.children
            }
          ]
        }
      ]
    }
  ]
};

export default menuItems;
