import React from "react";

export const ClassroomIcon = (props) => {
    return(
        <div className="classroomIcon" onClick={props.onClick}>
            <svg className="classroomIcon" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 15H11C11.5523 15 12 15.4477 12 16V18H10H9H6V16C6 15.4477 6.44772 15 7 15Z" stroke="#070D0C" stroke-width="2"/>
                <path d="M1 18H31V20C31 20.5523 30.5523 21 30 21H2C1.44772 21 1 20.5523 1 20V18Z" stroke="#070D0C" stroke-width="2"/>
                <rect x="1" y="1" width="30" height="20" rx="1" stroke="#070D0C" stroke-width="2"/>
                <path d="M19.8309 29.6744L16.9445 22L18.1188 22L20.7837 29.3219C20.8797 29.5855 20.7438 29.877 20.4801 29.973C20.2185 30.0682 19.9289 29.9351 19.8309 29.6744Z" stroke="#070D0C" stroke-width="2"/>
                <path d="M11.1302 29.3472L13.8044 22L14.6097 22L12.0381 29.6647C11.9521 29.9211 11.6717 30.0562 11.4176 29.9637C11.168 29.8729 11.0393 29.5969 11.1302 29.3472Z" stroke="#070D0C" stroke-width="2"/>
            </svg>
        </div>
    )
}
