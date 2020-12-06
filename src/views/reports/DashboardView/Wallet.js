import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme
} from '@material-ui/core';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import keycloak from 'src/';
import configData from 'src/config.json';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const Wallet = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [balance,setBalance]=useState(0);
  const [amount, setAmount] = useState(0);
  const [orders, setItems] = useState([]);
  const [result, setResult] = useState(0);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const data = {
    datasets: [
      {
        data: [100,0],
        backgroundColor: [
          colors.indigo[500],
          colors.red[600],
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['Ethereum', 'Ethereum invested in financial digital assets']
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const devices = [
    {
      title: 'Ethereum',
      value: 100,
      icon: AccountBalanceWalletIcon,
      color: colors.indigo[500]
    },
    {
      title: 'Ethereum invested',
      value: 0,
      icon: AccountBalanceIcon,
      color: colors.red[600]
    },
  ];


  useEffect(() => {
    
    fetch(configData.BACKEND_URL + '/api/transactions?from_name=' + keycloak.idTokenParsed.family_name)
      .then(res => res.json())
      .then(
        (orders) => {
          setIsLoaded(true);
          setItems(orders);
          setBalance(orders.reduce( function(a, b){
            return a + parseInt(b.amount);
        }, 0));
         
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])
  
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    const available=parseFloat(sessionStorage.getItem('balance'));
    console.info(available);
    var percentage=0;
    if(balance>0){percentage= ((balance/(balance+available))*100).toFixed(2);}
    console.info(percentage);
    devices[1].value= percentage;
    devices[0].value=100-percentage;
    data.datasets[0].data[1]=percentage;
    data.datasets[0].data[0]=100-percentage;
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Token available VS Token invested" />
      <Divider />
      <CardContent>
        <Box
          height={300}
          position="relative"
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          mt={2}
        >
          {devices.map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              p={1}
              textAlign="center"
            >
              <Icon color="action" />
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h2"
              >
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
}
Wallet.propTypes = {
  className: PropTypes.string
};

export default Wallet;
