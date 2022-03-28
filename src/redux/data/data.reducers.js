const initialState = {
  message: 'hello',
  sending: false,
  faculties: [],
  loading: false,
  success: false,
  appointments: [],
  hospitals: [],
}

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_APPOINTMENT':
    case 'DELETE_APPOINTMENT_START':
      return { ...state, loading: true }
    case 'CLEAR_SUCCESS':
      return { ...state, success: false }
    case 'SIGN_OUT_SUCCESS':
      return { ...state, appointments: [] }
    case 'ADD_APPOINTMENT_SUCCESS':
    case 'DELETE_APPOINTMENT_SUCCESS':
      return Object.assign({}, state, {
        loading: false,
        success: true,
      })

    case 'ADD_APPOINTMENT_FAILED':
      return Object.assign({}, state, {
        loading: false,
        success: true,
      })
    case 'GETTING_APPOINTMENTS_SUCCESS':
      return Object.assign({}, state, {
        appointments: action.payload,
        loading: false,
      })
    case 'GETTING_HOSPITALS_SUCCESS':
      return Object.assign({}, state, {
        hospitals: action.payload,
        loading: false,
      })
    default:
      return state
  }
}
