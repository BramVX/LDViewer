import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { type Navigation, PageContainerToolbar, PageContainer } from '@toolpad/core';
import { Button, IconButton, Paper, styled, Tooltip } from '@mui/material';
import { useDemoRouter } from '@toolpad/core/internal';
import PageContent from './Pages/Content';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import ArticleIcon from '@mui/icons-material/Article';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LDViewerIcon from './Assets/ldviewer.png';


const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'guide',
    title: 'Guide',
    icon: <ContactSupportIcon />,
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'demo',
    title: 'Demo',
    icon: <ArticleIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'LDWizard',
  },
  {
    segment: 'ldwizard',
    title: 'LDWizard',
    icon: <ArrowBackIcon/>
  }
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DashboardLayoutBasic() {
  const router = useDemoRouter('/guide');

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src={LDViewerIcon} alt="MUI logo" />,
        title: 'LDViewer',
      }}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout>
        <Paper sx={{ width: '100%', alignContent: 'center', display: 'inline' }}>
          <PageContent pathname={router.pathname}/>
        </Paper>
      </DashboardLayout>
    </AppProvider>
  );
}

export default DashboardLayoutBasic;

