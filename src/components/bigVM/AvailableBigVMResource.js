import React from "react";
import { t } from "../../lib/utils";
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

const AvailableBigVMResource = (props) => {
  return (
    <div className="mb-4">
      <h1 className={`category-title ${categoryTitle}`}>
        {t(props.categoryName)}
      </h1>
    </div>
  );
};

export default AvailableBigVMResource;
