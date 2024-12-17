import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { type Navigation, PageContainerToolbar, PageContainer } from '@toolpad/core';
import { Button, IconButton, Paper, styled, Tooltip } from '@mui/material';
import { useDemoRouter } from '@toolpad/core/internal';
import PageContent from './Pages/Content';
import DownloadMenu from './components/DownloadMenu';
import DatasetLinkedIcon from '@mui/icons-material/DatasetLinked';
import DatasetIcon from '@mui/icons-material/Dataset';
import { executeQuery } from './Data/DataService';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import ArticleIcon from '@mui/icons-material/Article';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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

  function checkDataset(url, retryCount = 3) {
    const query = `SELECT DISTINCT ?predicate {
      ?s ?predicate ?o
    } ORDER BY ?predicate`;
  
    const attemptQuery = (remainingRetries) => {
      executeQuery(query, url)
        .then(() => {
          localStorage.setItem('dataset', url);
          setDataset(url);
          setColor("success");
          setTooltip(`${url} is linked.`);
        })
        .catch((error) => {
          if (remainingRetries > 0) {
            setTimeout(() => {
              attemptQuery(remainingRetries - 1);
            }, 2000);
          } else {
            localStorage.setItem('dataset', url);
            setDataset(url);
            setColor("error");
            setTooltip("Dataset is not reachable: " + error);
          }
        });
    };

    attemptQuery(retryCount);
  }

  return (
    <PageContainerToolbar>
      <Tooltip title={tooltip}>
        <IconButton color={color} onClick={linkDataset}>
          {
            dataset ? <DatasetLinkedIcon /> : <DatasetIcon />
          }
        </IconButton>
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
  const router = useDemoRouter('/guide');

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
        <Paper sx={{ width: '100%', alignContent: 'center', display: 'inline' }}>
          <PageContainer slots={{ toolbar: PageToolbar }}>
            <PageContent pathname={router.pathname}/>
          </PageContainer>
        </Paper>
      </DashboardLayout>
    </AppProvider>
  );
}

export default DashboardLayoutBasic;

