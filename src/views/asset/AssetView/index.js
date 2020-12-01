import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import AssetForm from './AssetForm';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const AssetView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Asset Form"
    >
      <Container maxWidth="lg">
        <Box mt={3}>
          <AssetForm />
		 
        </Box>
      </Container>
    </Page>
  );
};

export default AssetView;