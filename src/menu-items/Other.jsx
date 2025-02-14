import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import SyncProblemOutlinedIcon from '@mui/icons-material/SyncProblemOutlined';
const icons = {
  ReportOutlinedIcon,
  SyncProblemOutlinedIcon
};
const Other = {
  id: 'other',
  title: 'Others',
  type: 'group',
  children: [
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
    }
  ]
};

export default Other;
