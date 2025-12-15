import React from "react";
import MenuItemBuilder from "./MenuItemBuilder";

const useMarketplaceAction = (props) => {
  const { commitment, marketplaceModalFn, updateActions } = props;

  React.useEffect(() => {
    if (!marketplaceModalFn) return;
    const menuItem = (
      <MenuItemBuilder
        icon="download"
        text="Receive"
        callBack={() => {
          marketplaceModalFn(true);
        }}
      />
    );
    updateActions("receive", menuItem, null);
  }, [commitment]);
};

export default useMarketplaceAction;
