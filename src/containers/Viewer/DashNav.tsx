import * as React from 'react';
import { createTheme, useTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { type Router, type Navigation, PageContainerToolbar, PageContainer } from '@toolpad/core';
import { Button, Input, Menu, MenuItem, Paper, styled } from '@mui/material';
import { useDemoRouter } from '@toolpad/core/internal';
import PageContent from './Content';
import DownloadMenu from './components/DownloadMenu';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'demo',
    title: 'Demo',
    icon: <DashboardIcon />,
  },
  {
    segment: 'contentdemo',
    title: 'ContentDemo'
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'sales',
        title: 'Sales',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'traffic',
        title: 'Traffic',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon />,
  },
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

function importData(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    if (typeof e.target.result === 'string') {
      localStorage.setItem('cards', e.target.result);
      location.reload();
    }
  }
  reader.readAsText(file[0]);
}


// preview-start
function PageToolbar() {
  return (
    <PageContainerToolbar>
      <DownloadMenu />
      <Button startIcon={<CloudUploadIcon />} color="inherit" component="label"
      role={undefined}
      tabIndex={-1}>
        Import
        <VisuallyHiddenInput
          type="file"
          onChange={(event) => importData(event.target.files)}
        />
      </Button>
    </PageContainerToolbar>
  );
}

export default function DashboardLayoutBasic() {
  //const [pathname, setPathname] = React.useState('/dashboard');

  const router = useDemoRouter('/dashboard');

  return (
    // preview-start
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: 'LDViewer',
      }}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout>
        <Paper sx={{ width: '90%', alignContent: 'center', display: 'inline' }}>
          <PageContainer slots={{ toolbar: PageToolbar }}>
            <PageContent pathname={router.pathname}/>
          </PageContainer>
        </Paper>
      </DashboardLayout>
    </AppProvider>
    // preview-end

  );
}

