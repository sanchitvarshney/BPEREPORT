import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Search from './Search';
import Profile from './Profile';
import MobileSection from './MobileSection';
import DownloadIndecator from '../../../../shared/DownloadIndecator';
export default function HeaderContent() {
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <>
      {!downLG && <Search />}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}

      
      {<div className="download">
              <DownloadIndecator />
            </div>}
      {!downLG && <Profile />}
      {downLG && <MobileSection />}
    </>
  );
}
