// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';
import OnDeviceTrainingOutlinedIcon from '@mui/icons-material/OnDeviceTrainingOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DisplaySettingsOutlinedIcon from '@mui/icons-material/DisplaySettingsOutlined';
// icons
const icons = {
  LoginOutlined,
  ProfileOutlined,
  OnDeviceTrainingOutlinedIcon,
  DashboardOutlinedIcon,
  LocationOnOutlinedIcon,
  DisplaySettingsOutlinedIcon
};
const Component = {
  id: 'component',
  title: 'Component',
  type: 'group',
  children: [
    {
      id: 'total-material-in-company',
      title: 'Components In Warehouse',
      type: 'item',
      url: '/total-material-in-company',
      icon: icons.DashboardOutlinedIcon,
      target: false,
      breadcrumbs: false
    },
    {
      id: 'total-material-in-bpe-company',
      title: 'Components In BPe',
      type: 'item',
      url: '/total-material-in-bpe',
      icon: icons.DashboardOutlinedIcon,
      target: false,
      breadcrumbs: false
    },
    {
      id: 'total-material-in-msc-company',
      title: 'Components In MsC',
      type: 'item',
      url: '/total-material-in-msc',
      icon: icons.DashboardOutlinedIcon,
      target: false,
      breadcrumbs: false
    },
    {
      id:'component-used',
      title: 'Component Used',
      type: 'item',
      url: '/component-used',
      icon: icons.DisplaySettingsOutlinedIcon,
      target: false,
      breadcrumbs: false
    }
  ]
};

export default Component;
