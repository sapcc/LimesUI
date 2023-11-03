import React from "react";
import { TopNavigation, TopNavigationItem } from "juno-ui-components";

const AvailabilityZoneNav = (props) => {

    return (
        <TopNavigation>
            {Object.keys(props.az).map((az) =>
                <TopNavigationItem
                    key={az}
                    onClick={() => { props.setCurrentAZ(az) }}
                    active={az === props.currentAZ}
                >
                    {az}
                </TopNavigationItem>
            )}
        </TopNavigation>
    )
}

export default AvailabilityZoneNav
