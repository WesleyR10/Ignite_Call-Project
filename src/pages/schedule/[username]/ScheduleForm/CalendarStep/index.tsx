import { Calendar } from '../../../../../components/Calendar'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { api } from '../../../../../lib/axios'
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'

interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const router = useRouter()

  const isDateSelected = !!selectedDate // Aqui é utilizado para verificar se a data foi selecionada habilitando o TimePicker
  const username = String(router.query.username)

  // Mostrar somente se o dia da semana estiver selecionado (SelectedDate) - Responsável por mostrar dia por escrito
  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null 
  const describedDate = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

    const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null
  
    const { data: availability } = useQuery<Availability>({
      queryKey: ['availability', selectedDateWithoutTime],
      queryFn: async () => {
        const response = await api.get(`/users/${username}/availability`, {
          params: {
            date: selectedDateWithoutTime,
          },
        })
  
        return response.data
      },
      enabled: !!selectedDate,
    })

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
          {weekDay} <span>{describedDate}</span>
          </TimePickerHeader>

          <TimePickerList>
          {availability?.possibleTimes.map((hour) => {
              return (
                <TimePickerItem
                  key={hour}
                  disabled={!availability.availableTimes.includes(hour)}
                >
                  {String(hour).padStart(2, '0')}:00h
                </TimePickerItem>
              )
            })}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}