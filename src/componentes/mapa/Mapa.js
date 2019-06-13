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

                    <ListaMarkers
                        google={this.props.google}
                        bloques={this.props.bloques}
                        onMarkerClick={this.onMarkerClick}
                    />

                    <InfoWindow

                        marker={this.state.activeMarker}
                        visible={this.state.mostrandoInfoWindow}
                        onClose={this.onCloseInfoWindow}
                    >

                        <div className="cont-info-window" >
                            <img 
                                src={ `http://142.93.71.94/imagenes_unicor/bloques/${ this.state.marcadorSeleccionado.codigoBloque }/1.jpg` } 
                                alt={`Imagen del bloque ${ this.state.marcadorSeleccionado.codigoBloque}`}
                            />

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

class ListaMarkers extends Component {

    constructor(props) {
        super(props);
        this.markersRerended = false;
    }

    shouldComponentUpdate(nextProps, nextState) {
        // Si no hay cambios en los marcadores y ya re-renderamos no volvemos re-rendereamos
        if (JSON.stringify(this.props.places) === JSON.stringify(nextProps.places) && this.markersRerended) {
            return false;
        }

        this.markersRerended = true;
        return true;
    }

    render() {
        return (
            <>
                {
                    this.props.bloques.map( bloque => {
                        let logoMarker = getLogoMarker( bloque.codigo );

                        return (
                            <Marker
                                {...this.props}
                                key={ bloque.id }
                                onClick={this.props.onMarkerClick}
                                nombre={ bloque.nombre }
                                codigoBloque={ bloque.codigo }
                                position={{
                                    lat: bloque.posicion.latitud,
                                    lng: bloque.posicion.longitud
                                }}
                                icon={{
                                    url: logoMarker,
                                    scaledSize:  new this.props.google.maps.Size(32,35)
                                }}
                            />
                        );
                    })
                }
            </>
        );
    }

}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDM-z4FF6sC6onNXyZXl17wZyGRg4tuok8'
})(Mapa);