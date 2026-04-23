// SPDX-FileCopyrightText: 2024 SAP SE or an SAP affiliate company
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { arrayFlatMap, objectFromEntries } from "./polyfill";

const bases = {
  "": { scale: "none" }, // countable things
  B: { scale: "iec" }, // bytes (B, KiB, MiB, etc.)
};

const scales = {
  none: {
    step: 1,
    prefixes: [""],
  },
  iec: {
    step: 1024,
    prefixes: ["", "Ki", "Mi", "Gi", "Ti", "Pi", "Ei"],
  },
};

const units = objectFromEntries(
  arrayFlatMap(Object.entries(bases), ([base, props]) =>
    scales[props.scale].prefixes.map((prefix, idx) => [prefix + base, { base, steps: idx }])
  )
);

const synonyms = {
  K: "Ki",
  M: "Mi",
  G: "Gi",
  T: "Ti",
  P: "Pi",
  E: "Ei",
};

const resolveSynonym = (str) => {
  //`resolveSynonym(str)` is like `synonyms[str]`, but with case-insensitive matching
  for (var synonym in synonyms) {
    if (synonym.toLowerCase() == str.toLowerCase()) {
      return synonyms[synonym];
    }
  }
  return str;
};

// Unit class - handles regular units like "MiB", "GiB", "B", ""
class Unit {
  constructor(name) {
    this.name = name || "";
    this.isStandardUnit = true;
    this.unitData = units[this.name] || { base: name, steps: 0 };
    const baseData = bases[this.unitData.base] || { scale: "none" };
    this.scaleData = scales[baseData.scale];
  }

  formatForInput(value, options) {
    return this.format(value, options);
  }

  //Formats a value in this unit. May use bigger units for big values. For
  //example:
  //
  //    Unit('MiB').format(10)    => '10 MiB'
  //    Unit('MiB').format(10240) => '10 GiB'
  //
  //The option `ascii: true` restricts the generated string to ASCII, e.g.
  //replacing fancy non-breaking spaces with regular old ASCII spaces. This is
  //useful for input fields since the user is likely to type regular spaces.
  //
  format(value, options = {}) {
    let steps = this.unitData.steps;
    let base = this.unitData.base;
    const prefix = value < 0 ? "-" : "";
    value = Math.abs(value);

    while (value >= this.scaleData.step && steps + 1 < this.scaleData.prefixes.length) {
      value /= this.scaleData.step;
      steps += 1;
    }

    const displayUnit = this.scaleData.prefixes[steps] + base;

    //round value down like printf("%.2f")
    value = Math.round(value * 100) / 100;

    if (displayUnit == "") return prefix + value.toString();
    //if possible, join with narrow no-break space instead of regular space
    const space = options.ascii ? " " : "\u202F";
    return prefix + value + space + displayUnit;
  }

  //Parses a string representation of a value in this unit. The unit may be
  //omitted, and unit prefixes may be replaced with their `synonyms`. Case is
  //ignored when matching prefix and unit names. For example:
  //
  //    Unit('').parse('10')             => 10
  //    Unit('').parse('10 things')      => { error: 'syntax' }
  //    Unit('').parse('10.2')           => { error: 'fractional-value' }
  //
  //    Unit('MiB').parse('10 MiB')      => 10
  //    Unit('MiB').parse('10 gib')      => 10240
  //    Unit('MiB').parse('10g')         => 10240
  //    Unit('MiB').parse('10 whatever') => { error: 'syntax' }
  //    Unit('MiB').parse('10 KiB')      => { error: 'fractional-value' }
  //    Unit('MiB').parse('1024 KiB')    => 1
  parse(input, isCommitment = true) {
    //check overall syntax "<value> [<unit>]"
    const baseMatch = /^\s*([0-9.,]+)\s*([a-zA-Z]*)\s*$/.exec(input);
    if (baseMatch === null) {
      return { error: "syntax" };
    }

    //for values with unit, an explicit unit must be given
    if (this.name != "" && baseMatch[2] == "") {
      return { error: "syntax" };
    }

    if (baseMatch[1] == 0 && isCommitment) {
      return { error: "cannot create empty commitments." };
    }

    //strip base unit if provided (e.g. "KiB" -> "Ki", e.g. "B" => "")
    const unitMatch = new RegExp(`^(.*)${this.unitData.base}$`, "i").exec(baseMatch[2]);
    const givenPrefix = unitMatch === null ? baseMatch[2] : unitMatch[1];

    //recognize prefix (or synonym)
    const prefix = resolveSynonym(givenPrefix).toLowerCase();
    let steps = this.scaleData.prefixes.findIndex((val) => val.toLowerCase() == prefix);
    if (steps === -1) {
      // unknown unit or prefix
      return { error: "syntax" };
    }

    //convert given integer value into the requested unit
    let value = parseFloat(baseMatch[1].replace(/,/g, "."));
    if (isNaN(value)) {
      // illegal formatting, e.g. multiple decimal dots
      return { error: "syntax" };
    }

    //convert larger into smaller units (e.g. GiB into MiB), thus resolving
    //fractional values
    const step = this.scaleData.step;
    const targetSteps = this.unitData.steps;
    if (steps > targetSteps) {
      while (steps > targetSteps) {
        value = value * step;
        steps--;
      }
      value = Math.floor(value);
    }
    if (value != Math.floor(value)) {
      return { error: "fractional-value" };
    }

    //convert smaller into larger units, unless doing so would reintroduce
    //fractional values
    while (steps < targetSteps) {
      if (value % step != 0) return { error: "fractional-value" };
      value = value / step;
      steps++;
    }

    return value;
  }
}

// NonStandardUnit wraps Unit and handles units in the form of: "128 GiB"
class NonStandardUnit {
  constructor(name, multiplier, baseUnitName) {
    this.multiplier = multiplier;
    this.baseUnit = new Unit(baseUnitName);
    this.name = name;
    this.isStandardUnit = false;
    this.isKnownBaseUnit = !!units[baseUnitName];
  }

  formatForInput(value) {
    return value.toString();
  }

  // For known units (like "GiB"), multiply and format with base unit
  // For unknown units (like "XYZ"), show count + full unit name
  format(count, options = {}) {
    if (this.isKnownBaseUnit) {
      return this.baseUnit.format(count * this.multiplier, options);
    }
    const space = options.ascii ? " " : "\u202F";
    return count + space + this.name;
  }

  parse(input, isCommitment = true) {
    const baseMatch = /^\s*([0-9.,]+)\s*$/.exec(input);
    if (!baseMatch) return { error: "syntax" };
    if (baseMatch[1] == 0 && isCommitment) return { error: "cannot create empty commitments." };

    const value = parseFloat(baseMatch[1].replace(/,/g, "."));
    if (isNaN(value) || value != Math.floor(value)) return { error: "fractional-value" };
    return value;
  }
}

// Factory - creates appropriate unit type
function createUnit(name) {
  const match = name?.match(/^(?<value>\d+)\s*(?<unit>[a-zA-Z]+)$/);
  if (match) {
    const { value, unit } = match?.groups;
    return new NonStandardUnit(name, parseInt(value, 10), unit);
  }
  return new Unit(name);
}

// Render helper
const valueWithUnit = (value, unit) => {
  const title = unit.name !== "" ? `${value} ${unit.name}` : undefined;
  return (
    <span className="value-with-unit" title={title}>
      {unit.format(value)}
    </span>
  );
};

export { Unit, NonStandardUnit, createUnit, valueWithUnit };
