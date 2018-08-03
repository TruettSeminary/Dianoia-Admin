import React from 'react'; 
import { compose } from 'redux'; 
import { connect } from 'react-redux'; 
import { PropTypes } from 'prop-types'; 

import uuid from 'uuid/v4'; 

import { segmentBuilderSelector } from './selectors'; 

import GridContainer from 'md-components/Grid/GridContainer'; 
import GridItem from 'md-components/Grid/GridItem'; 
import Button from "md-components/CustomButtons/Button.jsx";
import CustomInput from "md-components/CustomInput/CustomInput.jsx";

import Chip from 'material-ui/Chip/Chip'; 
import Tooltip from 'material-ui/Tooltip/Tooltip';
import Paper from 'material-ui/Paper/Paper';
import Checkbox from 'material-ui/Checkbox/Checkbox'; 

import {
    AddCircle,
    RemoveCircle
} from '@material-ui/icons'
import SegmentRow from './SegmentRow';



class SegmentBuilder extends React.Component {

    constructor(props) {
        super(props); 

        this.buildSegments = (sentence) => {
            return sentence.split(' ').reduce((segments, phrase, index) => {
                const id = uuid();
                segments[`${id}`] = {
                    id,
                    index,
                    phrase, 
                    translation: '',
                    cards: new Map()
                }; 

                return segments; 
            }, {});
        }

        let segments = {}; 
        if(this.props.segments) {
            segments = Object.values(this.props.segments).reduce((segments, segment) => {
                segments[`${segment.id}`] = {
                    ...segment, 
                    cards: segment.cards.reduce((cards, card) => {
                        cards.set(card._id, {
                            ...this.props.cards[card._id], 
                            form: card.form
                        }); 
                        return cards;
                    }, new Map())
                }
                return segments; 
            }, {})
        }
        else segments = this.buildSegments(this.props.sentence); 

        this.state = {
            segments, 
            checkedSegments: new Set(), 
            selectedEditSegment: ''
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.sentence !== prevProps.sentence) {
            this.setState({
                // TODO: watch for sentence changing after segments have been built
                segments: this.buildSegments(this.props.sentence)
            })
        }
    }

    mergeCheckedSegments() {
        // get segments
        const segments = this.state.segments; 
        const checkedSegments = [...this.state.checkedSegments].map((segment_id) => segments[segment_id]); 

        // verify they are continuous
        const isContinuous = checkedSegments.sort(((segmentA, segmentB) => {
            return segmentA.index - segmentB.index
        })).every((segment, index, arr) => {
            if(index === 0) return true; 
            const previousSegment = arr[index-1]; 
            return segment.index === previousSegment.index + 1 + (previousSegment.mergedSegmentCount || 0); 
        }); 

        if(!isContinuous) {
            alert('Only sequential segments can be merged'); 
            return false; 
        }

        // merge based on current order (merge into earliest index)
        // and delete other segments
        const newSegment = checkedSegments[0]; 
        for(let idx = 1; idx < checkedSegments.length; idx++) {
            const segment = checkedSegments[idx];
            newSegment.mergedSegmentCount = (newSegment.mergedSegmentCount || 0) + 1; 

            newSegment.phrase += ' ' + segment.phrase; 
            newSegment.translation += ' ' + segment.translation; 
            [...segment.cards.entries()].forEach(([card_id, card]) => {
                if(!newSegment.cards.has(card_id))newSegment.cards.set(card_id, card); 
            }); 

            delete segments[segment.id]
        }

        // update state (segments and checked items)
        this.setState({
            segments,
            checkedSegments: new Set(), 
            selectedEditSegment: ''
        })
    }

    splitCheckedSegments() {
        const segments = this.state.segments; 
        const checkedSegments = [...this.state.checkedSegments].map((segment_id) => segments[segment_id]); 
        
        checkedSegments.forEach((segment) => {
            const phrases = segment.phrase.split(' '); 
            segment.phrase = phrases[0]; 
            segment.mergedSegmentCount = 0; 

            for(let idx = 1; idx < phrases.length; idx++) {
                const id = uuid();
                segments[`${id}`] = {
                    id,
                    index: segment.index + idx,
                    phrase: phrases[idx], 
                    translation: '',
                    cards: new Map()
                }; 
            }
        }); 

        // set state
        this.setState({
            segments, 
            checkedSegments: new Set()
        })
    }

    addCardToSegment(card, segment_id) {
        const segments = this.state.segments; 
        segments[segment_id].cards.set(card._id, {
            ...card,
            form: 'word'
        }); 
        this.setState({segments}); 
    }

    removeCardFromSegment(card, segment_id)  {
        const segments = this.state.segments; 
        segments[segment_id].cards.delete(card._id); 
        this.setState({segments}); 
    }

    handleCardFormChange(event, card, segment_id) {
        const segments = this.state.segments; 
        segments[segment_id].cards.set(card.id, {
            ...card, 
            form: event.target.value
        }); 

        this.setState({segments});
    }

    handleSegmentCheckChange = segment_id => event => {
        const checkedSegments = this.state.checkedSegments; 
        if(event.target.checked) checkedSegments.add(segment_id); 
        else checkedSegments.delete(segment_id); 

        this.setState({checkedSegments}); 
    }

    handleSegmentTranslationChange(event, segment_id) {
        console.log(segment_id); 
        const segments = this.state.segments;  
        segments[segment_id].translation = event.target.value; 
        this.setState({segments}); 
    }

    handleEditSegment(segment_id) {
        this.setState({
            selectedEditSegment: segment_id
        })
    }

    getSegments() {
        return Object.values(this.state.segments).reduce((segments, segment) => {
            segments[segment.id] = {
                ...segment, 
                cards: [...segment.cards.values()].reduce((cards, card)=> {
                    cards.push({
                        _id: card._id, 
                        form: card.form
                    });
                    return cards; 
                },[])
            }
            return segments; 
        }, {}); 
    }

    generateCard(card, cardInSegment) {
        return (<GridItem sm={4} key={card._id} className="availableCard">
            <Tooltip title={card.back_text || ''} >
                <Chip
                    className="availableChip"
                    label={card.front_text}
                    onDelete={() => {
                        this.addCardToSegment(card, this.state.selectedEditSegment); 
                    }}
                    deleteIcon={
                        cardInSegment ? <RemoveCircle/> : <AddCircle/>
                    }
                />
            </Tooltip>
        </GridItem>);
    }

    generateSegment(segment) { 
        return(
            <SegmentRow
                key={segment.id} 
                checked={this.state.checkedSegments.has(segment.id)}
                handleSegmentCheckChange={(segment_id) => this.handleSegmentCheckChange(segment_id)}
                handleSegmentTranslationChange={(event, segment_id) => this.handleSegmentTranslationChange(event, segment_id)}
                handleEditSegment={(segment_id) => this.handleEditSegment(segment_id)}
                handleCardFormChange={(event, card, segment_id) => this.handleCardFormChange(event, card, segment_id)}
                removeCardFromSegment={(card, segment_id) => this.removeCardFromSegment(card, segment_id)}
                segment={segment}
            />
        ); 
    }

    render() {
        return (<div className="segmentBuilderContainer">
            <GridContainer>
                <GridItem sm={12}>
                    <GridItem sm={3}>
                        <h2>Segment Builder</h2>
                    </GridItem>
                    <GridItem sm={6}>
                        <Button color="rose" onClick={() => this.mergeCheckedSegments()}>
                            Merge selected segments
                        </Button>
                        <Button color="warning" onClick={() => this.splitCheckedSegments()}>
                            Split selected segments
                        </Button>
                    </GridItem>
                </GridItem>
                <GridItem sm={9}> 
                    <h4>Segments</h4>
                    <div className="segmentsContainer">
                        {Object.values(this.state.segments).sort((segmentA, segmentB)=>{
                            return segmentA.index - segmentB.index
                        }).map((segment) => this.generateSegment(segment))}
                    </div>
                </GridItem>
                <GridItem sm={3}>
                    <h5>Cards available for segment: 
                        {this.state.selectedEditSegment && " " + this.state.segments[this.state.selectedEditSegment].phrase}</h5>
                    <GridContainer className="availableCards">
                        {Object.values(this.props.cards).sort((cardA, cardB)=> {
                            return cardA.front_text - cardB.front_text
                        }).reduce((cards, card) => {
                            if(this.state.selectedEditSegment
                                && !this.state.segments[this.state.selectedEditSegment].cards.has(card._id))
                                    cards.push(this.generateCard(card, false)); 
                            return cards; 
                        }, [])}
                    </GridContainer>
                </GridItem>
            </GridContainer>
        </div>);
    }

}

SegmentBuilder.propTypes = {
    sentence: PropTypes.string.isRequired, 
    segments: PropTypes.object,
    // handleSegmentsChange: PropTypes.func.isRequired
}; 


const mapStateToProps = segmentBuilderSelector(); 
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps, null, { withRef: true}); 

export default compose(
    withConnect
)(SegmentBuilder); 