import PropTypes from 'prop-types';
import { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import { useDispatch } from 'react-redux';
import { logout } from 'features/auth/authSlice';
export default function ProfileTab() {
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
      <ListItemButton onClick={() => dispatch(logout())} selected={selectedIndex === 2}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
}

ProfileTab.propTypes = { handleLogout: PropTypes.func };
