import { lazy } from 'react';
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import Protected from 'components/shared/Protected';
import NotFoundPage from 'pages/NotFoundPage';
import DeviceInCompanyLayout from 'layout/WarehouseLayout/DispatchLayout';
const TotalDeviceInCompany = Loadable(lazy(() => import('pages/reportPages/TotalDeviceInCompany')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const TotalMaterialInCompany = Loadable(lazy(() => import('pages/reportPages/TotalMaterialInCompany')));
const TotalDeviceInCompanylocation = Loadable(lazy(() => import('pages/reportPages/TotalDeviceInCompanylocation')));
const TotalMaterialInBPECompany = Loadable(lazy(() => import('pages/reportPages/TotalMaterialInBPECompany')));
const TotalMaterialInMSCCompany = Loadable(lazy(() => import('pages/reportPages/TotalMaterialInMSCCompany')));
const TotalDispatchdevices = Loadable(lazy(() => import('pages/reportPages/TotalDispatchdevices')));
const AssemblyConsumption = Loadable(lazy(() => import('pages/reportPages/AssemblyConsumption')));
const BERDetails = Loadable(lazy(() => import('pages/reportPages/TotalBERDevices')));
const ComponentUsed = Loadable(lazy(() => import('pages/reportPages/ComponentUsed')));
const RejectionReport = Loadable(lazy(() => import('pages/reportPages/RejectionReport')));
const BPEIssue = Loadable(lazy(() => import('pages/reportPages/BPEIssue')));
const TotalWrongDevice = Loadable(lazy(() => import('pages/reportPages/TotalWrongDevice')));
const TotalMINDevice = Loadable(lazy(() => import('pages/reportPages/TotalMINDevice')));
const TotalComponentsOnCompanyLocation = Loadable(lazy(() => import('pages/reportPages/TotalComponentsOnCompanylocation')));

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
      element: (
        <DeviceInCompanyLayout>
          <TotalDeviceInCompany />
        </DeviceInCompanyLayout>
      )
    },
    {
      path: '/wrong-device',
      element: (
        <DeviceInCompanyLayout>
          <TotalWrongDevice />
        </DeviceInCompanyLayout>
      )
    },
    {
      path: '/min-device',
      element: (
        <DeviceInCompanyLayout>
          <TotalMINDevice />
        </DeviceInCompanyLayout>
      )
    },
    {
      path: '/total-material-in-company',
      element: <TotalMaterialInCompany />
    },
    {
      path: '/total-device-at-company-locations',
      element: <TotalDeviceInCompanylocation />
    },
    {
      path: '/components-at-company-locations',
      element: <TotalComponentsOnCompanyLocation />
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
    },
    {
      path: '/component-used',
      element: <ComponentUsed />
    },
    {
      path: '/rejection-report',
      element: <RejectionReport />
    },
    {
      path: '/bpe-issue',
      element: <BPEIssue />
    },
    {
      path: '*',
      element: <NotFoundPage /> // Display the 404 page for all unmatched routes
    }
  ]
};

export default MainRoutes;
