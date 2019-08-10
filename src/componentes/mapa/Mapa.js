import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import './Mapa.css';
import getLogoMarker from '../../assets/imgs/markers/';
import ReactDOM from 'react-dom';

class Mapa extends Component {

    watchId;

    state = {
        mostrandoInfoWindow: false,  
        activeMarker: {},          
        marcadorSeleccionado: {},
        posicionActual: undefined     
    };

    componentDidMount() {
        if ( navigator && navigator.geolocation ) {

            this.watchId = navigator.geolocation.watchPosition(pos => {
                console.log('Posición actual', pos);

                if (pos != null && pos.coords != null ) {

                    this.setState({
                        posicionActual: {
                            latitud: pos.coords.latitude,
                            longitud: pos.coords.longitude
                        }
                    })
                }


            }, (error) => {
                console.log('Error al obtener posicion', error);
            })

        }
    }

    componentWillUnmount() {
        if ( navigator && navigator.geolocation ) {
            navigator.geolocation.clearWatch(this.watchId);
        }
    }

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

                    {
                        this.state.posicionActual && 
                            <Marker 
                                position={{ 
                                    lat: this.state.posicionActual.latitud, 
                                    lng: this.state.posicionActual.longitud }} 
                            />
                    }
                    
                    <InfoWindowEnvoltura
                        marker={this.state.activeMarker}
                        visible={this.state.mostrandoInfoWindow}
                    >

                    
                        <div
                            onClick={ (e) => this.props.onClickInfowindow( this.state.marcadorSeleccionado.idBloque) }
                            className="cont-info-window" 
                        >
                            <img 
                                src={ `https://api.ubicor.alvarezcristian.com/bloques/${ this.state.marcadorSeleccionado.codigoBloque }/1.jpg` } 
                                alt={`Imagen del bloque ${ this.state.marcadorSeleccionado.codigoBloque}`}
                            />

                            <h4>{this.state.marcadorSeleccionado.nombre}</h4>
                        </div>
                            
                    </InfoWindowEnvoltura>
                    
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

/**
 * Este componente se creó para envolver el infowindow y agregarle un onClick
 * y así poder escuchar los eventos de click sobre él, debido a que no los acepta por defecto
 */
class InfoWindowEnvoltura extends Component {
    constructor(props) {
        super(props);
        this.infoWindowRef = React.createRef();
        this.contentElement = document.createElement(`div`);
    }

    componentDidUpdate(prevProps) {

        if (this.props.children !== prevProps.children) {

            ReactDOM.render(
                React.Children.only(this.props.children),
                this.contentElement
            );

            this.infoWindowRef.current.infowindow.setContent(this.contentElement);
        }
    }

    render() {
        return <InfoWindow ref={this.infoWindowRef} {...this.props} />;
    }
}

/**
 * La lista de marckers está hecha de tal manera que no se actualice cada vez que se le
 * de click a un marker ya que esto cambia el estado de su componente padre, pero el
 * no se actualiza si la lista de markers es la misma
 */
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
                                idBloque={ bloque.id }
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