import React from "react";
import '../styles/style.css';
import { useState, useEffect } from "react";
import axios from "axios";
import { EduDig } from "./eduDig";
import { Answer } from "./answer";
import { Footer } from "./footer"
import styled from "styled-components";

const StyledInput = styled.input`
    height: 40px;
    padding-top: 3px;
    padding-left: 8px;
    margin-top: 8px;
    border: none;
    border-bottom-color: lightgrey;
    border-bottom-width: 5px;
    border-bottom-style: solid;
    border-radius: 5px;
    font-family: 'Monda', Courier, monospace;
    font-size: 1rem;
    color: #070D0C;

    &:hover {
        border-bottom-color: #FF8C00;
    }

    &:focus {
        outline: none;
        border-bottom-color: #FF8C00;
    }

    @media screen and (min-width: 1200px){
        margin-top: 8px;
    }
`
const StyledInputNumber = styled.input`
    height: 40px;
    padding-top: 3px;
    padding-left: 8px;
    margin-top: 8px;
    border: none;
    border-bottom-color: lightgrey;
    border-bottom-width: 5px;
    border-bottom-style: solid;
    border-radius: 5px;
    color: #070D0C;
    font-family: 'Monda', Courier, monospace;
    font-size: 1rem;
    &::placeholder {
        color: black;
    }

    &:hover {
        border-bottom-color: #FF8C00;
    }

    &:focus {
        outline: none;
        border-bottom-color: #FF8C00;
    }
`
const StyledSelect = styled.select`
    border: none;
    height: 42px; 
    font-family: 'Monda', Courier, monospace;
    font-size: 1rem;
    color: #070D0C;
    background: white;
    width: 100%;
    &:focus {
        outline: none;
    }
`
const StyledSelectBorder = styled.div`
    margin-top: 6px;
    padding-top: 4px;
    backgorund-color: blue; 
    border-bottom-color: lightgrey;
    border-bottom-width: 5px;
    border-bottom-style: solid;
    border-radius: 5px;
    width: 100%;
    
    &:hover {
        border-bottom-color: #FF8C00;
    }
`

const StyledSubmit = styled.input`

    padding: 8px;
    background-color: #FF8C00;
    border-radius: 10px;
    border: none;
    height: 45px;
    cursor: pointer;
    font-family: 'Monda', Courier, monospace;
    font-weight: bold;
    font-size: 1rem;
    width: 45%;
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
    @media screen and (min-width: 1200px){
        width: 25%;
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
    const [recursion, setRecursion] = useState(true);
    const [dnssec, setDnssec] = useState(true)
    const [state, setState] = useState(false);

    useEffect ( () => {
        if (responseData.length > 0 ){
            setContent(<Answer data={responseData} classroomState={state} />)
        }
    },[responseData, state]);

    const handelSubmit = (e) => {
        e.preventDefault();
        const reqData = {"Zone":`${zone}`, "Nameserver":`${server}`,"Transport":`${protocol}`, "Qtype":`${queryType}`, "Port":`${port}`,"Recursion": `${recursion}`, "DNSSEC":`${dnssec}`}
        const instance = axios.create({
            baseURL: `${window._env_.REACT_APP_baseURL}`},
            )
        instance.post("digish", reqData)
        .then(response => {
            setResponseData([reqData,response.data])
        })
        .catch(error => {
            console.error(error)
            //setErrorResponse(error)
        })
    }

    const handleViewState = (state) => {
        setState(state)
    }

    return <><div className="main">
            <header>
            <h1>EduDig</h1>
            <form className="digInput" onSubmit={handelSubmit}>
                    <div className="labelDiv _inputText">
                        <StyledInput type="text" className="zone inputTooltip" onChange={(e) => setZone(e.target.value)} value={zone} ></StyledInput>
                        <span className="toolTip">Name</span>
                        <label className={`is${zone ? 'active' : ''} `}>name</label>
                    </div>
                    <div className="labelDiv _inputText">
                        <StyledInput value={server} id="server inputTooltip" onChange={(e) => setServer(e.target.value)}></StyledInput>
                        <span className="toolTip">Server</span>
                        <label className={`is${server ? 'active' : ''} `}>server</label>
                    </div>
                    <div className="labelDiv _inputSelect">
                        <StyledInputNumber type="number" value={port} id="port inputTooltip" onChange={(e) => setPort(e.target.value)}></StyledInputNumber>
                        <span className="toolTip">Port</span>
                        <label className={`is${port ? 'active' : ''} `}>port</label>
                    </div>
                    <div className="labelDiv _inputSelect">
                        <StyledSelectBorder className="selectBorder inputTooltip">
                            <StyledSelect value={recursion} onChange={(e) => setRecursion(e.target.value)}>
                                <option>true</option>
                                <option>false</option>
                            </StyledSelect>
                        </StyledSelectBorder>
                        <span className="toolTip">Recursion</span>
                        <label className={`is${recursion ? 'active' : ''} `}>recursion</label>
                    </div>
                    <div className="labelDiv _inputSelect">    
                        <StyledSelectBorder className="selectBorder inputTooltip">
                            <StyledSelect value={queryType} id="QueryType" onChange={(e) => setQueryType(e.target.value)}>
                                <option>A</option>
                                <option>NS</option>
                                <option>SOA</option>
                                <option>MX</option>
                                <option>DNSKEY</option>
                            </StyledSelect>
                        </StyledSelectBorder>
                        <span className="toolTip">Query type</span>
                        <label className={`is${queryType ? 'active' : ''} `}>query type</label>
                    </div>
                    <div className="labelDiv _inputSelect">
                        <StyledSelectBorder className="selectBorder inputTooltip">
                            <StyledSelect  value={protocol} id="protocol" onChange={(e) => setProtocol(e.target.value)}>
                                <option>udp</option>
                                <option>tcp</option>
                            </StyledSelect>
                        </StyledSelectBorder>
                        <span className="toolTip">Protocol</span>
                        <label className={`is${protocol ? 'active' : ''} `}>protocol</label>
                    </div>
                    <div className="labelDiv _inputSelect">
                        <StyledSelectBorder className="selectBorder inputTooltip">
                            <StyledSelect  value={dnssec} id="dnssec" onChange={(e) => setDnssec(e.target.value)}>
                                <option>true</option>
                                <option>false</option>
                            </StyledSelect>
                        </StyledSelectBorder>
                        <span className="toolTip">DNSSEC</span>
                        <label className={`is${protocol ? 'active' : ''} `}>dnssec</label>
                    </div>
                    <StyledSubmit className="submit" type="submit" value="digish" disabled={!zone}></StyledSubmit>
            </form>
            </header>
        <div className="contentWrap">
            {content}
        </div>
        <Footer viewState={handleViewState}/>
    </div>
    </>
}