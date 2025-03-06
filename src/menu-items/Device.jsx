import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';
import OnDeviceTrainingOutlinedIcon from '@mui/icons-material/OnDeviceTrainingOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AdUnitsOutlinedIcon from '@mui/icons-material/AdUnitsOutlined';
const icons = {
  LoginOutlined,
  ProfileOutlined,
  OnDeviceTrainingOutlinedIcon,
  DashboardOutlinedIcon,
  LocationOnOutlinedIcon,
  AdUnitsOutlinedIcon
};
const Device = {
  id: 'device',
  title: 'Device',
  type: 'group',
  children: [
    {
      id: 'total-device-in-company',
      title: 'Devices In Warehouse',
      type: 'item',
      url: '/total-device-in-company',
      icon: icons.OnDeviceTrainingOutlinedIcon,
      target: false,
      breadcrumbs: false
    },
    {
      id: 'devices-on-locaton',
      title: 'Devices At Locaton',
      type: 'item',
      url: '/total-device-at-company-locations',
      icon: icons.LocationOnOutlinedIcon,
      target: false,
      breadcrumbs: false
    },
{
      id: 'ber-details',
      title: 'BER Devices',
      type: 'item',
      url: '/ber-details',
      icon: icons.AdUnitsOutlinedIcon,
      target: false,
      breadcrumbs: false
    }
  ]
};

export default Device;
