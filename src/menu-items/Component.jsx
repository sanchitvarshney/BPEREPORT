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
      title: 'Total Component In Warehouse',
      type: 'item',
      url: '/total-material-in-company',
      icon: icons.DashboardOutlinedIcon,
      target: false,
      breadcrumbs: false
    },
    {
      id: 'total-material-in-bpe-company',
      title: 'Total Component In BPE',
      type: 'item',
      url: '/total-material-in-bpe',
      icon: icons.DashboardOutlinedIcon,
      target: false,
      breadcrumbs: false
    },
    {
      id: 'total-material-in-msc-company',
      title: 'Total Component In MSC',
      type: 'item',
      url: '/total-material-in-msc',
      icon: icons.DashboardOutlinedIcon,
      target: false,
      breadcrumbs: false
    }
  ]
};

export default Component;
