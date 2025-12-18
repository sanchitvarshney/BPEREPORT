import { RouterProvider } from 'react-router-dom';
import router from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { Provider } from 'react-redux';
import { store } from 'features/store';
import { ToastProvider } from 'utils/ToastProvider';
import { SocketProvider } from 'contexts/SocketContext';
import { GoogleOAuthProvider } from "@react-oauth/google";
const googleId = import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID;
export default function App() {

  return (
    <GoogleOAuthProvider clientId={googleId}>
    <ThemeCustomization>
      <ToastProvider>
      <SocketProvider>
        <Provider store={store}>
          <ScrollTop>
            <RouterProvider router={router} />
          </ScrollTop>
        </Provider>
        </SocketProvider>
      </ToastProvider>
    </ThemeCustomization>
    </GoogleOAuthProvider>
  );
}
