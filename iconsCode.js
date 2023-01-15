export const ICONS = new Map()

addIcons([0, 1], 'sun-solid')
addIcons([2], 'sun-cloud')
addIcons([3], 'cloud-solid')
addIcons([45, 48], 'smog')
addIcons([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82], 'rain')
addIcons([71, 73, 75, 77, 85, 86], 'snow')
addIcons([95, 96, 99], 'thunder')


function addIcons(values, icon) {
    values.forEach(value => {
        ICONS.set(value, icon)
    })
}

