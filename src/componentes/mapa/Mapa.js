import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import './Mapa.css';
import getLogoMarker from '../../assets/imgs/markers/';


class Mapa extends Component {

    state = {
        mostrandoInfoWindow: false,  
        activeMarker: {},          
        marcadorSeleccionado: {}         
    };

    render() {
        return (
            <div className="cont-map">
                <Map 
                    onClick={this.onMapClick}
                    className="map"
                    google={this.props.google}
                    zoom={18}
                    styles={[
                        {
                            featureType: "poi",
                            elementType: "labels",
                            stylers: [
                                { visibility: "off" }
                            ]
                        }
                    ]}
                    disableDefaultUI={true}
                    initialCenter={{
                        lat: 8.7893886,
                        lng: -75.8585653
                    }}
                >

                    {
                        this.props.bloques.map( bloque => {
                            let logoMarker = getLogoMarker( bloque.codigo );
                            console.log('Logo marker', logoMarker);

                            return <Marker
                                        key={bloque.id}
                                        onClick={this.onMarkerClick}
                                        nombre={ bloque.nombre }
                                        position={{
                                            lat: bloque.posicion.latitud,
                                            lng: bloque.posicion.longitud
                                        }}
                                        icon={{
                                            url: logoMarker,
                                            scaledSize:  new this.props.google.maps.Size(32,35)
                                        }}
                                    />
                        })
                    }

                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.mostrandoInfoWindow}
                        onClose={this.onCloseInfoWindow}
                    >

                        <div>
                            <h4>{this.state.marcadorSeleccionado.nombre}</h4>
                        </div>
                    </InfoWindow>

                </Map>
            </div>
        );
    }



    onMapClick = (event) => {
        this.onCloseInfoWindow()
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            marcadorSeleccionado: props,
            activeMarker: marker,
            mostrandoInfoWindow: true
        });
    }

    onCloseInfoWindow = props => {
        if (this.state.mostrandoInfoWindow) {
            this.setState({
                mostrandoInfoWindow: false,
                activeMarker: null
            });
        }
    };
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDM-z4FF6sC6onNXyZXl17wZyGRg4tuok8'
})(Mapa);