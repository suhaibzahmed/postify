export function formatDate(inputDate: Date | undefined): string {
  const inpDate = inputDate as Date
  const date = new Date(inpDate)

  const day = date.getDate().toString().padStart(2, '0') // Ensure two-digit day
  const month = date.toLocaleString('en-US', { month: 'short' }) // Get three-letter month
  const year = date.getFullYear().toString().slice(-2) // Get last two digits of the year

  return `${day} ${month}-${year}`
}
