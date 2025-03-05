import React, { useEffect, useState } from 'react';
import { useUser } from 'hooks/useUser';
import { useSelector, useDispatch } from 'react-redux';
import { verifyOtpAsync, getQRStatus } from 'features/auth/authSlice';
import { showToast } from 'utils/ToastProvider';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import CircularProgress from '@mui/material/CircularProgress';
import { LoadingButton } from '@mui/lab';
import Dialog from '@mui/material/Dialog';
import LogoutIcon from '@mui/icons-material/Logout';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OtpModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clearUser, saveUser } = useUser();
  const { qrCodeLoading, qrStatus } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState('');
  const [qrCode, setQrCode] = useState(null);
  const [isShowQr, setIsShowQr] = useState(false);
  const [secretKey, setSecretKey] = useState('');

  useEffect(() => {
    if (qrStatus) {
      setIsShowQr(qrStatus?.qrCode === 'Y');
    }
  }, [qrStatus]);

  useEffect(() => {
    if (qrStatus?.isTwoStep === 'Y') {
      localStorage.setItem('token', qrStatus?.token ?? '');
      dispatch(getQRStatus({ crnId: qrStatus?.token ?? '' })).then((res) => {
        if (res.payload.data.code === 200) {
          setQrCode(res.payload.data.data.url);
          setSecretKey(res.payload.data.data.secret);
        }
      });
    }
  }, [dispatch, qrStatus]);

  const handleOtpSubmit = () => {
    if (!otp) return showToast('Please enter the OTP', 'error');
    dispatch(verifyOtpAsync({ otp, secret: secretKey })).then((res) => {
      if (res.payload.data.success) {
        showToast('OTP Verified Successfully', 'success');
        navigate('/dashboard');
      } else {
        showToast('Invalid OTP, please try again', 'error');
      }
    });
  };

  useEffect(() => {
    if (open) {
      const handleBeforeUnload = (e) => {
        // Clear localStorage before the page reloads
        localStorage.setItem('token', '');
        localStorage.clear();

        // Prevent reload behavior (optional)
        e.preventDefault();
        e.returnValue = '';  // Standard for some browsers
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      // Cleanup event listener when modal is closed
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle className="flex justify-between items-center p-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg shadow-lg">
        <Typography variant="h3" fontWeight={700}>
          Two-Factor Authentication
        </Typography>
        <Button
          onClick={() => {
            localStorage.clear();
            clearUser();
            saveUser(null);
            window.location.reload();
          }}
          className="text-white hover:bg-transparent transition-all duration-300 ease-in-out"
          sx={{
            color: 'red', // Red color for the button
            '&:hover': {
              backgroundColor: 'transparent',
              color: 'darkred',
            },
            position: 'absolute', // Positioned at the right corner
            right: 16, // Pushes the button to the right edge
          }}
        >
          Logout <LogoutIcon />
        </Button>
      </DialogTitle>

      <DialogContent className="px-8 py-6 bg-gray-50 rounded-b-lg shadow-xl" 
      onInteractOutside={(e) => e.preventDefault()}>

        <Typography variant="body1" fontSize={18} className="mb-6 text-gray-800">
          MsCorpres Automation
        </Typography>

        {/* Display QR Code if 2FA is not enabled */}
        {isShowQr && qrCode && (
          <div className="flex justify-center items-center mt-6">
            <img
              src={qrCode}
              alt="QR Code"
              className="w-[250px] h-[250px] rounded-lg shadow-xl border-4 border-indigo-500"
            />
          </div>
        )}

        <Typography variant="body2" fontSize={16} className="mt-4 text-gray-600">
          {!isShowQr
            ? 'Enter the OTP from your authentication app.'
            : 'Scan the QR code with your app to enable 2FA, then enter the OTP.'}
        </Typography>

        {/* OTP input field */}
        <div className="flex flex-col gap-6 mt-8 justify-start items-center">
          <FormControl fullWidth variant="outlined">
            <OutlinedInput
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              autoFocus
              sx={{
                borderRadius: '12px',
                '& .MuiInputBase-input::placeholder': {
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#A0A0A0',
                },
                '& .MuiOutlinedInput-root': {
                  borderColor: '#D1D5DB',
                  '&:hover fieldset': {
                    borderColor: '#4CAF50',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#4CAF50',
                  },
                },
              }}
              placeholder="Enter OTP"
              id="otp-input"
              inputProps={{ maxLength: 6 }}
            />
          </FormControl>

          <LoadingButton
            loading={qrCodeLoading}
            onClick={handleOtpSubmit}
            variant="contained"
            color="primary"
            // className="w-full rounded-full mt-4 py-3 text-lg font-semibold text-white hover:bg-cyan-700 disabled:bg-neutral-300 disabled:text-slate-400 transition-all duration-300 ease-in-out"
            sx={{
                margin: '10px 20px',
                right: 16,
            }}
          >
            {qrCodeLoading ? <CircularProgress size={25} /> : 'Verify OTP'}
          </LoadingButton></div>
      </DialogContent>
    </Dialog>
  );
};

export default OtpModal;
