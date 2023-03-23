import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
    padding: 10px;
    margin: 10px;
`

const StyledInfoBox = styled.div`
    background-color: #49A671;
    border-bottom-left-radius: 100px;
    border-top-right-radius: 100px;
    align-items: center;
    margin: auto;
    padding: 5vw;
`

const StyledH2= styled.h2`
    font-family: 'Monda', Courier, monospace;
    font-size: 2rem;
    color: #FDFFFE;
`

export const EduDig = () => {
    const content =(<div className="textFeild">
    <StyledH2>What is EduDig?</StyledH2>
    <p>Dig is the defacto standard DNS troubleshooting tool. Sadly dig is not always available and has a little bit of a learning curve. EduDig is a web 'dig' that is both useful and educational. This will enable domain name owners to more easily be able to troubleshoot on their own domain issues and hopefully spread knowledge about the workings of the Domain Name System and how to use dig.</p>
    <p>To get started replace 'zone' with the domain/zone you want to inspect</p>
    </div>)

    return <StyledWrapper className="wrapper">
        <StyledInfoBox className="edudigContent">
            {content}
        </StyledInfoBox>
    </StyledWrapper>
}