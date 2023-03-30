import React from "react";
import styled from "styled-components";
import { GithubIcon } from "../icons/githubIcon";
import { ClassroomIcon } from '../icons/classroomIcon'
import { useState } from "react";

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
    display: flex;
    flex-direction: row;
    align-items: center;

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
const StyledText = styled.p`
    width: 300px;
    font-size: 0.85rem;
    color: white;
    margin: 0px;
`

export const Footer = (props) => {
    const [classroomView, setClassroomView] = useState('');
    const handleViewStateClick = () => {
        setClassroomView(!classroomView)
        props.viewState(classroomView)
    }
    return <StyledFooter>
        <div className="footerWrap">
            <StyledColumn>
                <StyledLink href="https://github.com/dotse/edudig" target="_blank">
                    <GithubIcon />
                </StyledLink>
            </StyledColumn>
            <StyledColumn onClick={handleViewStateClick} className="classroomIconWrap">
                <ClassroomIcon />
                <StyledText>Use this to switch between classroom view and terminal view. Classroom view shows all unused flags and sections.</StyledText> 
            </StyledColumn>
        </div>
    </StyledFooter>
}