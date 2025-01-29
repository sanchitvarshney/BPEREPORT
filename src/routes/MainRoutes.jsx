import { lazy } from 'react';
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import Protected from 'components/shared/Protected';
const TotalDeviceInCompany = Loadable(lazy(() => import('pages/reportPages/TotalDeviceInCompany')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const TotalMaterialInCompany = Loadable(lazy(() => import('pages/reportPages/TotalMaterialInCompany')));
const TotalDeviceInCompanylocation = Loadable(lazy(() => import('pages/reportPages/TotalDeviceInCompanylocation')));
const MainRoutes = {
  path: '/',
  element: (
    <Protected authentication>
      <Dashboard />
    </Protected>
  ),
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: '/dashboard',
      element: <DashboardDefault />
    },
    {
      path: '/total-device-in-company',
      element: <TotalDeviceInCompany />
    },
    {
      path: '/total-material-in-company',
      element: <TotalMaterialInCompany />
    },
    {
      path: '/total-device-in-company-locations',
      element: <TotalDeviceInCompanylocation />
    },
  ]
};

export default MainRoutes;
