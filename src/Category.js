import React from "react";
import { t } from "./utils"

const Category = (props) => {
    return (


                <h1 className="mb-4 text-2xl font-bold">{t(props.categoryName)}</h1>
   
    )
}

export default Category
