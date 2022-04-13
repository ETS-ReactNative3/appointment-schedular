"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addHospitalsInBulk = exports.addHospital = exports.gettingHospitalsFromDb = exports.gettingAppointmentsFromDb = exports.addAppointmentInDb = exports.deleteDbAppointment = exports.createUserInFirestore = exports.isUserAuthenticated = exports.logout = exports.emailSignIn = exports.emailSignUp = exports.googleSignIn = exports.getdoc = exports.googleProvider = exports.db = exports.auth = void 0;

var _app = require("firebase/app");

var _auth = require("firebase/auth");

var _firestore = require("firebase/firestore");

var _store = require("../redux/store");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var firebaseConfig = {
  apiKey: 'AIzaSyAVdpfk7A7KAPifC9E1wQ4UXwgTWGS3LoA',
  authDomain: 'appointment-schedular-db573.firebaseapp.com',
  projectId: 'appointment-schedular-db573',
  storageBucket: 'appointment-schedular-db573.appspot.com',
  messagingSenderId: '794215624641',
  appId: '1:794215624641:web:f1f637146b81e89788c940',
  measurementId: 'G-T7E82G5J0E'
};
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
};

exports.gettingHospitalsFromDb = gettingHospitalsFromDb;

var addHospital = function addHospital(element) {
  var id, docRef;
  return regeneratorRuntime.async(function addHospital$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          id = Math.random().toString(16).slice(2);
          docRef = (0, _firestore.doc)(db, 'hospitals', id);
          _context7.next = 4;
          return regeneratorRuntime.awrap((0, _firestore.setDoc)(docRef, _objectSpread({
            id: id.toString()
          }, element)));

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
}; // eslint-disable-next-line


exports.addHospital = addHospital;

var addHospitalsInBulk = function addHospitalsInBulk(hospitals) {
  var i;
  return regeneratorRuntime.async(function addHospitalsInBulk$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          i = 0;

        case 1:
          if (!(i < hospitals.length)) {
            _context8.next = 7;
            break;
          }

          _context8.next = 4;
          return regeneratorRuntime.awrap(addHospital(hospitals[i]));

        case 4:
          i++;
          _context8.next = 1;
          break;

        case 7:
        case "end":
          return _context8.stop();
      }
    }
  });
};

exports.addHospitalsInBulk = addHospitalsInBulk;