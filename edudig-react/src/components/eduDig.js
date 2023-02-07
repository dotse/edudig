import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
    padding: 10px;
    margin: 10px;
`

const StyledInfoBox = styled.div`
    background-color: #49A671;
    border-bottom-left-radius: 100px;
    border-top-right-radius: 100px;
    width: 80vw;
    aling-items: center;
    margin: auto;
    padding: 5vw;
`

const StyledH2= styled.h2`
    font-family: 'Monda', Courier, monospace;
    font-size: 2rem;
    color: white;
`

export const EduDig = () => {
    const content =(<div className="textFeild">
    <StyledH2>What is EduDig?</StyledH2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>)

    return <StyledWrapper className="wrapper">
        <StyledInfoBox className="main">
            {content}
        </StyledInfoBox>
    </StyledWrapper>
}