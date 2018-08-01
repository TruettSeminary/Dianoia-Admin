import React from 'react'; 
import { compose } from 'redux'; 
import { connect } from 'react-redux'; 

import { translationPageSelector } from './selectors'; 

import {
    createTranslation, 
    updateTranslation,
    deleteTranslation
} from 'collections/translations/actions'; 

class TranslationsPage extends React.Component {

    render() {
        return (
            <div>
                <div style={{marginTop: 10 + 'rem'}}>
                    Translations Page yo
                </div>
            </div>
        );
    }
}

TranslationsPage.propTypes = {}; 

const mapStateToProps = translationPageSelector(); 
const mapDispatchToProps = (dispatch) => {
    return {
        createTranslation: (translation) => {
            dispatch(createTranslation(translation))
        },
        updateTranslation: (translation) => {
            dispatch(updateTranslation(translation)); 
        },
        deleteTranslation: (translation) => {
            dispatch(deleteTranslation(translation));
        },
        dispatch
    }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps); 

export default compose(
    withConnect
)(TranslationsPage); 