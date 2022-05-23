import React, { Component } from 'react';
import { useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { useState } from 'react';
import {
  Container,
  Grid,
  Button,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Budget from './Budget';
import LatestOrders from './LatestOrders';
import ProviderTransactions from './ProviderTransactions';
import AvailableAssets from './AvailableAssets';
import DepositAsset from './DepositAsset';
import CreatedAssets from './CreatedAssets';
import Sales from './Sales';
import TasksProgress from './TasksProgress';
import TotalCustomers from './TotalCustomers';
import TotalProfit from './TotalProfit';
import TrafficByDevice from './TrafficByDevice';
import Wallet from './Wallet';
import Keycloak from 'keycloak-js';
import keycloak from 'src/';
import configData from 'src/config.json';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));


const Dashboard = () => {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setItems] = useState([]);
  let navigate = useNavigate();
   

  if(keycloak.hasRealmRole('Customer')){
   
  return (
    
      <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={6}
            sm={6}
            xl={3}
            xs={12}
          >
            <Budget />
          </Grid>
          <Grid
            item
            lg={6}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalCustomers />
          </Grid>
          
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <Wallet />
          </Grid>
		  <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders />
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xl={9}
            xs={12}
          >
            <DepositAsset />
          </Grid>
        </Grid>
      </Container>
    </Page>
   
  );
  }
  else if(keycloak.hasRealmRole('Provider')){
    return(

<Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          
        
		  <Grid
            item
            lg={12}
            md={12}
            xl={9}
            xs={12}
          >
            <ProviderTransactions />
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xl={9}
            xs={12}
          >
            <CreatedAssets/>
          </Grid>
        </Grid>
      </Container>
    </Page>


  )}
};

export default Dashboard;
