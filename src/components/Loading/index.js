// React/Redux
import React from 'react'; 

import "./styles.css"; 

class Loading extends React.Component {

    render() {
        return (
            <div className="spinContainer">
                <div className="spinner"></div>
            </div>
        );
    }
}

export default Loading; 