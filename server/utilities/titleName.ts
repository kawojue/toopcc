const titleName = (nameToTitle: string): string => {
    const names = nameToTitle.split(' ')
    const titledNames: string[] = []

    for (const n of names) {
        titledNames.push(n.charAt(0).toUpperCase() + n.slice(1).toLowerCase())
    }

    return titledNames.join(' ')
}

export default titleName