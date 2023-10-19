import { STRINGS } from "./constants"

// Translates API-level strings into user-readable UI strings,
// e.g. "volumev2" -> "Block Storage".
export const t = (str) => {
    const translated = STRINGS[str]
    if (translated) {
        return translated
    }

    //for baremetal flavor resources like "instances_zh2vic1.medium",
    //return the flavor name, e.g. "zh2vic1.medium"
    const match = perFlavorRx.exec(str)
    return match ? match[1] : str
}

// This can be used as a sorting predicate:
//     sorted_things = things.sort(byUIString)
export const byUIString = (a, b) => {
    const aa = t(a)
    const bb = t(b)
    return aa < bb ? -1 : aa > bb ? 1 : 0
}
