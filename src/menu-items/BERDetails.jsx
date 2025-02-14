import AdUnitsOutlinedIcon from '@mui/icons-material/AdUnitsOutlined';
const icons = {
  AdUnitsOutlinedIcon
};
const BERDetails = {
  id: 'ber-details',
  title: 'BER Details',
  type: 'group',
  children: [
    {
      id: 'ber-details',
      title: 'BER Devices',
      type: 'item',
      url: '/ber-details',
      icon: icons.AdUnitsOutlinedIcon,
      target: false,
      breadcrumbs: false
    }
  ]
};

export default BERDetails;
