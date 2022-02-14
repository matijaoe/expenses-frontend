import dayjs from 'dayjs'

export enum DateFormat {
  SHORT = 'MMM D, YYYY',
  LONG = 'MMMM D, YYYY',
}

export enum DateTimeFormat {
  LONG = 'DD.MM.YYYY. HH:mm:ss',
}

export const useDate = () => {
  const formatDate = (
    date: Date | string,
    dateFormat: DateFormat = DateFormat.SHORT
  ) => dayjs(date).format(dateFormat)

  const formatDateTime = (date: Date | string) => {
    return dayjs(date).format(DateTimeFormat.LONG)
  }

  return {
    formatDate,
    formatDateTime,
  }
}
