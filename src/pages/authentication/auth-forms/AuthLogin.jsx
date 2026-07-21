import PropTypes from 'prop-types';
import { useUser } from 'hooks/useUser';
import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAsync, loginUserGoogle } from 'features/auth/authSlice';
import { showToast } from 'utils/ToastProvider';
import ReCAPTCHA from 'react-google-recaptcha';
import OtpModal from 'pages/OtpModal';
import { GoogleLogin } from '@react-oauth/google';
import { consumeReturnTo, DEFAULT_POST_LOGIN_ROUTE } from 'utils/authRedirect';

export default function AuthLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const { clearUser } = useUser();
  const [recaptchaKey, setRecaptchaKey] = React.useState(Math.random());
  const [checked, setChecked] = React.useState(false);
  const [isOtpPage, setIsOtpPage] = React.useState(false); // State for OTP Page visibility
  const [showPassword, setShowPassword] = React.useState(false);
  const [recaptchaValue, setRecaptchaValue] = React.useState(null);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const handleLoginWithGoogle = (googleResponse) => {
    const data = {
      credential: googleResponse.credential
    };
    dispatch(loginUserGoogle(data)).then((response) => {
      if (response.payload?.data?.success) {
        showToast(response.payload?.data?.message, 'success');
        navigate(consumeReturnTo() || DEFAULT_POST_LOGIN_ROUTE, { replace: true });
      } else {
        response.payload?.message
          ? showToast(response.payload?.message, 'error')
          : showToast('Your account has been deactivated for 3hrs due to (3) consecutive unsuccessful attempts', 'error');
      }
    });
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    if (!recaptchaValue) {
      showToast('Please verify the reCAPTCHA', 'error');
      return;
    }
    try {
      const payload = {
        username: values.email,
        password: values.password
      };

      dispatch(loginUserAsync(payload)).then((res) => {
        if (res.payload.data.success) {
          if (res.payload.data.isTwoStep === 'Y') {
            setIsOtpPage(true);
          } else {
            navigate(consumeReturnTo() || DEFAULT_POST_LOGIN_ROUTE, { replace: true });
          }
        } else {
          showToast(res?.payload?.data?.message, 'error');
          setRecaptchaValue(null);
          setRecaptchaKey(Math.random());
        }
      });
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'An error occurred during submission. Please try again.' });
      setSubmitting(false);
    }
  };
  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().required('Username is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={handleSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">Username</InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter Username"
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                </Stack>
                {touched.email && errors.email && (
                  <FormHelperText error id="standard-weight-helper-text-email-login">
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter password"
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.password}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={<Typography variant="h6">Keep me sign in</Typography>}
                  />
                  <Link variant="h6" component={RouterLink} to={'/forgot-password'} color="text.primary">
                    Forgot Password?
                  </Link>
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  {/* <div className="mt-[30px] flex justify-center items-center"> */}
                  <ReCAPTCHA sitekey="6LdmVcArAAAAAOb1vljqG4DTEEi2zP1TIjDd_0wR" onChange={handleRecaptchaChange} key={recaptchaKey} />
                  {/* </div> */}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <AnimateButton>
                  <LoadingButton
                    loading={loading}
                    disableElevation
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Login
                  </LoadingButton>
                </AnimateButton>
              </Grid>{' '}
              {!loading && (
                <Grid item xs={12}>
                  <Typography textAlign={'center'} variant="subtitle2">
                    OR
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12}>
                <div className="flex justify-center w-full items-center ">
                  {!loading && (
                    <>
                      <GoogleLogin
                        onSuccess={(credentialResponse) => {
                          handleLoginWithGoogle(credentialResponse);
                        }}
                        onError={() => {
                          showToast('Login failed', 'error');
                        }}
                        shape="circle"
                        logo_alignment="center"
                       />
                    </>
                  )}
                </div>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
      <OtpModal
        open={isOtpPage}
        handleClose={() => {
          setIsOtpPage(false);
          clearUser();
          localStorage.setItem('token', '');
        }}
      />
    </>
  );
}

AuthLogin.propTypes = { isDemo: PropTypes.bool };
