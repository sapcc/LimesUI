import React from "react";
import { t, sortByLogicalOrderAndName, tracksQuota } from "../../lib/utils";
import Resource from "./Resource";

const categoryTitle = `
    text-lg 
    mb-4 
    font-bold 
    col-span-full 
    text-theme-hig
    `;
const categoryContent = `
    grid
    gap-4 
    grid-cols-[repeat(auto-fit,_minmax(34rem,_1fr))]
    `;

// TODO: for domain/cluster level add tracksQuota which skips resource that do not track quota.

const Category = (props) => {
  const { categoryName, canEdit, advancedView } = props;
  const { area, resources } = props.category;
  const forwardProps = {
    categoryName,
    area,
    canEdit,
  };

  const editableResources = resources.filter(
    (res) => res.editableResource === true
  );

  //for usage-only resources with no quota of their own, this finds
  //the resource they're ultimately "contained_in"
  function getContainingResourceFor(resName) {
    const res = resources.find((res) => res.name === resName);
    if (res.contained_in) {
      return getContainingResourceFor(res.contained_in);
    }
    return res;
  }

  return (
    (editableResources.length > 0 || advancedView) && (
      <div className="category-container mb-4">
        <h1 className={`category-title ${categoryTitle}`}>
          {t(props.categoryName)}
        </h1>
        <div className={`category-content ${categoryContent}`}>
          {sortByLogicalOrderAndName(
            advancedView ? resources : editableResources
          ).map((res) => (
            <Resource
              key={res.name}
              resource={res}
              {...forwardProps}
              tracksQuota={tracksQuota(res)}
              parentResource={getContainingResourceFor(res.name)}
            />
          ))}
        </div>
      </div>
    )
  );
};

export default Category;
