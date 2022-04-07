"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startHospitalsSedders = exports.gettingHospitalsFromDb = exports.gettingAppointmentsFromDb = exports.addAppointmentInDb = exports.deleteDbAppointment = exports.createUserInFirestore = exports.isUserAuthenticated = exports.logout = exports.emailSignIn = exports.emailSignUp = exports.googleSignIn = exports.getdoc = exports.googleProvider = exports.db = exports.auth = void 0;

var _app = require("firebase/app");

var _auth = require("firebase/auth");

var _firestore = require("firebase/firestore");

var _store = require("../redux/store");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var firebaseConfig = {
  apiKey: 'AIzaSyAZe1x41vl5v6CZkPYS7Xp9sXM9Ob-peaE',
  authDomain: 'appointment-scheduling-94e48.firebaseapp.com',
  projectId: 'appointment-scheduling-94e48',
  storageBucket: 'appointment-scheduling-94e48.appspot.com',
  messagingSenderId: '298616759818',
  appId: '1:298616759818:web:6905b57ee0939dc415e1f3',
  measurementId: 'G-MV7D36GQES'
}; //walids'
// const firebaseConfig = {
//   apiKey: 'AIzaSyAVdpfk7A7KAPifC9E1wQ4UXwgTWGS3LoA',
//   authDomain: 'appointment-schedular-db573.firebaseapp.com',
//   projectId: 'appointment-schedular-db573',
//   storageBucket: 'appointment-schedular-db573.appspot.com',
//   messagingSenderId: '794215624641',
//   appId: '1:794215624641:web:f1f637146b81e89788c940',
//   measurementId: 'G-T7E82G5J0E',
// }

var firebase = (0, _app.initializeApp)(firebaseConfig);
var auth = (0, _auth.getAuth)();
exports.auth = auth;
var db = (0, _firestore.getFirestore)(firebase);
exports.db = db;
var googleProvider = new _auth.GoogleAuthProvider();
exports.googleProvider = googleProvider;
var getdoc = _firestore.getDoc;
exports.getdoc = getdoc;

var googleSignIn = function googleSignIn() {
  return regeneratorRuntime.async(function googleSignIn$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _auth.signInWithPopup)(auth, googleProvider));

        case 2:
          return _context.abrupt("return", _context.sent);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.googleSignIn = googleSignIn;

var emailSignUp = function emailSignUp(email, password) {
  return (0, _auth.createUserWithEmailAndPassword)(auth, email, password);
};

exports.emailSignUp = emailSignUp;

var emailSignIn = function emailSignIn(email, password) {
  return (0, _auth.signInWithEmailAndPassword)(auth, email, password);
};

exports.emailSignIn = emailSignIn;
var logout = (0, _auth.signOut)(auth);
exports.logout = logout;

var isUserAuthenticated = function isUserAuthenticated() {
  return new Promise(function (res, rej) {
    var unsub = (0, _auth.onAuthStateChanged)(auth, function (user) {
      unsub();
      res(user);
    }, rej);
  });
};

exports.isUserAuthenticated = isUserAuthenticated;

var createUserInFirestore = function createUserInFirestore(user, additionalData) {
  var displayName, email, createdAt, docRef, docSnap;
  return regeneratorRuntime.async(function createUserInFirestore$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (user) {
            _context2.next = 3;
            break;
          }

          console.log('No user found');
          return _context2.abrupt("return");

        case 3:
          displayName = user.displayName, email = user.email;
          createdAt = new Date();
          docRef = (0, _firestore.doc)(db, 'users', "".concat(user.uid));
          _context2.next = 8;
          return regeneratorRuntime.awrap((0, _firestore.getDoc)(docRef));

        case 8:
          docSnap = _context2.sent;
          _context2.prev = 9;

          if (!docSnap.exists()) {
            _context2.next = 14;
            break;
          }

          console.log('Already Exists - Not Overwrited');
          _context2.next = 16;
          break;

        case 14:
          _context2.next = 16;
          return regeneratorRuntime.awrap((0, _firestore.setDoc)(docRef, _objectSpread({
            displayName: displayName,
            email: email,
            createdAt: createdAt,
            isAdmin: false,
            approve: false,
            id: user.uid
          }, additionalData)));

        case 16:
          _context2.next = 21;
          break;

        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](9);
          console.log('eoorr', _context2.t0.message);

        case 21:
          return _context2.abrupt("return", docRef);

        case 22:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[9, 18]]);
};

exports.createUserInFirestore = createUserInFirestore;

var deleteDbAppointment = function deleteDbAppointment(appointment) {
  var _store$getState, userReducer, newDocRef;

  return regeneratorRuntime.async(function deleteDbAppointment$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _store$getState = _store.store.getState(), userReducer = _store$getState.userReducer;
          _context3.next = 3;
          return regeneratorRuntime.awrap((0, _firestore.deleteDoc)((0, _firestore.doc)(db, 'users', "".concat(userReducer.currentUser.id), 'appointments', appointment.id)));

        case 3:
          newDocRef = (0, _firestore.doc)(db, 'hospitals', appointment.hospital.hospital_id);
          console.log(appointment.dateAndTime);
          _context3.next = 7;
          return regeneratorRuntime.awrap((0, _firestore.updateDoc)(newDocRef, {
            busySlots: (0, _firestore.arrayRemove)( // appointment.dateAndTime
            {
              start: appointment.dateAndTime,
              end: appointment.dateAndTime
            })
          }));

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.deleteDbAppointment = deleteDbAppointment;

var addAppointmentInDb = function addAppointmentInDb(payload) {
  var _store$getState2, userReducer, id, docRef, newDocRef;

  return regeneratorRuntime.async(function addAppointmentInDb$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _store$getState2 = _store.store.getState(), userReducer = _store$getState2.userReducer;
          id = Math.random().toString(16).slice(2);
          docRef = (0, _firestore.doc)(db, 'users', userReducer.currentUser.id, 'appointments', id);
          _context4.next = 5;
          return regeneratorRuntime.awrap((0, _firestore.setDoc)(docRef, _objectSpread({
            id: id.toString()
          }, payload)));

        case 5:
          newDocRef = (0, _firestore.doc)(db, 'hospitals', payload.hospital.hospital_id);
          _context4.next = 8;
          return regeneratorRuntime.awrap((0, _firestore.updateDoc)(newDocRef, {
            busySlots: (0, _firestore.arrayUnion)( // payload.dateAndTime
            {
              start: payload.dateAndTime,
              end: payload.dateAndTime
            })
          }));

        case 8:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.addAppointmentInDb = addAppointmentInDb;

var gettingAppointmentsFromDb = function gettingAppointmentsFromDb() {
  var _store$getState3, userReducer, dataRef, appointments;

  return regeneratorRuntime.async(function gettingAppointmentsFromDb$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _store$getState3 = _store.store.getState(), userReducer = _store$getState3.userReducer;
          _context5.next = 3;
          return regeneratorRuntime.awrap((0, _firestore.getDocs)((0, _firestore.collection)(db, 'users', userReducer.currentUser.id, 'appointments')));

        case 3:
          dataRef = _context5.sent;
          appointments = [];
          dataRef.forEach(function (doc) {
            appointments.push(doc.data());
          });
          return _context5.abrupt("return", appointments);

        case 7:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.gettingAppointmentsFromDb = gettingAppointmentsFromDb;

var gettingHospitalsFromDb = function gettingHospitalsFromDb() {
  var dataRef, hospitals;
  return regeneratorRuntime.async(function gettingHospitalsFromDb$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap((0, _firestore.getDocs)((0, _firestore.collection)(db, 'hospitals')));

        case 2:
          dataRef = _context6.sent;
          hospitals = [];
          dataRef.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            hospitals.push(doc.data());
          });
          return _context6.abrupt("return", hospitals);

        case 6:
        case "end":
          return _context6.stop();
      }
    }
  });
}; // Seed the hospitals


exports.gettingHospitalsFromDb = gettingHospitalsFromDb;
var hospitals = [{
  name: 'National Eye Center (11-A, Sanda Road, Near MAO College Lahore)',
  image_url: 'https://media.istockphoto.com/photos/portrait-of-male-doctor-in-white-coat-and-stethoscope-standing-in-picture-id1327024466?b=1&k=20&m=1327024466&s=170667a&w=0&h=vcw4Exhv4pkR8fMVLNXhNESaKq1HbYwJ1iElLlQBxI0=',
  doctor: {
    name: 'Afraz',
    email: 'afrazmalik321@gmail.com',
    phone: '+92 323 4242424'
  },
  region: 'Alabama',
  startDayTime: '08:00',
  endDayTime: '17:59',
  vaccinationPeriodStart: '2022-03-19T00:00',
  vaccinationPeriodEnd: '2022-09-19T00:00',
  busySlots: [],
  dailyDisabledHours: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '22', '23', '24']
}, {
  name: 'Rashid Hospital (D.H.A Lahore)',
  image_url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZG9jdG9yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  doctor: {
    name: 'Afraz',
    email: 'afrazmalik321@gmail.com',
    phone: '+92 323 4242424'
  },
  region: 'Alabama',
  busySlots: [],
  dailyDisabledHours: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '22', '23', '24']
}, {
  name: 'Bahria International Hospital.',
  image_url: 'https://images.unsplash.com/photo-1605289982774-9a6fef564df8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGRvY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  doctor: {
    name: 'Afraz',
    email: 'afrazmalik321@gmail.com',
    phone: '+92 323 4242424'
  },
  region: 'Alabama',
  busySlots: [],
  dailyDisabledHours: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '22', '23', '24']
}, {
  name: 'St Thomas Hospitals.',
  image_url: 'https://images.unsplash.com/photo-1488998527040-85054a85150e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGRvY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  doctor: {
    name: 'Afraz',
    email: 'afrazmalik321@gmail.com',
    phone: '+92 323 4242424'
  },
  region: 'Alabama',
  busySlots: [],
  dailyDisabledHours: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '22', '23', '24']
}, {
  name: 'Whittington Hospital',
  image_url: 'https://images.unsplash.com/photo-1488998527040-85054a85150e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGRvY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  doctor: {
    name: 'Afraz',
    email: 'afrazmalik321@gmail.com',
    phone: '+92 323 4242424'
  },
  region: 'New York city',
  busySlots: [],
  dailyDisabledHours: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '22', '23', '24']
}, {
  name: 'Royal London Hospital',
  image_url: 'https://media.istockphoto.com/photos/medical-doctor-indoors-portraits-picture-id1323303738?b=1&k=20&m=1323303738&s=170667a&w=0&h=EfPDQj0UOiLRyoZy-ZSWi7XYFeRqL4hG0N7GhDla0_I=',
  doctor: {
    name: 'Afraz',
    email: 'afrazmalik321@gmail.com',
    phone: '+92 323 4242424'
  },
  region: 'New York city',
  busySlots: [],
  dailyDisabledHours: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '22', '23', '24']
}, {
  name: 'The London Clinic',
  image_url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGRvY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  doctor: {
    name: 'Afraz',
    email: 'afrazmalik321@gmail.com',
    phone: '+92 323 4242424'
  },
  region: 'New York city',
  busySlots: [],
  dailyDisabledHours: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '22', '23', '24']
}, {
  name: 'St Marys Hospital',
  image_url: 'https://study.com/cimages/videopreview/videopreview-full/7hfyoyse54.jpg',
  doctor: {
    name: 'Afraz',
    email: 'afrazmalik321@gmail.com',
    phone: '+92 323 4242424'
  },
  region: 'New York city',
  busySlots: [],
  dailyDisabledHours: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '22', '23', '24']
}, {
  name: 'Cleveland Clinic',
  image_url: 'https://thumbs.dreamstime.com/b/hospital-entrance-emergency-sign-43544491.jpg',
  doctor: {
    name: 'Afraz',
    email: 'afrazmalik321@gmail.com',
    phone: '+92 323 4242424'
  },
  region: 'New York city',
  busySlots: [],
  dailyDisabledHours: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '22', '23', '24']
}, {
  name: '	Massachusetts General Hospital',
  image_url: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Royal_Brompton_Hospital-geograph-2105200.jpg',
  doctor: {
    name: 'Afraz',
    email: 'afrazmalik321@gmail.com',
    phone: '+92 323 4242424'
  },
  region: 'New York city',
  busySlots: [],
  dailyDisabledHours: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '22', '23', '24']
}, {
  name: 'Toronto General (University Health Network)',
  image_url: 'https://d2v9ipibika81v.cloudfront.net/uploads/sites/76/USAID-1-1140x684.jpg',
  doctor: {
    name: 'Afraz',
    email: 'afrazmalik321@gmail.com',
    phone: '+92 323 4242424'
  },
  region: 'New York city',
  busySlots: [],
  dailyDisabledHours: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '22', '23', '24']
}, {
  name: 'Vaasa h',
  image_url: 'https://d2v9ipibika81v.cloudfront.net/uploads/sites/76/USAID-1-1140x684.jpg',
  doctor: {
    name: 'WA',
    email: 'walid.wise6792@gmail.com',
    phone: '+92 323 4242424'
  },
  region: 'Vaasa',
  busySlots: [],
  dailyDisabledHours: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '22', '23', '24']
}]; // eslint-disable-next-line

var startHospitalsSedders = function startHospitalsSedders() {
  var i, element, id, docRef;
  return regeneratorRuntime.async(function startHospitalsSedders$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          i = 0;

        case 1:
          if (!(i < hospitals.length)) {
            _context7.next = 10;
            break;
          }

          element = hospitals[i];
          id = Math.random().toString(16).slice(2);
          docRef = (0, _firestore.doc)(db, 'hospitals', id);
          _context7.next = 7;
          return regeneratorRuntime.awrap((0, _firestore.setDoc)(docRef, _objectSpread({
            id: id.toString()
          }, element)));

        case 7:
          i++;
          _context7.next = 1;
          break;

        case 10:
        case "end":
          return _context7.stop();
      }
    }
  });
};

exports.startHospitalsSedders = startHospitalsSedders;