import { RouterProvider } from 'react-router-dom';
import router from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { Provider } from 'react-redux';
import { store } from 'features/store';
import { ToastProvider } from 'utils/ToastProvider';
export default function App() {
  return (
    <ThemeCustomization>
      <ToastProvider>
        <Provider store={store}>
          <ScrollTop>
            <RouterProvider router={router} />
          </ScrollTop>
        </Provider>
      </ToastProvider>
    </ThemeCustomization>
  );
}
