import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { type Navigation, PageContainerToolbar, PageContainer } from '@toolpad/core';
import { Button, Paper, styled, Tooltip } from '@mui/material';
import { useDemoRouter } from '@toolpad/core/internal';
import PageContent from './(dashboard)/Content';
import DownloadMenu from './components/DownloadMenu';
import DatasetLinkedIcon from '@mui/icons-material/DatasetLinked';
import DatasetIcon from '@mui/icons-material/Dataset';
import { executeQuery } from './Data/DataService';

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
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'LDWizard',
  },
  {
    segment: 'ldwizard',
    title: 'LDWizard',
    icon: <img src="../../../img/LDWizard-square.png" alt="LDWizard-logo"/>
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

function PageToolbar() {
  const [dataset, setDataset] = React.useState(localStorage.getItem('dataset'));
  const [color, setColor] = React.useState("warning");
  const [tooltip, setTooltip] = React.useState("Link a dataset");

  React.useEffect(() => {
    if(dataset){
      checkDataset(dataset);
    }
  } ,[]);

  function linkDataset() {
    const url = prompt("Please enter SPARQL endpoint URL of the dataset to link and leave empty to unlink:");
    if (url) {
      checkDataset(url);
    } else{
      localStorage.removeItem('dataset');
      setDataset(null);
      setColor("warning");
      setTooltip("Link a dataset");
    }
  }

  function checkDataset(url,  retryCount = 1) {
    var query = `SELECT DISTINCT ?predicate {
      ?s ?predicate ?o}
      ORDER BY ?predicate`;
  
    executeQuery(query, dataset)
    .then(() => {
      localStorage.setItem('dataset', url);
      setDataset(url);
      setColor("success");
      setTooltip(`${dataset} is linked.`);
    }).catch((error) => {
      if (retryCount > 0) {
        setTimeout(() => {
          checkDataset(url, retryCount - 1);
        }, 1000);
      } else {
        localStorage.setItem('dataset', url);
        setDataset(url);
        setColor("error");
        setTooltip("Dataset is not reachable: " + error);
      }
    });
  }

  return (
    <PageContainerToolbar>
      <Tooltip title={tooltip}>
        <Button startIcon={dataset ? <DatasetLinkedIcon /> : <DatasetIcon />} color={color} onClick={linkDataset} />
      </Tooltip>
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

function DashboardLayoutBasic() {
  const router = useDemoRouter('/dashboard');

  return (
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
  );
}

export default DashboardLayoutBasic;

