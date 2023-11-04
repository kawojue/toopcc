const titleName = (nameToTitle: string): string => {
    const names = nameToTitle.split(' ')
    const TitledNames: string[] = []

    for (const n of names) {
        TitledNames.push(n.charAt(0).toUpperCase() + n.slice(1).toLowerCase())
    }

    return TitledNames.join(' ')
}

export default titleName