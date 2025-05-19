import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import SyncProblemOutlinedIcon from '@mui/icons-material/SyncProblemOutlined';
import Battery3BarOutlinedIcon from '@mui/icons-material/Battery3BarOutlined';
import DockOutlinedIcon from '@mui/icons-material/DockOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
const icons = {
  ReportOutlinedIcon,
  SyncProblemOutlinedIcon,
  Battery3BarOutlinedIcon,
  DockOutlinedIcon,
  DashboardOutlinedIcon,
  LocationOnOutlinedIcon
};
const Other = {
  id: 'other',
  title: 'Others',
  type: 'group',
  children: [
    {
      id: 'device-min',
      title: 'Device Min Report',
          type: 'item',
      url: '/swipe-min-report',
      icon: icons.DockOutlinedIcon,
      target: false,
      breadcrumbs: false
    },
    {
      id: 'functional-report',
      title: 'Functional Report',
      type: 'item',
      url: '/swipe-functional-report',
      icon: icons.DashboardOutlinedIcon,
      target: false,
      breadcrumbs: false
    },
  ]
};

export default Other;
