import React, { useEffect } from "react";
import '../styles/style.css';
import { useState } from "react";
import axios from "axios";
import { EduDig } from "./eduDig";
import { Answer } from "./answer";
import styled from "styled-components";
import CopySymbol from "../images/CopySymbol.svg"

const StyledInput = styled.input`
    width: 77vw;
    max-width: 320px;
    padding: 8px;
    margin 8px;
    border: none;
    border-bottom-color: grey;
    border-bottom-width: 1.5px;
    border-bottom-style: solid;
    font-family: 'Monda', Courier, monospace;
    &::placeholder {
        color: black;
    }

    @media screen and (min-width: 500px){
        width: 20vw;
    }
`
const StyledInputNumber = styled.input`
    width: 77vw;
    max-width: 320px;
    padding: 8px;
    margin 8px;
    border: none;
    border-bottom-color: grey;
    border-bottom-width: 1.5px;
    border-bottom-style: solid;
    font-family: 'Monda', Courier, monospace;
    &::placeholder {
        color: black;
    }

    @media screen and (min-width: 500px){
        width: 10vw;
        max-width: 75px;
    }
`
const StyledSelect = styled.select`
    border: none;
    width: 80vw;
    max-width: 330px; 
    font-family: 'Monda', Courier, monospace;

    @media screen and (min-width: 500px){
        width: 10vw;
        max-width: 75px;
    }
`
const StyledSelectBorder = styled.div`
    margin: 8px;
    padding-bottom: 8px;
    width: 80vw;
    max-width: 330px; 
    border-bottom-color: grey;
    border-bottom-width: 1.5px;
    border-bottom-style: solid;

    @media screen and (min-width: 500px){
        width: 10vw;
        max-width: 75px;
    }
`
const StyledSubmit = styled.input`
    margin: 8px;
    margin-top: 20px;
    padding: 8px;
    background-color: #FF8C00;
    border-radius: 10px;
    border: none;
    height: 45px;
    width: 80vw;
    max-width: 340px; 
    cursor: pointer;
    font-family: 'Monda', Courier, monospace;
    font-weight: blod;
    font-size: 1 rem;
    &:hover {
        background-color: #FFCD8F; 
    }
    @media screen and (min-width: 500px){
        width: 20vw;
        max-width: 20vw;
    }   
`
const StyledTipBox = styled.div`
    background-color: #49A671;
    border-bottom-left-radius: 50px;
    border-top-right-radius: 50px;
    margin: auto;
    padding: 16px;
    text-align: left;
    display: flex;
    flex-direction: column;
    width: 50vw;
`
const StyledTerminal = styled.div`
    background-color: #070D0C;
    border-radius: 10px;
    color: white;
    font-family: 'Monda', Courier, monospace;
    padding-left: 12px;
    padding-right: 12px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 12px;
`

export const Main = () => {
    const [zone, setZone] = useState("");
    const [protocol, setProtocol] = useState("udp");
    const [queryType, setQueryType] = useState("A");
    const [server, setServer] = useState("8.8.8.8");
    const [responseData, setResponseData] = useState("");
    const [errorResponse, setErrorResponse] = useState("")
    const [content, setContent] = useState(<EduDig />);
    const [port, setPort] = useState("53");
    const [recursion, setRecursion] = useState(true)

    useEffect ( () => {
        if (responseData != "" ){
            setContent(<Answer data={responseData} />)
        }
    },[responseData]);
    const handelSubmit = (e) => {
        e.preventDefault();
        console.log("zone:"+zone,"recursion:"+recursion,protocol,queryType,port,server);
        const reqData = {"Zone":`${zone}`, "Nameserver":`${server}`,"Transport":`${protocol}`, "Qtype":`${queryType}`, "Port":`${port}`,"Recursion": `${recursion}`}
        axios.post("http://localhost:8053/digish", reqData)
        .then(response => {
            setResponseData(response.data)
        })
        .catch(error => {
            setErrorResponse(error)
        })
    }

    return <div className="main">
            <header>
            <h1>EduDig</h1>
            <form className="digInput" onSubmit={handelSubmit}>
                <StyledInput value={server} id="server" onChange={(e) => setServer(e.target.value)}></StyledInput>
                <StyledInputNumber type="number" value={port} id="port" onChange={(e) => setPort(e.target.value)}></StyledInputNumber>
                <StyledSelectBorder>
                    <StyledSelect value={recursion} onChange={(e) => setRecursion(e.target.value)}>
                        <option>true</option>
                        <option>false</option>
                    </StyledSelect>
                </StyledSelectBorder>
                <StyledSelectBorder>
                    <StyledSelect value={queryType} id="QueryType" onChange={(e) => setQueryType(e.target.value)}>
                        <option>A</option>
                        <option>NS</option>
                        <option>SOA</option>
                        <option>MX</option>
                        <option>DNSKEY</option>
                    </StyledSelect>
                </StyledSelectBorder>
                <StyledInput type="text" className="zone" onChange={(e) => setZone(e.target.value)} placeholder="zone"></StyledInput>
                <StyledSelectBorder>
                    <StyledSelect value={protocol} id="protocol" onChange={(e) => setProtocol(e.target.value)}>
                        <option>udp</option>
                        <option>tcp</option>
                    </StyledSelect>
                </StyledSelectBorder>
                <StyledSubmit type="submit" value="digish"></StyledSubmit>
            </form>
        </header>
        <StyledTipBox className="tipBox">
            <h2>Tip!</h2>
            <h4>Copy and paste this line into your terminal</h4>
            <StyledTerminal className="terminal">
                <p>dig @{server} -p {port} {queryType} {zone} +{protocol}</p>
                <div className="copyBtn" onClick={() => 
                    {navigator.clipboard.writeText(`dig @${server} -p ${port} ${queryType} ${zone} +${protocol}`)}
                    }>             
                </div>
            </StyledTerminal>
        </StyledTipBox>
        {content}
    </div>
}