import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Badge, IconButton } from '@mui/material';
import FileDownloadSharpIcon from '@mui/icons-material/FileDownloadSharp';
import React, { useEffect } from 'react';
import Link from '@mui/material/Link';
import DownloadIcon from '@mui/icons-material/Download';
import { useSocketContext } from '../contexts/SocketContext';
import ProgressWithParcentage from '../reusable/ProgressWithParcentage';
import Tooltip from '@mui/material/Tooltip';
import { ScrollArea } from '../components/ui/scroll-area';
import { showToast } from 'utils/ToastProvider';

const DownloadIndecator = () => {
  const { onDownloadReport, off, onnotification } = useSocketContext();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notification, setNotification] = React.useState([]); // Ensure it starts as an array
  const [progress, setProgress] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
    const handlenotification = (data) => {
      if (Array.isArray(data)) {
        setNotification(data);
      } else {
        console.error('Expected an array but got:', data);
      }
    };

    onnotification(handlenotification);
    return () => off('socket_receive_notification');
  }, [onnotification]);

  useEffect(() => {
    const handleDownloadReport = (data) => {
      setProgress(data);
      if (Number(data.percent) === 100) {
        showToast('Download completed', 'success');
      }
    };

    onDownloadReport(handleDownloadReport);
    return () => off('progress');
  }, [onDownloadReport]);

  return (
    <>
      <Tooltip title="Download" placement="bottom">
        <IconButton
          sx={{
            color: open ? 'black' : '#525252',
            p: '12px',
            background: open ? '#e5e5e5' : '',
            border: 'none',
            borderRadius: 0
          }}
          aria-describedby={id}
          onClick={handleClick}
          aria-label="delete"
        >
          <Badge badgeContent={notification?.length} color="warning">
            <FileDownloadSharpIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{
          sx: {
            border: 'none',
            borderTopRightRadius: 0,
            boxShadow: 2,
            width: '380px', // Adjust width of the popover
            padding: '8px'
          }
        }}
      >
        <div className="bg-neutral-100 p-3 rounded-md">
          <div className="flex justify-between items-center">
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Downloads
            </Typography>
            <Link
              component="button"
              variant="body2"
              sx={{ color: '#007bff', cursor: 'pointer' }}
              onClick={() => {
                console.info('Clear All Clicked');
                setNotification([]); // Clear all notifications
              }}
            >
              Clear All
            </Link>
          </div>
          <div className="bg-white rounded-md mt-2">
            <ScrollArea className="w-full h-[300px] p-2 pr-3 overflow-auto">
              {Array.isArray(notification) &&
                notification?.map((item, index) => (
                  <div key={index} className="w-full p-2 border-b border-gray-300 mb-2 rounded-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <Typography variant="body2" sx={{ fontSize: '14px', fontWeight: '500' }}>
                          {item.req_code}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'gray', fontSize: '12px' }}>
                          {item.insert_date}
                        </Typography>
                      </div>
                      {item.status === 'complete' && item.msg_type === 'file' && (
                        <IconButton
                          size="small"
                          color="primary"
                               onClick={() => {
                          const baseUrl =
                            import.meta.env.VITE_SOCKET_URL?.replace(/:\d+$/, "");
                          const fileUrl = JSON.parse(item.other_data)?.fileUrl;

                      
                          const finalUrl = new URL(fileUrl, baseUrl).href;

                          window.open(
                            finalUrl,
                            "_blank",
                            "noopener,noreferrer",
                          );
                        }}
                        >
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                      )}
                    </div>
                    {item.status !== 'complete' && (
                      <ProgressWithParcentage
                        value={item.reactNotificationId === progress?.notificationId ? parseInt(progress?.percent) : 0}
                      />
                    )}
                  </div>
                ))}
            </ScrollArea>
          </div>
        </div>
      </Popover>
    </>
  );
};

export default DownloadIndecator;
