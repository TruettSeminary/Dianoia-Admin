import React from 'react'; 
import { PropTypes } from 'prop-types'; 

import GridContainer from 'md-components/Grid/GridContainer'; 
import GridItem from 'md-components/Grid/GridItem'; 
import Button from "md-components/CustomButtons/Button.jsx";
import CustomInput from "md-components/CustomInput/CustomInput.jsx";

import Paper from 'material-ui/Paper/Paper';
import Checkbox from 'material-ui/Checkbox/Checkbox'; 
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';

import {
    Edit,
    Delete
} from '@material-ui/icons';

class CardSection extends React.Component {
    
    render() {
        return (
            <GridContainer>
                <GridItem sm={1}>
                    <Button round justIcon simple color="danger" onClick={() => this.props.removeCardFromSegment(this.props.card)}>
                        <Delete/>
                    </Button>
                </GridItem>
                <GridItem sm={3}>
                    <h5>{this.props.card.front_text}</h5>
                </GridItem>
                <GridItem sm={8}>
                    <CustomInput
                        labelText='Form'
                        type="text"
                        inputProps={{
                            type: 'text',
                            value: this.props.card.form,
                            onChange: (event) => this.props.handleCardFormChange(event, this.props.card),
                            classes: {
                                root: 'input'
                            }
                        }}
                        formControlProps={{
                            fullWidth: true
                        }}
                    />
                </GridItem>
            </GridContainer>
        ); 
    }
}



class SegmentRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: false
        }
    }

    handleClickEdit() {
        this.setState({
            edit: true
        });

        this.props.handleEditSegment(this.props.segment.id); 
    }

    handleClickAway() {
        this.setState({
            edit: false
        })
    }

    render() {
        return(
            <ClickAwayListener onClickAway={() => this.handleClickAway()}>
            <div className="segmentRow">
                <Paper className="segmentPaper">
                    <GridContainer>
                        <GridItem sm={1}>
                            <Checkbox
                                checked={this.props.checked}
                                onChange={this.props.handleSegmentCheckChange(this.props.segment.id)}
                            />
                        </GridItem>
                        <GridItem sm={2}>
                            Phrase: <p className="segmentPhrase">{this.props.segment.phrase}</p>
                        </GridItem>
                        <GridItem sm={3}>
                            <CustomInput
                                labelText='Translation'
                                id={`${this.props.segment.id}:translation`}
                                type="text"
                                inputProps={{
                                    type: 'text',
                                    value: this.props.segment.translation,
                                    onChange: (event) => this.props.handleSegmentTranslationChange(event, this.props.segment.id),
                                    classes: {
                                        root: 'input'
                                    }
                                }}
                                formControlProps={{
                                    fullWidth: true
                                }}
                            />
                        </GridItem>
                        <GridItem sm={6}>
                            <GridContainer>
                                <GridItem sm={1}>
                                    Cards
                                    <Button round justIcon color="primary" onClick={() => this.handleClickEdit()}>
                                        <Edit/>
                                    </Button>
                                </GridItem>
                                <GridItem sm={11} className="segmentCards">
                                    {[...this.props.segment.cards.values()].sort((cardA, cardB) => {
                                        return cardA.front_text - cardB.front_text
                                    }).map((card) => {
                                        return <div key={card.id}>
                                            <CardSection 
                                                card={card}
                                                removeCardFromSegment={(card) => this.props.removeCardFromSegment(card, this.props.segment.id) }
                                                handleCardFormChange={(event, card) => this.props.handleCardFormChange(event, card, this.props.segment.id)}
                                            />
                                        </div>
                                    })}
                                </GridItem>
                            </GridContainer>
                        </GridItem>
                    </GridContainer>
                </Paper>
            </div>
            </ClickAwayListener>
        )
    }
}

SegmentRow.propTypes = {
    segment: PropTypes.object.isRequired,
    checked: PropTypes.bool.isRequired,
    handleSegmentCheckChange: PropTypes.func.isRequired, 
    handleSegmentTranslationChange: PropTypes.func.isRequired, 
    handleEditSegment: PropTypes.func.isRequired,
    handleCardFormChange: PropTypes.func.isRequired,
    removeCardFromSegment: PropTypes.func.isRequired
}

export default SegmentRow; 