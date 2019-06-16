import { CARGA_DATOS_OKAY, CARGA_DATOS_FAIL } from "../actions/datos";

const stateInicial = {
    cargandoBloques: true,
    bloques: [],
    salones: [],
    errorCargaBloques: ''
};

export function datos(state = stateInicial, action) {
    switch( action.type ) {

        case CARGA_DATOS_OKAY:

            return {
                ...state,
                cargandoBloques: false,
                errorCargaBloques: '',
                bloques: action.datos.bloques,
                salones: action.datos.salones
            };

        case CARGA_DATOS_FAIL:

            return {
                ...state,
                cargandoBloques: false,
                errorCargaBloques: action.error,
                bloques: [],
                salones: []
            };

        default:
            return state;
    }
}
