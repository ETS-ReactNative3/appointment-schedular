import { all, call } from 'redux-saga/effects'

import {
  signInWithGoogleStart,
  signInWithEmailStart,
  settingUserPersistenceStart,
  signOut,
  signUp,
} from './user/users.sagas'
import {
  gettingAppointmentsStart,
  addAppointmentStart,
  deleteAppointmentStart,
  gettingHospitalsStart,
} from './data/data.sagas'

export default function* rootSaga() {
  yield all([
    call(settingUserPersistenceStart),
    call(signInWithGoogleStart),
    call(signInWithEmailStart),
    call(signOut),
    call(signUp),
    call(addAppointmentStart),
    call(gettingAppointmentsStart),
    call(deleteAppointmentStart),
    call(gettingHospitalsStart),
  ])
}
