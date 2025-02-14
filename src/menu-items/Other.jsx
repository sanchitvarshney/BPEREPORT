import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
const icons = {
  ReportOutlinedIcon
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
    }
  ]
};

export default Other;
