import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import SyncProblemOutlinedIcon from '@mui/icons-material/SyncProblemOutlined';
import Battery3BarOutlinedIcon from '@mui/icons-material/Battery3BarOutlined';
import DockOutlinedIcon from '@mui/icons-material/DockOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { LoginOutlined } from '@ant-design/icons';
import OnDeviceTrainingOutlinedIcon from '@mui/icons-material/OnDeviceTrainingOutlined';

const icons = {
  LoginOutlined,
  ReportOutlinedIcon,
  SyncProblemOutlinedIcon,
  Battery3BarOutlinedIcon,
  DockOutlinedIcon,
  DashboardOutlinedIcon,
  LocationOnOutlinedIcon,
  OnDeviceTrainingOutlinedIcon
};
const SwipeLocation = {
  id: 'swipeLocation',
  title: 'Swipe on Location',
  type: 'group',
  children: [
    {
      id: 'swipe-on-location',
      title: 'On Location',
      type: 'item',
      url: '/swipe/total-device-at-company-locations',
      icon: icons.LocationOnOutlinedIcon,
      target: false,
      breadcrumbs: false
    }
    // {
    //   id: 'functional-report',
    //   title: 'Functional Report',
    //   type: 'item',
    //   url: '/swipe-functional-report',
    //   icon: icons.DashboardOutlinedIcon,
    //   target: false,
    //   breadcrumbs: false
    // },
  ]
};

export default SwipeLocation;
