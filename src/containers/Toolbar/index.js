// React/Redux
import React from 'react'; 

import { compose } from 'redux'; 
import { connect } from 'react-redux';

import { Router } from 'utils/router'; 

import { toolbarSelector } from './selectors'; 


// Design
import Header from './Header'; 
import HeaderLinks from './HeaderLinks'; 

class Toolbar extends React.Component {

    render() {
        const brand = {
            title: 'Dianoia Admin', 
            href: '',
            onClick: (e) => {
                e.preventDefault(); 
                const href = this.props.user.jwt && this.props.user.jwt !== "" ? '/home' : '/'; 
                Router.pushPage(href);
            }
        };
        return (
            <Header
                color="info"
                brand={brand}
                rightLinks={(<HeaderLinks/>)}
            />
        );
    }
}

Toolbar.propTypes = {}

const mapStateToProps = toolbarSelector(); 

const mapDispatchToProps = (dispatch) =>  {
    return {
        dispatch
    }
};

const withConnect = connect(mapStateToProps, mapDispatchToProps); 

export default compose(
    withConnect
)(Toolbar); 