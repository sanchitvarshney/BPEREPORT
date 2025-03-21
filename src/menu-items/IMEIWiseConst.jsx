import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import DisplaySettingsOutlinedIcon from '@mui/icons-material/DisplaySettingsOutlined';

const icons = {
  AccountTreeOutlinedIcon,
  DisplaySettingsOutlinedIcon,
};
const IMEIWiseConst = {
  id: 'device',
  title: 'IMEI wise cons Report',
  type: 'group',
  children: [
    {
      id: 'assembly-consumption',
      title: 'Assembly Consumption',
      type: 'item',
      url: '/assembly-consumption',
      icon: icons.AccountTreeOutlinedIcon,
      target: false,
      breadcrumbs: false
    },
    {
      id: 'trc-consumption',
      title: 'TRC Consumption',
      type: 'item',
      url: '/trc-consumption',
      icon: icons.DisplaySettingsOutlinedIcon,
      target: false,
      breadcrumbs: false
    }
  ]
};

export default IMEIWiseConst;
