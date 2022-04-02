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
  const [disabledHours, setdisabledHours] = useState([])
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    hospital.busySlots.map((slot) => {
      let slotTime = moment(slot.start).toDate()
      let date = moment(slotTime).format('DD')
      let hour = moment(slotTime).format('HH')
      let minute = moment(slotTime).format('mm')
      let selectedDate = moment(dateAndTime).format('DD')
      let selectedHour = moment(dateAndTime).format('HH')
      setdisabledMins([])
      console.log(selectedDate, selectedHour, date, hour)
      if (selectedDate == date && selectedHour == hour) {
        var mins = disabledMins
        mins.push(`${minute}`)
        setdisabledMins(mins)
      }
      forceUpdate()
      // console.log(selectedDate, date, time)
    })
  }, [dateAndTime])
  useEffect(() => {}, [disabledMins])

  console.log(disabledMins)
  // const [day, setDay] = useState(new Date())
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
        // disabledHours={disabledHours}
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