import { STRINGS } from "./constants"

const perFlavorRx = /^instances_(.+)$/

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

//A sorting method for resources in a category. This is not just a predicate
//because we need to traverse the entire list to compute individual sorting
//keys.
export const sortByLogicalOrderAndName = (resources) => {
    const sortingKeysByName = {}
    let sortingKeyForName
    sortingKeyForName = (resName) => {
      const cached = sortingKeysByName[resName]
      if (cached) {
        return cached
      }
      const res = resources.find((res) => res.name == resName)
      const parts = []
      if (res.contained_in) {
        parts.push(sortingKeyForName(res.contained_in))
        parts.push("000") //ensure that `contained_in` resources are sorted before `scales_with` resources
      }
      if (res.scales_with) {
        parts.push(sortingKeyForName(res.scales_with.resource_name))
      }
      parts.push(t(resName))
      const key = parts.join("/")
      sortingKeysByName[resName] = key
      return key
    }
  
    return resources.sort((resA, resB) => {
      const keyA = sortingKeyForName(resA.name)
      const keyB = sortingKeyForName(resB.name)
      return keyA < keyB ? -1 : keyA > keyB ? 1 : 0
    })
  }
