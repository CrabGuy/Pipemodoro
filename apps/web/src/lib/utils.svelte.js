export const average = (numbers) => {
    if (numbers.length === 0) return 0

    const sum = numbers.reduce((acc, num) => acc + num, 0)
    return sum / numbers.length
}

export const most_frequent = (arr) => {
    if (arr.length === 0) return null

    const frequency_map = arr.reduce((acc, val) => {
        acc[val] = (acc[val] ?? 0) + 1
        return acc
    }, {})

    return Object.entries(frequency_map)
        .reduce((a, b) => (b[1] >= a[1] ? b : a))[0]
}

export const nothing = () => {}