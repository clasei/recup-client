export const howManyDaysAgo = (date) => {
  const currentDate = new Date().setHours(0, 0, 0, 0)
  const recommendationDate = new Date(date).setHours(0, 0, 0, 0) 
  const diffTime = currentDate - recommendationDate
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) // convert to days -- ago
  
  // Return singular or plural "day(s)"
  if (diffDays === 0) {
    return "today"
  } else if (diffDays === 1) {
    return `${diffDays} day ago`
  } else {
    return `${diffDays} days ago`
  }
}
