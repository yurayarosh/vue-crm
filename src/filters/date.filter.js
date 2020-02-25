export default function dateFilter(value, format) {
  const options =
    format === 'date-time'
      ? {
          hour12: false,
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        }
      : {
          hour12: false,
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }

  return new Intl.DateTimeFormat('uk-UA', options).format(value)
}
