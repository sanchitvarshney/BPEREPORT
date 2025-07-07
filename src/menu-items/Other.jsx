import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import SyncProblemOutlinedIcon from '@mui/icons-material/SyncProblemOutlined';
import Battery3BarOutlinedIcon from '@mui/icons-material/Battery3BarOutlined';
const icons = {
  ReportOutlinedIcon,
  SyncProblemOutlinedIcon,
  Battery3BarOutlinedIcon
};
const Other = {
  id: 'other',
  title: 'Others',
  type: 'group',
  children: [
    {
      id: 'battery-qc-report',
      title: 'Battery QC Report',
      type: 'item',
      url: '/battery-qc-report',
      icon: icons.Battery3BarOutlinedIcon,
      target: false,
      breadcrumbs: false
    },
    {
      id: 'rejection-report',
      title: 'Rejection Report',
      type: 'item',
      url: '/rejection-report',
      icon: icons.ReportOutlinedIcon,
      target: false,
      breadcrumbs: false
    },
    {
      id: 'bpe-issue',
      title: 'BPe Issue',
      type: 'item',
      url: '/bpe-issue',
      icon: icons.SyncProblemOutlinedIcon,
      target: false,
      breadcrumbs: false
    },
    {
      id: 'pre-qc-report',
      title: 'Pre QC Report',
      type: 'item',
      url: '/pre-qc-report',
      icon: icons.SyncProblemOutlinedIcon,
      target: false,
      breadcrumbs: false
    }
  ]
};

export default Other;
