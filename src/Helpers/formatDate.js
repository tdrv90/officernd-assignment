// format date to DD MMM YYYY format

const formatDate = (entry) => {
    const dateToFormat = new Date(entry)

    const day = dateToFormat.getDate()
    const month = dateToFormat.toLocaleString('default', { month: 'short' });
    const year = dateToFormat.getFullYear()

    return `${day} ${month} ${year}`
}

export default formatDate