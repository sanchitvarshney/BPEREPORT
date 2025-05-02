import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import SyncProblemOutlinedIcon from '@mui/icons-material/SyncProblemOutlined';
import Battery3BarOutlinedIcon from '@mui/icons-material/Battery3BarOutlined';
import DockOutlinedIcon from '@mui/icons-material/DockOutlined';
const icons = {
  ReportOutlinedIcon,
  SyncProblemOutlinedIcon,
  Battery3BarOutlinedIcon,
  DockOutlinedIcon
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
    // {
    //   id: 'rejection-report',
    //   title: 'Rejection Report',
    //   type: 'item',
    //   url: '/rejection-report',
    //   icon: icons.ReportOutlinedIcon,
    //   target: false,
    //   breadcrumbs: false
    // },
    // {
    //   id: 'bpe-issue',
    //   title: 'BPe Issue',
    //   type: 'item',
    //   url: '/bpe-issue',
    //   icon: icons.SyncProblemOutlinedIcon,
    //   target: false,
    //   breadcrumbs: false
    // }
  ]
};

export default Other;
