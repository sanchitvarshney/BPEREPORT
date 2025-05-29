import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import DisplaySettingsOutlinedIcon from '@mui/icons-material/DisplaySettingsOutlined';

const icons = {
  AccountTreeOutlinedIcon,
  DisplaySettingsOutlinedIcon,
};
const SwipeIMEIReport = {
  id: 'device',
  title: 'IMEI wise cons Report',
  type: 'group',
  children: [
    {
      id: 'assembly-consumption',
      title: 'Assembly Consumption',
      type: 'item',
      url: '/swipe-assembly-consumption',
      icon: icons.AccountTreeOutlinedIcon,
      target: false,
      breadcrumbs: false
    },
  ]
};

export default SwipeIMEIReport;
