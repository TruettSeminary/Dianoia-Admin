import React from 'react'; 
import { compose } from 'redux'; 
import { connect } from 'react-redux'; 

import { translationPageSelector } from './selectors'; 

import {
    createTranslation, 
    updateTranslation,
    deleteTranslation
} from 'collections/translations/actions'; 

import GridContainer from 'md-components/Grid/GridContainer'; 
import GridItem from 'md-components/Grid/GridItem'; 
import Button from "md-components/CustomButtons/Button.jsx";
import CustomInput from "md-components/CustomInput/CustomInput.jsx";
// import Card from "md-components/Card/Card.jsx";
// import CardBody from "md-components/Card/CardBody.jsx";
import Chip from 'material-ui/Chip/Chip'; 
import Tooltip from 'material-ui/Tooltip/Tooltip';

import {
    AddCircle,
    RemoveCircle
} from '@material-ui/icons'


import './styles.css'; 


class Translation {
    constructor({ _id, sentence, scripture, name, instructions, decks, metadata}) {
        if(_id !== undefined) this._id = _id; // only set _id on existing translations; 
        this.sentence = sentence || ''; 
        this.scripture = scripture || ''; 
        this.name = name || ''; 
        this.instructions = instructions || ''; 
        this.decks = decks ? new Set(decks) : new Set();
        this.metadata = metadata || {}; 
    }
}


class TranslationsPage extends React.Component {

    constructor(props) {
        super(props); 

        const translation = this.props.translation_id ? 
            new Translation(this.props.translations[this.props.translation_id]) : 
            new Translation({}); 

        this.state = {
            ...translation
        }
    }

    handleChange(event, key) {
        const newState = {}; 
        newState[key] = event.target.value; 
        this.setState(newState); 
    }

    saveTranslation() {
        const translation = {
            sentence: this.state.sentence,
            name: this.state.name, 
            instructions: this.state.instructions, 
            scripture: this.state.scripture, 
            decks: Array.from(this.state.decks), 
            metadata: this.state.metadata
        }; 

        if(this.state._id) {
            translation._id = this.state._id;  
            this.props.updateTranslation(translation); 
        }
        else this.props.createTranslation(translation); 
    }

    generateInput(id, labelText, multiline) {
        return (
            <CustomInput
                labelText={labelText}
                id={id}
                type="text"
                inputProps={{
                    type: 'text',
                    value: this.state[id],
                    onChange: (event) => this.handleChange(event, id),
                    multiline: multiline,
                    classes: {
                        root: 'input'
                    }
                }}
                formControlProps={{
                    fullWidth: true
                }}
            />
        ); 
    }

    removeDeckFromTranslation(deck_id) {
        const decks = this.state.decks; 
        decks.delete(deck_id); 
        this.setState({
            decks
        }); 
    }

    addDeckToTranslation(deck_id) {
        const decks = this.state.decks; 
        decks.add(deck_id);
        this.setState({
            decks
        });
    }

    generateDeck(deck, deckInTranslation) {
        return(
            <GridItem sm={2} key={deck._id}>
                <Tooltip title={deck.description || ''} >
                    <Chip
                        label={deck.name}
                        onDelete={() => {
                            if(deckInTranslation) this.removeDeckFromTranslation(deck._id)
                            else this.addDeckToTranslation(deck._id);
                        }}
                        deleteIcon={
                            deckInTranslation ? <RemoveCircle/> : <AddCircle/>
                        }
                    />
                </Tooltip>
            </GridItem>
        );
    }

    // merge segment
    mergeMetaSegments(segments) {

    }

    render() {
        const translationDecks = []; 
        const otherDecks = []; 

        Object.keys(this.props.decks).forEach((deck_id) => {
            if(this.state.decks.has(deck_id)) {
                translationDecks.push(deck_id); 
            }
            else otherDecks.push(deck_id); 
        }); 

        return (
            <div className="translationPageContainer">
                <GridContainer>
                    <GridItem>
                        {this.generateInput('sentence', 'Sentence or phrase to translate', true)}
                    </GridItem>
                    <GridItem>
                        {this.generateInput('name', 'Translation name', false)}
                    </GridItem>
                    <GridItem>
                        {this.generateInput('instructions', 'Translation instructions', true)}
                    </GridItem>
                    <GridItem>
                        {this.generateInput('scripture', 'Scripture reference(s) (comma separated list', false)}
                    </GridItem>
                    <GridItem>
                        <div>
                            Currently in these decks: 
                            <GridContainer>{
                                translationDecks.map((deck_id) => {
                                    return this.generateDeck(this.props.decks[deck_id], true)
                                })
                            }</GridContainer>
                        </div>
                        <div>
                            Other available deck: 
                            <GridContainer>{
                                otherDecks.map((deck_id) => {
                                    return this.generateDeck(this.props.decks[deck_id], false)
                                })
                            }</GridContainer>
                        </div>
                    </GridItem>
                    <GridItem>
                        <GridContainer>
                            <GridItem sm={9}>

                            </GridItem>
                            <GridItem sm={3}>
                                
                            </GridItem>
                        </GridContainer>
                    </GridItem>
                    <GridItem>
                        <Button color="success" onClick={() => this.saveTranslation()}>Save</Button>
                    </GridItem>
                </GridContainer>
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