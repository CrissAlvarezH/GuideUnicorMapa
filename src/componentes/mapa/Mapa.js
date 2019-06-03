import React, { Component } from "react";
import { Map, GoogleApiWrapper } from 'google-maps-react';
import './Mapa.css';


class Mapa extends Component {

    render() {
        return (
            <div className="cont-map">
                <Map 
                    className="map"
                    google={this.props.google}
                    zoom={18}
                    initialCenter={{
                        lat: 8.7893886,
                        lng: -75.8585653
                    }}
                />
            </div>
        );
    }

}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDM-z4FF6sC6onNXyZXl17wZyGRg4tuok8'
})(Mapa);