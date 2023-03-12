import React, { useEffect } from "react";
import '../styles/style.css';
import { useState } from "react";
import axios from "axios";
import { EduDig } from "./eduDig";
import { Answer } from "./answer";
import { Footer } from "./footer"
import styled from "styled-components";

const StyledInput = styled.input`
    width: 77vw;
    max-width: 320px;
    padding: 8px;
    margin: 8px;
    border: none;
    border-bottom-color: grey;
    border-bottom-width: 1.5px;
    border-bottom-style: solid;
    font-family: 'Monda', Courier, monospace;
    &::placeholder {
        color: black;
    }

    @media screen and (min-width: 1024px){
        width: 20vw;
    }
`
const StyledInputNumber = styled.input`
    width: 77vw;
    max-width: 320px;
    padding: 8px;
    margin: 8px;
    border: none;
    border-bottom-color: grey;
    border-bottom-width: 1.5px;
    border-bottom-style: solid;
    font-family: 'Monda', Courier, monospace;
    &::placeholder {
        color: black;
    }

    @media screen and (min-width: 1024px){
        width: 10vw;
        max-width: 75px;
    }
`
const StyledSelect = styled.select`
    border: none;
    width: 80vw;
    max-width: 330px; 
    font-family: 'Monda', Courier, monospace;

    @media screen and (min-width: 1024px){
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

    @media screen and (min-width: 1024px){
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
    font-weight: bold;
    font-size: 1rem;
    &:hover {
        background-color: #FFCD8F; 
    }
    &: disabled {
        background-color: #949494;
        &:hover {
            background-color: #949494;
            cursor: auto;
        }
    }
    @media screen and (min-width: 1024px){
        width: 20vw;
        max-width: 20vw;
    }   
`
export const Main = () => {
    const [zone, setZone] = useState("");
    const [protocol, setProtocol] = useState("udp");
    const [queryType, setQueryType] = useState("A");
    const [server, setServer] = useState("8.8.8.8");
    const [responseData, setResponseData] = useState([]);
    const [content, setContent] = useState(<EduDig />);
    const [port, setPort] = useState("53");
    const [recursion, setRecursion] = useState(true)

    useEffect ( () => {
        if (responseData.length > 0 ){
            setContent(<Answer data={responseData} />)
        }
    },[responseData]);

    const handelSubmit = (e) => {
        e.preventDefault();
        const reqData = {"Zone":`${zone}`, "Nameserver":`${server}`,"Transport":`${protocol}`, "Qtype":`${queryType}`, "Port":`${port}`,"Recursion": `${recursion}`}
        axios.post("http://localhost:8053/digish", reqData)
        //axios.post("http://edudig.se:8053/digish", reqData)
        .then(response => {
            setResponseData([reqData,response.data])
            setZone("");
        })
        .catch(error => {
            console.error(error)
            //setErrorResponse(error)
        })
    }

    return <><div className="main">
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
                <StyledInput type="text" className="zone" onChange={(e) => setZone(e.target.value)} value={zone} placeholder="zone"></StyledInput>
                <StyledSelectBorder>
                    <StyledSelect value={protocol} id="protocol" onChange={(e) => setProtocol(e.target.value)}>
                        <option>udp</option>
                        <option>tcp</option>
                    </StyledSelect>
                </StyledSelectBorder>
                <StyledSubmit type="submit" value="digish" disabled={!zone}></StyledSubmit>
            </form>
        </header>
        <div className="contentWrap">
            {content}
        </div>
        <Footer />
    </div>
    </>
}