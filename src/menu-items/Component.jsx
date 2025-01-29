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
const Component = {
  id: 'component',
  title: 'Component',
  type: 'group',
  children: [
   
    {
      id: 'total-material-in-company',
      title: 'Total Material In Company',
      type: 'item',
      url: '/total-material-in-company',
      icon: icons.DashboardOutlinedIcon,
      target: false,
      breadcrumbs: false
    }
  ]
};

export default Component;
