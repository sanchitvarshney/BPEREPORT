import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

const icons = {
  WarehouseOutlinedIcon,
  LocalShippingOutlinedIcon
};
const Dispatch = {
  id: 'device',
  title: 'Dispatch',
  type: 'group',
  children: [
    {
      id: 'total-dispatch-device',
      title: 'FG & Dispatches',
      type: 'item',
      url: '/total-dispatch-device',
      icon: icons.WarehouseOutlinedIcon,
      target: false,
      breadcrumbs: false
    },
    {
      id: 'dispatch-report',
      title: 'Dispatch Report',
      type: 'item',
      url: '/dispatch-report',
      icon: icons.LocalShippingOutlinedIcon,
      target: false,
      breadcrumbs: false
    }
  ]
};

export default Dispatch;
