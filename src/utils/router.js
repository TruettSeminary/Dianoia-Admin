import { dispatch } from 'index.js'; 

import { push } from 'connected-react-router'

const pushPage = (href) => {
    dispatch(push(href)); 
}

const Router = {
    pushPage
}

export {
    Router
};

