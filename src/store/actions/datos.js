import 'isomorphic-fetch';

export const CARGA_DATOS_OKAY = '[DATOS] Carga datos okay';
export const CARGA_DATOS_FAIL = '[DATOS] Carga datos fail';

// thunk
export function cargarAsyncDatos(estaMontado) {
    return (dispatch) => {

        // fetch('http://142.93.71.94:4400/bloques/info-bloques', { signal: abortController.signal })
        fetch('http://142.93.71.94:4400/bloques/info-bloques')
            .then( resp => resp.json() )
            .then( data => {

                if (estaMontado) {
                    if ( data.okay ) dispatch( cargaDatosOkay(data.info) );
                    else dispatch( cargaDatosFail(data.error) );
                }
            })
            .catch( error => {

                if (estaMontado) dispatch( cargaDatosFail('Error al pedir los datos') );
            });
      
    }
}

export function cargaDatosOkay(datos) {
    return {
        type: CARGA_DATOS_OKAY,
        datos: datos
    }
}

export function cargaDatosFail(error) {
    return {
        type: CARGA_DATOS_FAIL,
        error: error
    }
}