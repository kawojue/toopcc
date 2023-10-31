const titleName = (nameToTitle: string): string => {
    const names = nameToTitle.split(' ')
    const TitledNames: string[] = []

    for (const n of names) {
        TitledNames.push(n[0].toUpperCase() + n.slice(1))
    }

    return TitledNames.join(' ')
}

export default titleName