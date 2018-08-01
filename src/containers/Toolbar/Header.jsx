import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { compose } from 'redux'; 

import { sideMenuSelector } from './selectors'; 
import {
  openSideMenu, 
  closeSideMenu
} from 'collections/ui/actions'; 


// nodejs library that concatenates classes
import classNames from "classnames";

// material-ui components
import withStyles from "material-ui/styles/withStyles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import Button from "material-ui/Button";
import Hidden from "material-ui/Hidden";
import Drawer from "material-ui/Drawer";

// @material-ui/icons
import Menu from "@material-ui/icons/Menu";

// core components
import headerStyle from "assets/jss/material-kit-react/components/headerStyle.jsx";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.headerColorChange = this.headerColorChange.bind(this);
  }

  handleDrawerToggle() {
    if(this.props.displaySideMenu) {
      this.props.closeSideMenu(); 
    }
    else this.props.openSideMenu(); 
  }

  componentDidMount() {
    if (this.props.changeColorOnScroll) {
      window.addEventListener("scroll", this.headerColorChange);
    }
  }

  headerColorChange() {
    const { classes, color, changeColorOnScroll } = this.props;
    const windowsScrollTop = window.pageYOffset;

    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[changeColorOnScroll.color]);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[changeColorOnScroll.color]);
    }
  }

  componentWillUnmount() {
    if (this.props.changeColorOnScroll) {
      window.removeEventListener("scroll", this.headerColorChange);
    }
  }

  render() {
    const {
      classes,
      color,
      rightLinks,
      leftLinks,
      brand,
      fixed,
      absolute
    } = this.props;

    const appBarClasses = classNames({
      [classes.appBar]: true,
      [classes[color]]: color,
      [classes.absolute]: absolute,
      [classes.fixed]: fixed
    });

    const brandComponent = (
      <Button href={brand.href} className={classes.title} onClick={(e) => brand.onClick(e)}>
        {brand.title}
      </Button>
    );

    return (
      <AppBar className={appBarClasses}>
        <Toolbar className={classes.container}>
          {leftLinks !== undefined ? brandComponent : null}
          <div className={classes.flex}>
            {leftLinks !== undefined ? (
              <Hidden xlDown implementation="css">
                {leftLinks}
              </Hidden>
            ) : (
              brandComponent
            )}
          </div>
          <Hidden xlDown implementation="css">
            {rightLinks}
          </Hidden>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={this.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Toolbar>
        <Hidden xsUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={"right"}
            open={this.props.displaySideMenu}
            classes={{
              paper: classes.drawerPaper
            }}
            onClose={this.handleDrawerToggle}
          >
            <div className={classes.appResponsive}>
              {leftLinks}
              {rightLinks}
            </div>
          </Drawer>
        </Hidden>
      </AppBar>
    );
  }
}

Header.defaultProp = {
  color: "white"
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "transparent",
    "white",
    "rose",
    "dark"
  ]),
  rightLinks: PropTypes.node,
  leftLinks: PropTypes.node,
  brand: PropTypes.object,
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
  // this will cause the sidebar to change the color from
  // this.props.color (see above) to changeColorOnScroll.color
  // when the window.pageYOffset is heigher or equal to
  // changeColorOnScroll.height and then when it is smaller than
  // changeColorOnScroll.height change it back to
  // this.props.color (see above)
  changeColorOnScroll: PropTypes.shape({
    height: PropTypes.number.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "info",
      "success",
      "warning",
      "danger",
      "transparent",
      "white",
      "rose",
      "dark"
    ]).isRequired
  })
};

const mapStateToProps = sideMenuSelector();

const mapDispatchToProps = (dispatch) => {
  return {
    openSideMenu: () => dispatch(openSideMenu()), 
    closeSideMenu: () => dispatch(closeSideMenu()), 
    dispatch
  }
}; 

const withConnect = connect(mapStateToProps, mapDispatchToProps); 

export default compose( 
  withStyles(headerStyle),
  withConnect
)(Header); 

