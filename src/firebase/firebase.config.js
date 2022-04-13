import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import {
  doc,
  getFirestore,
  collection,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  arrayRemove,
  arrayUnion,
} from 'firebase/firestore'
import { store } from '../redux/store'
//afraz's
const firebaseConfig = {
  apiKey: 'AIzaSyAZe1x41vl5v6CZkPYS7Xp9sXM9Ob-peaE',
  authDomain: 'appointment-scheduling-94e48.firebaseapp.com',
  projectId: 'appointment-scheduling-94e48',
  storageBucket: 'appointment-scheduling-94e48.appspot.com',
  messagingSenderId: '298616759818',
  appId: '1:298616759818:web:6905b57ee0939dc415e1f3',
  measurementId: 'G-MV7D36GQES',
}
//walids'
// const firebaseConfig = {
//   apiKey: 'AIzaSyAVdpfk7A7KAPifC9E1wQ4UXwgTWGS3LoA',
//   authDomain: 'appointment-schedular-db573.firebaseapp.com',
//   projectId: 'appointment-schedular-db573',
//   storageBucket: 'appointment-schedular-db573.appspot.com',
//   messagingSenderId: '794215624641',
//   appId: '1:794215624641:web:f1f637146b81e89788c940',
//   measurementId: 'G-T7E82G5J0E',
// }
const firebase = initializeApp(firebaseConfig)

export const auth = getAuth()
export const db = getFirestore(firebase)
export const googleProvider = new GoogleAuthProvider()
export const getdoc = getDoc

export const googleSignIn = async () =>
  await signInWithPopup(auth, googleProvider)
export const emailSignUp = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password)
export const emailSignIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)
export const logout = signOut(auth)

export const isUserAuthenticated = () => {
  return new Promise((res, rej) => {
    const unsub = onAuthStateChanged(
      auth,
      (user) => {
        unsub()
        res(user)
      },
      rej
    )
  })
}
export const createUserInFirestore = async (user, additionalData) => {
  if (!user) {
    console.log('No user found')
    return
  }
  const { displayName, email } = user
  const createdAt = new Date()
  const docRef = doc(db, 'users', `${user.uid}`)
  const docSnap = await getDoc(docRef)

  try {
    if (docSnap.exists()) {
      console.log('Already Exists - Not Overwrited')
    } else {
      await setDoc(docRef, {
        displayName,
        email,
        createdAt,
        isAdmin: false,
        approve: false,
        id: user.uid,
        ...additionalData,
      })
    }
  } catch (error) {
    console.log('eoorr', error.message)
  }
  return docRef
}

export const deleteDbAppointment = async (appointment) => {
  let { userReducer } = store.getState()

  await deleteDoc(
    doc(
      db,
      'users',
      `${userReducer.currentUser.id}`,
      'appointments',
      appointment.id
    )
  )
  const newDocRef = doc(db, 'hospitals', appointment.hospital.hospital_id)

  console.log(appointment.dateAndTime)
  await updateDoc(newDocRef, {
    busySlots: arrayRemove(
      // appointment.dateAndTime
      {
        start: appointment.dateAndTime,
        end: appointment.dateAndTime,
      }
    ),
  })
}

export const addAppointmentInDb = async (payload) => {
  let { userReducer } = store.getState()
  let id = Math.random().toString(16).slice(2)
  const docRef = doc(
    db,
    'users',
    userReducer.currentUser.id,
    'appointments',
    id
  )

  await setDoc(docRef, { id: id.toString(), ...payload })
  const newDocRef = doc(db, 'hospitals', payload.hospital.hospital_id)
  await updateDoc(newDocRef, {
    busySlots: arrayUnion(
      // payload.dateAndTime
      {
        start: payload.dateAndTime,
        end: payload.dateAndTime,
      }
    ),
  })
}

export const gettingAppointmentsFromDb = async () => {
  let { userReducer } = store.getState()

  const dataRef = await getDocs(
    collection(db, 'users', userReducer.currentUser.id, 'appointments')
  )
  let appointments = []
  dataRef.forEach((doc) => {
    appointments.push(doc.data())
  })
  return appointments
}

export const gettingHospitalsFromDb = async () => {
  const dataRef = await getDocs(collection(db, 'hospitals'))
  let hospitals = []
  dataRef.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    hospitals.push(doc.data())
  })
  return hospitals
}

export const addHospital = async (element) => {
  let id = Math.random().toString(16).slice(2)
  const docRef = doc(db, 'hospitals', id)

  await setDoc(docRef, { id: id.toString(), ...element })
}
// eslint-disable-next-line
export const addHospitalsInBulk = async (hospitals) => {
  for (let i = 0; i < hospitals.length; i++) {
    await addHospital(hospitals[i])
  }
}
