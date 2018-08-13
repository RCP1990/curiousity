import React from 'react';
import './curiousity.css'

class Curiousity extends React.Component {
    render() {
        const { facing, ghost } = this.props;
        return <span className={`curiousity ${facing} ${ghost ? 'ghost' : ''} `}><img src="/images/rover.png" /></span>
    }
};

export default Curiousity;