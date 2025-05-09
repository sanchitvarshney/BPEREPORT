import { useState } from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';

import NavItem from './NavItem';
import NavCollapse from './NavCollapse';
import { useGetMenuMaster } from 'api/menu';

export default function NavGroup({ item }) {
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const [openMenuId, setOpenMenuId] = useState(null); // For top-level collapses

  const navCollapse = item.children?.map((menuItem) => {
    switch (menuItem.type) {
      case 'collapse':
        return (
          <NavCollapse
            key={menuItem.id}
            menu={menuItem}
            level={1}
            openMenuId={openMenuId}
            setOpenMenuId={setOpenMenuId}
          />
        );
      case 'item':
        return <NavItem key={menuItem.id} item={menuItem} level={1} />;
      default:
        return (
          <Typography key={menuItem.id} variant="h6" color="error" align="center">
            Fix - Group Collapse or Items
          </Typography>
        );
    }
  });

  return (
    <List
      sx={{
        mb: drawerOpen ? 1.5 : 0,
        py: 0,
        zIndex: 0
      }}
    >
      {navCollapse}
    </List>
  );
}

NavGroup.propTypes = { item: PropTypes.object };
