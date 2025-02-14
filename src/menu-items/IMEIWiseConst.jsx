import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
const icons = {
  AccountTreeOutlinedIcon
};
const IMEIWiseConst = {
  id: 'device',
  title: 'IMEI wise cons Report',
  type: 'group',
  children: [
    {
      id: 'assembly-consumption',
      title: 'Assembely Consumption',
      type: 'item',
      url: '/assembly-consumption',
      icon: icons.AccountTreeOutlinedIcon,
      target: false,
      breadcrumbs: false
    }
  ]
};

export default IMEIWiseConst;
