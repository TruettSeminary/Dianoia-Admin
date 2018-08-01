import React from 'react'; 
import { connect } from 'react-redux';
import { compose } from 'redux'; 
// import PropTypes from 'prop-types';

import withStyles from 'material-ui/styles/withStyles'; 

import { submitLogin } from 'collections/user/actions'; 
import { closeLoginModal } from 'collections/ui/actions';
import { push } from 'connected-react-router'; 

import { loginSelector } from './selectors'; 

// Design
import Slide from "material-ui/transitions/Slide";
import Dialog from "material-ui/Dialog";
import DialogContent from "material-ui/Dialog/DialogContent";
import DialogActions from "material-ui/Dialog/DialogActions";

import Button from 'md-components/CustomButtons/Button'; 
import CustomInput from 'md-components/CustomInput/CustomInput'; 

import modalStyle from 'assets/jss/material-kit-react/modalStyle.jsx';

function Transition(props) {
    return <Slide diretion="down" {...props} />; 
}

class LoginModal extends React.Component {

    constructor(props) {
        super(props); 

        this.state = {
            email: '', 
            password: ''
        }
    }

    handleChange(event, key) {
        let newState = {}; 
        newState[key] = event.target.value; 
        this.setState(newState); 
    }


    render() {
        const classes = this.props.classes; 
        return (
            <div>
                <Dialog 
                    classes={{root: classes.center, paper: classes.modal}}
                    open={this.props.displayLoginModal}
                    TransitionComponent={Transition}
                    onClose={() => this.props.closeLoginModal()}>

                    <form onSubmit={(event) => {
                        event.preventDefault(); 
                        const email = this.state.email.trim().toLowerCase();
                        const password = this.state.password.trim();
                        this.setState({
                            email: '', 
                            password:''
                        });
                        this.props.submitLogin(email, password); 
                    }}>
                        <DialogContent
                            id="modal-slide-description"
                            className={classes.modalBody}>
                            <CustomInput
                                labelText="Email (identifier)"
                                id="email"
                                inputProps={{
                                    onChange: (event) => this.handleChange(event, 'email')
                                }}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            ></CustomInput>
                            <CustomInput
                                labelText="Password"
                                id="password"
                                type="password"
                                inputProps={{
                                    type: "password", 
                                    onChange: (event) => this.handleChange(event, 'password')
                                }}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            ></CustomInput>
                        </DialogContent>
                        <DialogActions
                            className={classes.modalFooter + " " + classes.modalFooterCenter}>
                            <div>
                                <Button onClick={() => this.props.closeLoginModal()}> Never mind </Button>
                                <Button
                                    type="submit"
                                    color="success">
                                    Login
                                </Button>
                            </div>

                        </DialogActions>
                        <DialogActions
                            className={classes.modalFooter + " " + classes.modalFooterCenter}>
                            <div>
                                <div> 
                                    Forgot your password? Click 
                                    <a href="" onClick={()=> {
                                        this.props.closeLoginModal();
                                        this.props.pushPage('/forgot-password')
                                    }}>
                                        {` here`}
                                    </a>
                                </div>
                                <div> 
                                    New user? Register
                                    <a href="" onClick={()=> {
                                        this.props.closeLoginModal();
                                        this.props.pushPage('/registration');
                                    }}>
                                        {` here`}
                                    </a>
                                </div>
                            </div>

                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        );
    }
}

// LoginModal.propTypes = {}

const mapStateToProps = loginSelector(); 

const mapDispatchToProps = (dispatch) => {
  return {
    pushPage: (route) => {
      dispatch(push(route))
    },
    submitLogin: (identifier, password) => {
      dispatch(submitLogin(identifier, password)); 
    },
    closeLoginModal: () => {
        dispatch(closeLoginModal());
    },
    dispatch
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose (
    withStyles(modalStyle), 
    withConnect
  )(LoginModal); 