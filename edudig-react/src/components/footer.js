import React from "react";
import styled from "styled-components";
import { GithubIcon } from "../icons/githubIcon";

const StyledFooter = styled.footer`
    width: 100vw;
    height: 90px;
    background-color: #49A671;
    position: fixed;
    bottom: 0;
    margin-top: 120px;
    text-align: left;
    display: flex;
    justify-content: center;
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
        <div className="footerWrap">
            <StyledColumn>
                <StyledLink href="https://github.com/dotse/edudig" target="_blank">
                    <GithubIcon />
                </StyledLink>
            </StyledColumn>
        </div>
    </StyledFooter>
}