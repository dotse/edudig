import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
    width: 100%;
    max-width: 1200px;
    height: 90px;
    background-color: #51A69D;
    position: fixed;
    bottom: 0;
    margin-top: 120px;
    text-align: left;
`

const StyledColumn = styled.div`
    margin: 16px;
    padding: 16px;
    display: flex;
    flex-direction: column;
`

const StyledLink = styled.a`
    color: white;
    font-family: 'Courier New', Courier, monospace;
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: bold;
    &:hover {
        text-decoration: underline;
    }
`

export const Footer = () => {
    return <StyledFooter>
        <StyledColumn>
            <StyledLink href="https://github.com/dotse/edudig" target="_blank">EduDig GitHub</StyledLink>
            <StyledLink href="https://github.com/dotse/edudig" target="_blank">EduDig GitHub</StyledLink>
        </StyledColumn>
    </StyledFooter>
}