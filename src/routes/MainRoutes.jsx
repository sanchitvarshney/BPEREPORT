import { lazy } from 'react';
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import Protected from 'components/shared/Protected';
import NotFoundPage from 'pages/NotFoundPage';
import DeviceInCompanyLayout from 'layout/WarehouseLayout/DispatchLayout';
import BPEIssueLayout from 'layout/BPEIssueLayout/BPEIssueLayout';
import ErrorBoundary from 'components/ErrorBoundary';
const TotalDeviceInCompany = Loadable(lazy(() => import('pages/reportPages/TotalDeviceInCompany')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
const TotalMaterialInCompany = Loadable(lazy(() => import('pages/reportPages/TotalMaterialInCompany')));
const TotalDeviceInCompanylocation = Loadable(lazy(() => import('pages/reportPages/TotalDeviceInCompanylocation')));
const TotalMaterialInBPECompany = Loadable(lazy(() => import('pages/reportPages/TotalMaterialInBPECompany')));
const DispatchReport = Loadable(lazy(() => import('pages/reportPages/DispatchReport')));
const BatteryQCReport = Loadable(lazy(() => import('pages/reportPages/BatteryQCReport')));
const TotalMaterialInMSCCompany = Loadable(lazy(() => import('pages/reportPages/TotalMaterialInMSCCompany')));
const TotalDispatchdevices = Loadable(lazy(() => import('pages/reportPages/TotalDispatchdevices')));
const AssemblyConsumption = Loadable(lazy(() => import('pages/reportPages/AssemblyConsumption')));
const ConsumptionLayout = Loadable(lazy(() => import('layout/AssemblyConsumptionLayout/ConsumptionLayout')));
const TRCConsumptionLayout = Loadable(lazy(() => import('layout/TRCConsumptionLayout/TRCConsumptionLayout')));
const DeviceSummary = Loadable(lazy(() => import('pages/reportPages/DeviceSummary')));
const TRCConsumption = Loadable(lazy(() => import('pages/reportPages/TrcConsumption')));
const BERDetails = Loadable(lazy(() => import('pages/reportPages/TotalBERDevices')));
const ComponentUsed = Loadable(lazy(() => import('pages/reportPages/ComponentUsed')));
const RejectionReport = Loadable(lazy(() => import('pages/reportPages/RejectionReport')));
const BPEIssue = Loadable(lazy(() => import('pages/reportPages/BPEIssue')));
const BPEIssueReport = Loadable(lazy(() => import('pages/reportPages/BPEIssueReport')));
const TotalWrongDevice = Loadable(lazy(() => import('pages/reportPages/TotalWrongDevice')));
const TotalMINDevice = Loadable(lazy(() => import('pages/reportPages/TotalMINDevice')));
const TotalComponentsOnCompanyLocation = Loadable(lazy(() => import('pages/reportPages/TotalComponentsOnCompanylocation')));
const DeviceAnalysis = Loadable(lazy(() => import('pages/reportPages/DeviceAnalysis')));
const SwipeMINReport = Loadable(lazy(() => import('pages/reportPages/SwipeMINReport')));

const MainRoutes = {
  path: '/',
  element: (
    <Protected authentication>
      <ErrorBoundary>
        <Dashboard />
      </ErrorBoundary>
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
      path: '/swipe-min-report',
      element: <SwipeMINReport />
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
      path: '/awb-device',
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
    // {
    //   path: '/device-analysis',
    //   element: <DeviceAnalysis />
    // },
    {
      path: '/total-material-in-msc',
      element: <TotalMaterialInMSCCompany />
    },
    {
      path: '/dispatch-report',
      element: <DispatchReport />
    },
    {
      path: '/battery-qc-report',
      element: <BatteryQCReport />
    },
    {
      path: '/total-dispatch-device',
      element: <TotalDispatchdevices />
    },
    {
      path: '/assembly-consumption',
      element: (
        <ConsumptionLayout>
          <AssemblyConsumption />
        </ConsumptionLayout>
      )
    },
    {
      path: '/trc-consumption',
      element: (
        <TRCConsumptionLayout>
          <TRCConsumption />
        </TRCConsumptionLayout>
      )
    },
    {
      path: '/ber-details',
      element: <BERDetails />
    },
    {
      path: '/device-summary',
      element: <DeviceSummary />
    },
    {
      path: '/assembly-component-summary',
      element: (
        <ConsumptionLayout>
          <ComponentUsed />
        </ConsumptionLayout>
      )
    },
    {
      path: '/trc-component-summary',
      element: (
        <TRCConsumptionLayout>
          <ComponentUsed />
        </TRCConsumptionLayout>
      )
    },
    {
      path: '/rejection-report',
      element: <RejectionReport />
    },
    {
      path: '/bpe-issue',
      element: (
        <BPEIssueLayout>
          <BPEIssue />
        </BPEIssueLayout>
      )
    },
    {
      path: '/bpe-issue-report',
      element: (
        <BPEIssueLayout>
          <BPEIssueReport />
        </BPEIssueLayout>
      )
    },
    {
      path: '*',
      element: <NotFoundPage /> // Display the 404 page for all unmatched routes
    }
  ]
};

export default MainRoutes;
