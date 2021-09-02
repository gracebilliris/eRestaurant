import React, { Component } from 'react';

import vibes from '../media/restaurantVibes.png'

export default class Home extends Component {
    render() {
        return (
            <div style={{textAlign: "center"}}>
            <h3 style={{color: "light grey"}}><i>Welcome to Le Bistrot d'Andre!</i></h3>
            <img style={{display: "inline", marginRight: "10"}} src={vibes} id="vibes" width="350" alt=""/>
          </div>
        )
    }
}