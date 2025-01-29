// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';
import OnDeviceTrainingOutlinedIcon from '@mui/icons-material/OnDeviceTrainingOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
// icons
const icons = {
  LoginOutlined,
  ProfileOutlined,
  OnDeviceTrainingOutlinedIcon,
  DashboardOutlinedIcon,
  LocationOnOutlinedIcon
};
const pages = {
  id: 'pages',
  title: 'Pages',
  type: 'group',
  children: [
    {
      id: 'total-device-in-company',
      title: 'Total Device In Company',
      type: 'item',
      url: '/total-device-in-company',
      icon: icons.OnDeviceTrainingOutlinedIcon,
      target: false,
      breadcrumbs: true
    },
    {
      id: 'devices-on-locaton',
      title: 'Devices On Locaton',
      type: 'item',
      url: '/total-device-in-company-locations',
      icon: icons.LocationOnOutlinedIcon,
      target: false,
      breadcrumbs: true
    },
    {
      id: 'total-material-in-company',
      title: 'Total Material In Company',
      type: 'item',
      url: '/total-material-in-company',
      icon: icons.DashboardOutlinedIcon,
      target: false,
      breadcrumbs: true
    }
  ]
};

export default pages;
