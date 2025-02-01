import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Grid, Stack, InputLabel, OutlinedInput, FormHelperText, InputAdornment, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { sendVerificationCodeAsync, resetPasswordAsync } from 'features/auth/authSlice';
import { showToast } from 'utils/ToastProvider';
import { useNavigate } from 'react-router';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
export default function AuthForgotPassword() {
  const dispatch = useDispatch();
  const { resetPasswordLoading, sendVarificationcodeloading } = useSelector((state) => state.auth);
  const [step, setStep] = useState(1); // Step 1: Enter email, Step 2: Enter verification & new password
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleSendCode = async (values, { setSubmitting, setErrors }) => {
    try {
      dispatch(sendVerificationCodeAsync({ emailId: values.email })).then((response) => {
        if (response.payload?.data.success) {
          setStep(2);
          showToast('Verification code sent successfully', 'success');
        } else {
          showToast(response.payload.message, 'error');
        }
      });
    } catch (error) {
      setErrors({ submit: 'Failed to send verification code. Try again.' });
    } finally {
      setSubmitting(false);
    }
  };
  const handleResetPassword = async (values, { setSubmitting, setErrors }) => {
    try {
      dispatch(resetPasswordAsync({ emailId: values.email, otp: values.code, password: values.newPassword })).then((response) => {
        if (response.payload?.data?.success) {
          showToast('Password reset successful', 'success');
          navigate('/login');
        } else {
          showToast(response.payload.message, 'error');
        }
      });
    } catch (error) {
      setErrors({ submit: 'Failed to reset password. Try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: '', code: '', newPassword: '', confirmPassword: '', submit: null }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        ...(step === 2 && {
          code: Yup.string().required('Verification code is required'),
          newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('New password is required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .required('Confirm password is required')
        })
      })}
      onSubmit={step === 1 ? handleSendCode : handleResetPassword}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="email">Username</InputLabel>
                <OutlinedInput
                  id="email"
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter User"
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                />
              </Stack>
              {touched.email && errors.email && <FormHelperText error>{errors.email}</FormHelperText>}
            </Grid>

            {step === 2 && (
              <>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="code">Verification Code</InputLabel>
                    <OutlinedInput
                      id="code"
                      type="text"
                      value={values.code}
                      name="code"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter verification code"
                      fullWidth
                      error={Boolean(touched.code && errors.code)}
                    />
                  </Stack>
                  {touched.code && errors.code && <FormHelperText error>{errors.code}</FormHelperText>}
                </Grid>

                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="newPassword">New Password</InputLabel>
                    <OutlinedInput
                      id="newPassword"
                      type={showPassword ? 'text' : 'password'}
                      value={values.newPassword}
                      name="newPassword"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Enter new password"
                      fullWidth
                      error={Boolean(touched.newPassword && errors.newPassword)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </Stack>
                  {touched.newPassword && errors.newPassword && <FormHelperText error>{errors.newPassword}</FormHelperText>}
                </Grid>

                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                    <OutlinedInput
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={values.confirmPassword}
                      name="confirmPassword"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Confirm new password"
                      fullWidth
                      error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                            {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </Stack>
                  {touched.confirmPassword && errors.confirmPassword && <FormHelperText error>{errors.confirmPassword}</FormHelperText>}
                </Grid>

                <Grid item xs={12}>
                  <LoadingButton
                    type="button"
                    loading={sendVarificationcodeloading}
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      dispatch(sendVerificationCodeAsync({ emailId: values.email })).then((response) => {
                        if (response.payload?.data.success) {
                          setStep(2);
                          showToast('Verification code sent successfully', 'success');
                        } else {
                          showToast(response.payload.message, 'error');
                        }
                      });
                    }}
                  >
                    Resend Verification Code
                  </LoadingButton>
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <LoadingButton
                loading={sendVarificationcodeloading || resetPasswordLoading}
                disableElevation
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="primary"
              >
                {step === 1 ? 'Send Verification Code' : 'Reset Password'}
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}
