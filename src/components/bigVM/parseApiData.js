export function parseApiData(data) {
  const filterRule = "hana_";
  const availabilityZones = data?.placeable_vms?.result_per_availability_zone;
  if (!availabilityZones) return [];
  const result = Object.keys(availabilityZones)
    .sort()
    .map((az) => {
      const entry = { availabilityZone: az, flavors: [] };
      const flavors = availabilityZones[az]?.placeable_vms;
      if (!flavors) {
        return entry;
      }
      Object.keys(flavors)
        .sort()
        .forEach((fname) => {
          if (fname.startsWith(filterRule) && flavors[fname] > 0) {
            entry.flavors.push({ [fname]: flavors[fname] });
          }
        });
      return entry;
    });
  return result;
}
