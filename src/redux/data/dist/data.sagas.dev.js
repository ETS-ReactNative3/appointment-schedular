"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gettingAppointments = gettingAppointments;
exports.gettingAppointmentsStart = gettingAppointmentsStart;
exports.gettingHospitals = gettingHospitals;
exports.gettingHospitalsStart = gettingHospitalsStart;
exports.addAppointment = addAppointment;
exports.addAppointmentStart = addAppointmentStart;
exports.deleteAppointment = deleteAppointment;
exports.deleteAppointmentStart = deleteAppointmentStart;

var _effects = require("redux-saga/effects");

var _firebase = require("../../firebase/firebase.config");

var _data = require("./data.actions");

var _browser = _interopRequireDefault(require("@emailjs/browser"));

var _reactToastify = require("react-toastify");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(gettingAppointments),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(gettingAppointmentsStart),
    _marked3 =
/*#__PURE__*/
regeneratorRuntime.mark(gettingHospitals),
    _marked4 =
/*#__PURE__*/
regeneratorRuntime.mark(gettingHospitalsStart),
    _marked5 =
/*#__PURE__*/
regeneratorRuntime.mark(addAppointment),
    _marked6 =
/*#__PURE__*/
regeneratorRuntime.mark(addAppointmentStart),
    _marked7 =
/*#__PURE__*/
regeneratorRuntime.mark(deleteAppointment),
    _marked8 =
/*#__PURE__*/
regeneratorRuntime.mark(deleteAppointmentStart);

var serviceId = 'service_mit8rf8';
var templateId = 'template_r58sfcl';
var emailUserId = 'Mu2UP1XpstqejldSf';

function gettingAppointments() {
  var appointments;
  return regeneratorRuntime.wrap(function gettingAppointments$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _firebase.gettingAppointmentsFromDb)();

        case 3:
          appointments = _context.sent;
          _context.next = 6;
          return (0, _effects.put)((0, _data.gettingAppointmentsSuccess)(appointments));

        case 6:
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          alert(_context.t0.message);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[0, 8]]);
}

function gettingAppointmentsStart() {
  return regeneratorRuntime.wrap(function gettingAppointmentsStart$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.takeLatest)('GETTING_APPOINTMENTS_START', gettingAppointments);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}

function gettingHospitals() {
  var hospitals;
  return regeneratorRuntime.wrap(function gettingHospitals$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return (0, _firebase.gettingHospitalsFromDb)();

        case 3:
          hospitals = _context3.sent;
          _context3.next = 6;
          return (0, _effects.put)((0, _data.gettingHospitalSuccess)(hospitals));

        case 6:
          _context3.next = 13;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          alert(_context3.t0.message);
          _context3.next = 13;
          return (0, _effects.put)((0, _data.gettingHospitalFailed)(_context3.t0.message));

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, null, [[0, 8]]);
}

function gettingHospitalsStart() {
  return regeneratorRuntime.wrap(function gettingHospitalsStart$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _effects.takeLatest)('GETTING_HOSPITALS_START', gettingHospitals);

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4);
}

function addAppointment(_ref) {
  var payload;
  return regeneratorRuntime.wrap(function addAppointment$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          payload = _ref.payload;
          _context5.prev = 1;
          _context5.next = 4;
          return (0, _firebase.addAppointmentInDb)(payload);

        case 4:
          _context5.next = 6;
          return _browser["default"].send(serviceId, templateId, {
            reply_to: payload.email,
            message: "You have booked an appointment at ".concat(payload.dateAndTime, " located at ").concat(payload.hospital.hospital_name, ", ").concat(payload.region)
          }, emailUserId).then(function (result) {
            console.log(result.text);
          }, function (error) {
            console.log(error.text);
          });

        case 6:
          _context5.next = 8;
          return _browser["default"].send(serviceId, templateId, {
            reply_to: payload.hospital.doctor_email,
            from_name: payload.name,
            message: "You have new appointment from ".concat(payload.name, " at ").concat(payload.dateAndTime, " located at ").concat(payload.hospital.hospital_name, ", ").concat(payload.region)
          }, emailUserId).then(function (result) {
            console.log(result.text);
          }, function (error) {
            console.log(error.text);
          });

        case 8:
          _context5.next = 10;
          return _reactToastify.toast.success('Appointment Createad Successfully');

        case 10:
          _context5.next = 12;
          return (0, _effects.put)((0, _data.gettingHospitalStart)());

        case 12:
          _context5.next = 14;
          return (0, _effects.put)((0, _data.addAppointmentSuccess)());

        case 14:
          _context5.next = 21;
          break;

        case 16:
          _context5.prev = 16;
          _context5.t0 = _context5["catch"](1);
          alert(_context5.t0.message);
          _context5.next = 21;
          return (0, _effects.put)((0, _data.addAppointmentFailed)(_context5.t0.message));

        case 21:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5, null, [[1, 16]]);
}

function addAppointmentStart() {
  return regeneratorRuntime.wrap(function addAppointmentStart$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return (0, _effects.takeLatest)('ADD_APPOINTMENT', addAppointment);

        case 2:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked6);
}

function deleteAppointment(_ref2) {
  var payload;
  return regeneratorRuntime.wrap(function deleteAppointment$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          payload = _ref2.payload;
          _context7.prev = 1;
          _context7.next = 4;
          return (0, _firebase.deleteDbAppointment)(payload);

        case 4:
          _context7.next = 6;
          return _browser["default"].send(serviceId, templateId, {
            reply_to: payload.email,
            message: "You have deleted your appointment that was at ".concat(payload.dateAndTime, ", located at ").concat(payload.hospital.hospital_name, ", ").concat(payload.region)
          }, emailUserId).then(function (result) {
            console.log(result.text);
          }, function (error) {
            console.log(error.text);
          });

        case 6:
          _context7.next = 8;
          return _browser["default"].send(serviceId, templateId, {
            reply_to: payload.hospital.doctor_email,
            from_name: payload.name,
            message: "You appointment from ".concat(payload.name, " at ").concat(payload.dateAndTime, " located at ").concat(payload.hospital.hospital_name, ", ").concat(payload.region, " has been deleted")
          }, emailUserId).then(function (result) {
            console.log(result.text);
          }, function (error) {
            console.log(error.text);
          });

        case 8:
          _context7.next = 10;
          return (0, _effects.put)((0, _data.deleteAppointmentSuccess)());

        case 10:
          _context7.next = 12;
          return alert('Appointment deleted');

        case 12:
          _context7.next = 14;
          return window.location.reload();

        case 14:
          _context7.next = 21;
          break;

        case 16:
          _context7.prev = 16;
          _context7.t0 = _context7["catch"](1);
          _context7.next = 20;
          return (0, _effects.put)((0, _data.deleteAppointmentFailed)());

        case 20:
          alert(_context7.t0.message);

        case 21:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked7, null, [[1, 16]]);
}

function deleteAppointmentStart() {
  return regeneratorRuntime.wrap(function deleteAppointmentStart$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return (0, _effects.takeLatest)('DELETE_APPOINTMENT_START', deleteAppointment);

        case 2:
        case "end":
          return _context8.stop();
      }
    }
  }, _marked8);
}