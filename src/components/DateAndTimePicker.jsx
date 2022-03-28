import React from 'react'
import '@mobiscroll/react/dist/css/mobiscroll.min.css'
import { Datepicker, Page, setOptions } from '@mobiscroll/react'
import Card from 'material-ui/Card'

setOptions({
  theme: 'ios',
  themeVariant: 'light',
})

function DateAndTimePicker({ hospital, handleAppointmentDateAndTime }) {
  const min = hospital.vaccinationPeriodStart
  const max = hospital.vaccinationPeriodEnd
  return (
    <Card>
      <Page className="md-calendar-booking">
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
      </Page>
    </Card>
  )
}

export default DateAndTimePicker
