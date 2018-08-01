/* eslint-disable */
import React from "react";
import PropTypes from "prop-types"; 
import { connect } from 'react-redux';
import { compose } from 'redux'; 

import { push } from 'connected-react-router'
import { logout } from 'collections/user/actions'; 
import { 
  openLoginModal, 
  closeSideMenu 
} from 'collections/ui/actions';  



import {
  headerLinkSelector
} from './selectors'

// material-ui components
import List from "material-ui/List";
import ListItem from "material-ui/List/ListItem";
import CustomDropdown from "md-components/CustomDropdown/CustomDropdown.jsx";
import Button from "md-components/CustomButtons/Button.jsx";

// Custom Components
import LoginModal from 'containers/Login'; 

// @material-ui/icons
import {
  AccountCircle,
  ExitToApp,
} from "@material-ui/icons";

import withStyles from "material-ui/styles/withStyles";
import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";


class HeaderLinks extends React.Component {
  constructor(props) {
    super(props); 

    this.classes = props.classes;
    this.state = {
      displayLogin: false, 
      ...props
    }; 
  }

  formButton(link) {
    return (<Button
        color='transparent'
        className={this.classes.navLink}
        onClick={() => {
          if(link.href) {
            this.props.pushPage(link.href); 
            this.props.closeSideMenu(); 
          }
          if(link.onClick) {
            link.onClick();
          } 
        }}>
      {link.icon} {link.text}
    </Button>); 
  }

  formDropDown(link) {
    const formDropDownList = () => {
      return link.content.map((item)=> {
        return (
          <div onClick={() => {
            this.props.pushPage(item.href); 
            this.props.closeSideMenu(); 
          }}>
            {item.text}
          </div>
        );
      }); 
    };

    return ( 
      <CustomDropdown
      buttonText={link.text}
      buttonIcon={() => link.icon} 
      buttonProps={{
        className: this.classes.navLink,
        color: link.color
      }}
      dropdownList={formDropDownList()}
      />);
  }

  formLink(link) {
    const formContent = () => {
      if(!link.content) {
        return this.formButton(link); 
      }
      else {
        return this.formDropDown(link); 
      }
    }

    return(
      <ListItem key={link.text} className={this.classes.listItem}>
        {formContent()}
      </ListItem>
    );
  }

  render() {

    const links = [
      {
        text: 'Logout',
        href:'/', 
        color:'transparent', 
        icon: (<ExitToApp className={this.classes.icons} />), 
        onClick:() => this.props.logout(),
        userLoggedIn: true
      },
      {
        text: 'Login',
        href:'', 
        color:'transparent', 
        icon: (<AccountCircle className={this.classes.icons} />),
        onClick: this.props.openLoginModal, 
        userLoggedIn: false
      }
    ];  

    const userLoggedIn = (this.props.user.jwt !== null && this.props.user.jwt !== ""); 
    const renderLinks = links.filter((link) => {
      
      return link.userLoggedIn == userLoggedIn; 
    }).map((link) => {
      return this.formLink(link);
    });
  
  
    return (
      <div>
        {userLoggedIn ? <h4>Hello, {this.props.user.first_name}!</h4> : '' }
        <List className={this.classes.list}>
          {renderLinks}
        </List>
        <LoginModal/>
      </div>
    );
  }
  
}

HeaderLinks.propTypes = {}

const mapStateToProps = headerLinkSelector(); 

const mapDispatchToProps = (dispatch) => {
  return {
    pushPage: (route) => {
      dispatch(push(route));
    },
    openLoginModal: () => {
      dispatch(openLoginModal());
    },
    closeSideMenu: () => {
      dispatch(closeSideMenu()); 
    },
    logout: () => {
      dispatch(logout()); 
    },
    dispatch
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);


export default compose (
  withStyles(headerLinksStyle), 
  withConnect
)(HeaderLinks); 
