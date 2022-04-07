import React, { useEffect, useState } from 'react'
import { Popup, DatePicker } from 'react-date-time-picker-popup'
import 'react-date-time-picker-popup/dist/index.css'
// import '@mobiscroll/react/dist/css/mobiscroll.min.css'
// import { Datepicker, Page, setOptions } from '@mobiscroll/react'
import Card from 'material-ui/Card'
// setOptions({
//   theme: 'ios',
//   themeVariant: 'light',
// })
import moment from 'moment'

function useForceUpdate() {
  const [value, setValue] = useState(0) // integer state
  return () => setValue((value) => value + 1) // update the state to force render
}

function DateAndTimePicker({
  hospital,
  handleAppointmentDateAndTime,
  dateAndTime,
}) {
  const forceUpdate = useForceUpdate()

  const min = hospital.vaccinationPeriodStart
  const max = hospital.vaccinationPeriodEnd
  const [disabledMins, setdisabledMins] = useState([])
  const [disabledHours, setdisabledHours] = useState(
    hospital.dailyDisabledHours
  )
  const [visible, setVisible] = useState(false)
  // useEffect(() => {
  //   hospital.busySlots.map((slot) => {
  //     // let slotTime = moment(slot.start).toDate()
  //     let slotTime = moment(slot).toDate()
  //     let date = moment(slotTime).format('DD')
  //     let hour = moment(slotTime).format('HH')
  //     let minute = moment(slotTime).format('mm')
  //     let selectedDate = moment(dateAndTime).format('DD')
  //     let selectedHour = moment(dateAndTime).format('HH')
  //     setdisabledMins([])
  //     if (selectedDate == date && selectedHour == hour) {
  //       var mins = disabledMins
  //       mins.push(`${minute}`)
  //       setdisabledMins(mins)
  //     }
  //     forceUpdate()
  //     // console.log(selectedDate, date, time)
  //   })
  // }, [dateAndTime])

  useEffect(() => {
    hospital.busySlots.map((slot) => {
      let slotStartTime = slot.start
      let slotEndTime = slot.end

      var startTime = moment(slotStartTime)
      var endTime = moment(slotEndTime)

      let date = startTime.format('DD')

      let selectedDate = moment(dateAndTime).format('DD')
      let selectedHour = moment(dateAndTime).format('HH')

      setdisabledMins([])
      setdisabledHours(hospital.dailyDisabledHours)
      if (selectedDate == date) {
        // for disabling hours
        var extractedTime = []
        while (startTime <= endTime) {
          extractedTime.push(new moment(startTime).format('HH:mm'))
          startTime.add(15, 'minutes')
        }
        let dm = extractedTime
          .filter((hour) => hour.split(':')[0] == selectedHour)
          .map((hour) => hour.split(':')[1])
        setdisabledMins(dm)

        const hoursCount = {}
        extractedTime
          .map((hour) => hour.split(':')[0])
          .forEach(function (x) {
            hoursCount[x] = (hoursCount[x] || 0) + 1
          })
        let finalDisablHours = []
        let choteHours = []
        Object.keys(hoursCount).filter((key, index) => {
          hoursCount[key] == 4
            ? finalDisablHours.push(key)
            : choteHours.push(`${key}_${hoursCount[key]}`)
        })

        setdisabledHours([...disabledHours, ...finalDisablHours])
        // for disabling hours
      }
      forceUpdate()
    })
  }, [dateAndTime])
  return (
    <Card>
      {/* <button onClick={() => setVisible(true)}>Show Popup</button> */}
      {/* <Popup visible={visible} setVisible={setVisible}> */}
      <DatePicker
        lang="en"
        selectedDay={dateAndTime || new Date()}
        setSelectedDay={handleAppointmentDateAndTime}
        timeSelector={true}
        minuteInterval={15}
        disabledHours={disabledHours}
        disabledMinutes={disabledMins}
      />
      {/* </Popup>{' '} */}
      {/* <Page className="md-calendar-booking">
        <Datepicker
          placeholder="Click here to select"
          responsive={{
            xsmall: {
              controls: ['calendar', 'timegrid'],
              display: 'bottom',
              touchUi: true,
            },
            large: {
              controls: ['calendar', 'timegrid'],
              display: 'anchored',
              touchUi: true,
            },
          }}
          display="inline"
          controls={['calendar', 'timegrid']}
          min={min}
          max={max}
          minTime={hospital.startDayTime}
          maxTime={hospital.endDayTime}
          stepMinute={15}
          width={null}
          invalid={[
            {
              recurring: {
                repeat: 'weekly',
                weekDays: 'SA,SU',
              },
            },
            ...hospital.busySlots,
          ]}
          cssClass="booking-datetime"
          onChange={(e) => handleAppointmentDateAndTime(e)}
        />
      </Page> */}
    </Card>
  )
}

export default DateAndTimePicker
