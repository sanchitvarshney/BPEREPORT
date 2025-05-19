import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

const icons = {
  WarehouseOutlinedIcon,
  LocalShippingOutlinedIcon
};
const SwipeDispatch = {
  id: 'device',
  title: 'Dispatch',
  type: 'group',
  children: [
    {
      id: 'total-dispatch-swipe-device',
      title: 'FG & Dispatches',
      type: 'item',
      url: '/total-dispatch-swipe-device',
      icon: icons.WarehouseOutlinedIcon,
      target: false,
      breadcrumbs: false
    },
    {
      id: 'dispatch-report-swipe-device',
      title: 'Dispatch Report',
      type: 'item',
      url: '/dispatch-report-swipe-device',
      icon: icons.LocalShippingOutlinedIcon,
      target: false,
      breadcrumbs: false
    }
  ]
};

export default SwipeDispatch;
