import React from 'react'; 
import { PropTypes } from 'prop-types';

import Button from 'md-components/CustomButtons/Button';

import {
    PlayArrow
} from "@material-ui/icons";
  

import './styles.css';

class AudioPlayer extends React.Component {


    play() {
        this.audio.play()
    }

    render() {

       return(<div>
            <audio 
                src={this.props.audioSource}
                ref={(audio) => this.audio = audio}
            />
            <Button color="rose" justIcon round onClick={() => this.play()}>
                <PlayArrow/>
            </Button>
        </div>);
    }
}

AudioPlayer.propTypes = {
    audioSource: PropTypes.string.isRequired
}

export default AudioPlayer; 