import React, { useState } from 'react'
import { Popup, DatePicker } from 'react-date-time-picker-popup'
import 'react-date-time-picker-popup/dist/index.css'
// import '@mobiscroll/react/dist/css/mobiscroll.min.css'
// import { Datepicker, Page, setOptions } from '@mobiscroll/react'
import Card from 'material-ui/Card'
// setOptions({
//   theme: 'ios',
//   themeVariant: 'light',
// })

function DateAndTimePicker({
  hospital,
  handleAppointmentDateAndTime,
  dateAndTime,
}) {
  const min = hospital.vaccinationPeriodStart
  const max = hospital.vaccinationPeriodEnd
  const [visible, setVisible] = useState(false)
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
        disabledHours={['01', '02', '03']}
        disabledMinutes={['00', '15', '20']}
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
