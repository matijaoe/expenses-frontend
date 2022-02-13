import dayjs from 'dayjs'

export enum DateFormat {
  SHORT = 'MMM D, YYYY',
  LONG = 'MMMM D, YYYY',
}

export const useDate = () => {
  const formatDate = (
    date: Date | string,
    dateFormat: DateFormat = DateFormat.SHORT
  ) => dayjs(date).format(dateFormat)

  return { formatDate }
}
