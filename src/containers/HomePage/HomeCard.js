import React from 'react'; 
import PropTypes from 'prop-types'; 

import Card from "md-components/Card/Card.jsx";
import CardBody from "md-components/Card/CardBody.jsx";

import './styles.css'; 

class HomeCard extends React.Component {

    render() {
        return(
            <div className="homeCard" onClick={() => this.props.editTranslation()}>
                <Card>
                    <CardBody>
                        <h3>{this.props.translation.name || 'Unnamed Translation'}</h3>
                        <h4>{this.props.translation.sentence}</h4>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

HomeCard.propTypes = {
    translation: PropTypes.object.isRequired,
    editTranslation: PropTypes.func.isRequired
}

export default HomeCard;