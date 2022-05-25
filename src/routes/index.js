import { Suspense, lazy } from 'react';
import { useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    // Main Routes
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <LandingPage /> },
        { path: '/team', element: <TeamPage /> },
        { path: '/tokenomics', element: <TokenomicsPage /> },
        { path: '/privacy', element: <PrivacyPage /> }
      ]
    }
  ]);
}
// Main
const LandingPage = Loadable(lazy(() => import('../pages/LandingPage')));
const TeamPage = Loadable(lazy(() => import('../pages/TeamPage')));
const TokenomicsPage = Loadable(lazy(() => import('../pages/TokenomicsPage')));
const PrivacyPage = Loadable(lazy(() => import('../pages/PrivacyPage')));
