import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBackIos';
import ForwardIcon from '@material-ui/icons/ArrowForwardIos';
import './SwipeImgs.css';

class SwipeImgs extends Component {

    state = {
        value: 0
    }

    urlImg1 = `http://142.93.71.94/imagenes_unicor/bloques/${ this.props.id }/1.jpg`;
    urlImg2 = `http://142.93.71.94/imagenes_unicor/bloques/${ this.props.id }/2.jpg`;
    urlImg3 = `http://142.93.71.94/imagenes_unicor/bloques/${ this.props.id }/3.jpg`;

    render() {
        return (
            <div className="SwipeImgs">

                <div className="cont-controles">
                    <div className="control"  onClick={this.clickBack}>
                        <IconButton color="inherit">
                            <BackIcon style={{ color: 'white' }} />
                        </IconButton>
                    </div>

                    <div className="control" onClick={this.clickForward} >
                        <IconButton color="inherit">
                            <ForwardIcon style={{ color: 'white' }} />
                        </IconButton>
                    </div>
                </div>

                <SwipeableViews
                        index={this.state.value}
                        onChangeIndex={this.handleChangeIndex}
                    >
                    
                    <div className="cont-img">
                        <img className="img" src={ this.urlImg1 } alt={`Imagen 1 bloque ${ this.props.id }`}/>
                    </div>

                    <div className="cont-img">
                        <img className="img" src={ this.urlImg2 } alt={`Imagen 2 bloque ${ this.props.id }`}/>
                    </div>

                    <div className="cont-img">
                        <img className="img" src={ this.urlImg3 } alt={`Imagen 3 bloque ${ this.props.id }`}/>
                    </div>

                </SwipeableViews>

            </div>
        );
    }

    handleChangeIndex = (value) => {
        this.setState({
            value: value
        });
    }

    clickBack = () => {
        if (this.state.value > 0) {
            this.setState( prevState => {
                return { 
                    value: prevState.value - 1 
                }
            });
        }
    }

    clickForward = () => {
        if (this.state.value < 2) {
            this.setState( prevState => {
                return { 
                    value: prevState.value + 1 
                }
            });
        }
    }

}

export default SwipeImgs;