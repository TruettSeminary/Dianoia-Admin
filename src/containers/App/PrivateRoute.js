import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ render: Render, auth, ...rest }) => {
  if(auth && auth !== "") return <Route {...rest} render={Render} />
  else return <Redirect to="/"/>
};

PrivateRoute.propTypes = {
  auth: PropTypes.string.isRequired
};



export default connect(null, null, null, {pure: false})(PrivateRoute);

