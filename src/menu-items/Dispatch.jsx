import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
const icons = {
  WarehouseOutlinedIcon
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
    }
  ]
};

export default Dispatch;
