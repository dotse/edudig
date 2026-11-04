import React from "react";

export const CopyIcon = (props) => {
    return(
        <div className="copyIcon" onClick={props.onClick}>
            <svg width="21" height="23" viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8V15C16 15.5523 15.9477 16 16.5 16H19C19.5523 16 20 15.5523 20 15V2C20 1.44772 19.5523 1 19 1H6C5.44772 1 5 1.44772 5 2V6.5C5 7.05228 5.94772 7 6.5 7H15M16 8C16 7.72386 15.2761 7 15 7M16 8V21C16 21.5523 15.5523 22 15 22H2C1.44772 22 1 21.5523 1 21V8C1 7.44772 1.44772 7 2 7H15M16 8C16 7.44772 15.5523 7 15 7" stroke="black" strokeWidth="2"/>
            </svg>
        </div>
    )
}




