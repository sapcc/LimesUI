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

export class Unit {
  constructor(name) {
    // Special unit case: unit names starting with a digit (e.g., "128 GiB", "128GiB")
    const match = name?.match(/^(?<value>\d+)\s*(?<unit>[a-zA-Z]+)$/);
    this.isSpecialUnit = !!match;
    if (this.isSpecialUnit) {
      this.name = "";
      const { value, unit } = match.groups;
      const defaultUnitData = { base: "", steps: 0 };
      this.specialUnitData = { value: parseInt(value, 10) || 0, ...(units[unit] || defaultUnitData) };
      this.unitData = defaultUnitData;
      const specialUnitBaseData = bases[this.specialUnitData.base] || { scale: "none" };
      this.specialUnitScaleData = scales[specialUnitBaseData.scale];
    } else {
      this.name = name || "";
      this.unitData = units[this.name] || { base: name, steps: 0 };
    }
    const baseData = bases[this.unitData.base] || { scale: "none" };
    this.scaleData = scales[baseData.scale];
  }

  // specialUserConversion takes the user input amount: X for a special unit and converts the result to display form.
  specialUnitConversion(amount) {
    const parsed = this.parse(amount);
    if (parsed?.error) {
      return null;
    }
    return this.specialUnitFormat(parsed);
  }

  // specialUnitFormat formats the total amount of a special unit with its actual unit.
  specialUnitFormat(amount) {
    return this.format(amount * this.specialUnitData.value, { specialUnit: true });
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
    //convert value into bigger units if available
    let steps, base, scaleData;
    if (options.specialUnit && this.specialUnitData) {
      steps = this.specialUnitData.steps;
      base = this.specialUnitData.base;
      scaleData = this.specialUnitScaleData;
    } else {
      steps = this.unitData.steps;
      base = this.unitData.base;
      scaleData = this.scaleData;
    }

    const prefix = value < 0 ? "-" : "";
    value = Math.abs(value);

    while (value >= scaleData.step && steps + 1 < scaleData.prefixes.length) {
      value /= scaleData.step;
      steps += 1;
    }

    const displayUnit = scaleData.prefixes[steps] + base;

    //round value down like printf("%.2f")
    value = Math.round(value * 100) / 100;

    if (displayUnit == "") {
      return prefix + value.toString();
    } else {
      //if possible, join with narrow no-break space instead of regular space
      const space = options.ascii ? " " : "\u202F";
      return prefix + value + space + displayUnit;
    }
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
  parse(input, commitment = true) {
    //check overall syntax "<value> [<unit>]"
    const baseMatch = /^\s*([0-9.,]+)\s*([a-zA-Z]*)\s*$/.exec(input);
    if (baseMatch === null) {
      return { error: "syntax" };
    }

    //for values with unit, an explicit unit must be given
    if (this.name != "" && baseMatch[2] == "") {
      return { error: "syntax" };
    }

    if (baseMatch[1] == 0 && commitment) {
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

//Renders a value for display on the UI.
export const valueWithUnit = (value, unit) => {
  const title = unit.name !== "" ? `${value} ${unit.name}` : undefined;
  return (
    <span className="value-with-unit" title={title}>
      {unit.isSpecialUnit ? unit.specialUnitFormat(value) : unit.format(value)}
    </span>
  );
};
