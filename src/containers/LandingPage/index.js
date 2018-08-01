// React/Redux
import React from 'react'; 

import './styles.css'; 

class LandingPage extends React.Component {
    render() {
        return (
            <div className="landingContainer">
                <h1>Welcome to the Dianoia admin page!</h1>
                <h3>
                    Login to begin creating and editing translations for the Dianoia App. 
                </h3>
            </div>
        );
    }
}

export default LandingPage; 