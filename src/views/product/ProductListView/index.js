import React, { useState} from 'react';
import {useEffect} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import configData from 'src/config.json';
import keycloak from 'src/';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';


const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const ProductListView = ({ className, ...rest }) => {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    
    fetch(configData.BACKEND_URL + '/api/customers?family_name=' + keycloak.idTokenParsed.family_name)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
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
      return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        subtitle={`${products.length} in total`}
        title="Owned Financial Assets"
      />
      <Divider />
        {products.map((product, i) => (
          <Accordion>
             <AccordionSummary aria-controls="panel1c-content"
          id="panel1c-header" expandIcon={<ExpandMoreIcon />}>
            <div className={classes.column}>
            <Typography className={classes.heading}><b>Name:</b> {product.asset_title}</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}><b>Provider:</b> {product.asset_provider}</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}><b>Provider's Address</b> {product.asset_address_deposit_contract}</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
        
            
          
          <Typography >
		  <b>Description: </b>{"    "+product.asset_description}<br/><br/><b>Terms and Conditions</b>{"    "+product.asset_terms}
          </Typography>
        
         
        </AccordionDetails>
      </Accordion>
        ))}
      <Divider />
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
       
      </Box>
    </Card>
  );
};
}

ProductListView.propTypes = {
  className: PropTypes.string
};

export default ProductListView;

