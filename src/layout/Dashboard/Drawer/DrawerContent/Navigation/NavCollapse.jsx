import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// project import
import NavItem from './NavItem';
import { useGetMenuMaster } from 'api/menu';

export default function NavCollapse({ menu, level }) {
  const theme = useTheme();
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const Icon = menu.icon;
  const menuIcon = menu.icon ? <Icon style={{ fontSize: drawerOpen ? '1rem' : '1.25rem' }} /> : false;

  const menuCollapse = menu.children?.map((item) => {
    switch (item.type) {
      case 'collapse':
        return <NavCollapse key={item.id} menu={item} level={level + 1} />;
      case 'item':
        return <NavItem key={item.id} item={item} level={level + 1} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return (
    <>
      <ListItemButton
        sx={{
          mb: 0.5,
          alignItems: 'flex-start',
          backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
          py: level > 1 ? 0.5 : 0.75, // Further reduced padding
          pl: `${level * 8}px`, // Further reduced left padding
          '&:hover': {
            bgcolor: 'primary.lighter'
          },
          '&.Mui-selected': {
            bgcolor: 'primary.lighter',
            borderRight: `2px solid ${theme.palette.primary.main}`,
            color: 'primary.main',
            '&:hover': {
              color: 'primary.main',
              bgcolor: 'primary.lighter'
            }
          }
        }}
        onClick={handleClick}
      >
        <ListItemIcon sx={{ my: 'auto', minWidth: !menu.icon ? 16 : 32 }}>{menuIcon}</ListItemIcon>
        <ListItemText
          primary={
            <Typography 
              variant={open ? 'h5' : 'body1'} 
              color="inherit" 
              sx={{ 
                my: 'auto',
                fontSize: '0.875rem'
              }}
            >
              {menu.title}
            </Typography>
          }
          secondary={menu.caption && (
            <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
              {menu.caption}
            </Typography>
          )}
        />
        {open ? (
          <KeyboardArrowDownIcon sx={{ fontSize: '1rem', ml: 0.5 }} />
        ) : (
          <KeyboardArrowRightIcon sx={{ fontSize: '1rem', ml: 0.5 }} />
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0.25,
              bgcolor: 'background.default',
              borderLeft: `1px solid ${theme.palette.divider}`,
              ml: 1 // Further reduced margin
            }}
          >
            {menuCollapse}
          </Box>
        </List>
      </Collapse>
    </>
  );
}

NavCollapse.propTypes = {
  menu: PropTypes.object,
  level: PropTypes.number
};
