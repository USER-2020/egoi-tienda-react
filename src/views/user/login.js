/* eslint-disable no-unused-vars */
import React from 'react';
import { Row, Card, CardTitle, CardBody } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions';

import IntlMessages from '../../helpers/IntlMessages';
import { Colxx } from '../../components/common/CustomBootstrap';

import Registro from '../../components/formularios/registro';

const Login = () => {
  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <CardBody>
            <NavLink to="/" className="white">
         
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="user.register" />
            </CardTitle>
            <Registro />
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};
const mapStateToProps = () => {};

export default (Login);
