import { lazy } from 'react';
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import Protected from 'components/shared/Protected';
const TotalDeviceInCompany = Loadable(lazy(() => import('pages/reportPages/TotalDeviceInCompany')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const TotalMaterialInCompany = Loadable(lazy(() => import('pages/reportPages/TotalMaterialInCompany')));
const TotalDeviceInCompanylocation = Loadable(lazy(() => import('pages/reportPages/TotalDeviceInCompanylocation')));
const TotalMaterialInBPECompany = Loadable(lazy(() => import('pages/reportPages/TotalMaterialInBPECompany')));
const TotalMaterialInMSCCompany = Loadable(lazy(() => import('pages/reportPages/TotalMaterialInMSCCompany')));
const TotalDispatchdevices = Loadable(lazy(() => import('pages/reportPages/TotalDispatchdevices')));
const AssemblyConsumption = Loadable(lazy(() => import('pages/reportPages/AssemblyConsumption')));
const BERDetails = Loadable(lazy(() => import('pages/reportPages/TotalBERDevices')));
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
    {
      path: '/total-material-in-bpe',
      element: <TotalMaterialInBPECompany />
    },
    {
      path: '/total-material-in-msc',
      element: <TotalMaterialInMSCCompany />
    },
    {
      path: '/total-dispatch-device',
      element: <TotalDispatchdevices />
    },
    {
      path: '/assembly-consumption',
      element: <AssemblyConsumption />
    },
    {
      path: '/ber-details',
      element: <BERDetails />
    }
  ]
};

export default MainRoutes;
