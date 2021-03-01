import React, { Component } from 'react';

class Image extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { src , alt , className } = this.props
        return ( 
            <img className={className} src={src} alt={alt}/>
         );
    }
}
 
export default Image;