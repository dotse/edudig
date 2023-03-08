import React, { useEffect } from "react";
import '../styles/style.css';
import { useState } from "react";
import axios from "axios";
import { EduDig } from "./eduDig";
import { Answer } from "./answer";
import styled from "styled-components";

const StyledInput = styled.input`
    width: 77vw;
    max-width: 320px;
    padding: 8px;
    margin: 8px;
    border: none;
    border-bottom-color: lightgrey;
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
    border-bottom-color: lightgrey;
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
    border-bottom-color: lightgrey;
    border-bottom-width: 1.5px;
    border-bottom-style: solid;

    @media screen and (min-width: 1024px){
        width: 10vw;
        max-width: 75px;
    }
`

//Style row 2
const StyledInput1 = styled.input`
    width: 77vw;
    height: 40px;
    max-width: 320px;
    padding-top: 3px;
    padding-left: 8px;
    margin-top: 8px;
    margin-right: 16px;
    border: none;
    border-bottom-color: lightgrey;
    border-bottom-width: 5px;
    border-bottom-style: solid;
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

    @media screen and (min-width: 1024px){
        width: 20vw;
    }
`
const StyledInputNumber1 = styled.input`
    width: 77vw;
    max-width: 320px;
    height: 40px;
    padding-top: 3px;
    padding-left: 8px;
    margin-top: 8px;
    margin-right: 16px;
    border: none;
    border-bottom-color: lightgrey;
    border-bottom-width: 5px;
    border-bottom-style: solid;
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

    @media screen and (min-width: 1024px){
        width: 10vw;
        max-width: 75px;
    }
`
const StyledSelect1 = styled.select`
    border: none;
    width: 80vw;
    max-width: 330px;
    height: 40px; 
    font-family: 'Monda', Courier, monospace;
    font-size: 1rem;

    @media screen and (min-width: 1024px){
        width: 10vw;
        max-width: 75px;
    }
`
const StyledSelectBorder1 = styled.div`
    margin-top: 8px;
    margin-right: 16px;
    padding-top: 4px;
    width: 80vw;
    max-width: 330px; 
    border-bottom-color: lightgrey;
    border-bottom-width: 5px;
    border-bottom-style: solid;

    &:hover {
        border-bottom-color: #FF8C00;
    }

    @media screen and (min-width: 1024px){
        width: 10vw;
        max-width: 75px;
    }
`
//Style row 3
const StyledInput2 = styled.input`
    width: 77vw;
    height: 40px;
    max-width: 320px;
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

    @media screen and (min-width: 1024px){
        width: 20vw;
    }
`
const StyledInputNumber2 = styled.input`
    width: 77vw;
    max-width: 320px;
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

    @media screen and (min-width: 1024px){
        width: 15vw;
        max-width: 75px;
    }
`
const StyledSelect2 = styled.select`
    border: none;
    width: 80vw;
    max-width: 330px;
    height: 40px; 
    font-family: 'Monda', Courier, monospace;
    font-size: 1rem;
    color: #070D0C;

    &:focus {
        outline: none;
    }
    @media screen and (min-width: 1024px){
        width: 20vw;
        max-width: 95px;
    }
`
const StyledSelectBorder2 = styled.div`
    margin-top: 6px;
    padding-top: 4px;
    width: 80vw;
    max-width: 330px; 
    border-bottom-color: lightgrey;
    border-bottom-width: 5px;
    border-bottom-style: solid;
    border-radius: 5px;
    
    &:hover {
        border-bottom-color: #FF8C00;
    }

    @media screen and (min-width: 1024px){
        width: 15vw;
        max-width: 100px;
    }
`
//Row 4
const StyledInput3 = styled.input`
    width: 77vw;
    height: 40px;
    max-width: 320px;
    padding: 8px;
    border-radius: 5px;
    border-color: lightgrey;
    border-style: solid;
    border-width: 2px;
    font-family: 'Monda', Courier, monospace;
    font-size: 1rem;
    color: #070D0C;

    &:hover {
        border-color: #FF8C00;
    }

    &:focus {
        border-color: #FF8C00;
        outline: none;
    }

    @media screen and (min-width: 1024px){
        width: 20vw;
    }
`
const StyledInputNumber3 = styled.input`
    width: 77vw;
    max-width: 320px;
    height: 40px;
    padding: 8px;
    border-radius: 5px;
    border-color: lightgrey;
    border-style: solid;
    border-width: 2px;
    font-family: 'Monda', Courier, monospace;
    font-size: 1rem;
    color: #070D0C;

    &:hover {
        border-color: #FF8C00;
    }

    &:focus {
        border-color: #FF8C00;
        outline: none;
    }

    @media screen and (min-width: 1024px){
        width: 15vw;
        max-width: 75px;
    }
`
const StyledSelect3 = styled.select`
    width: 80vw;
    max-width: 330px;
    height: 40px; 
    padding: 8px;
    border-radius: 5px;
    border-color: lightgrey;
    border-style: solid;
    border-width: 2px;
    font-family: 'Monda', Courier, monospace;
    font-size: 1rem;
    color: #070D0C;

    &:hover {
        border-color: #FF8C00;
    }

    &:focus {
        border-color: #FF8C00;
        outline: none;
    }
    @media screen and (min-width: 1024px){
        width: 20vw;
        max-width: 95px;
    }
`
// const StyledSelectBorder3 = styled.div`
//     margin-top: 6px;
//     padding-top: 4px;
//     width: 80vw;
//     max-width: 330px; 
//     border-radius: 5px;
    
//     &:hover {
//         border-bottom-color: #FF8C00;
//     }

//     @media screen and (min-width: 1024px){
//         width: 15vw;
//         max-width: 100px;
//     }
// `

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
        width: 10vw;
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

    return <div className="main">
            <header>
            <h1>EduDig</h1>
            {/* <form className="digInput" onSubmit={handelSubmit}>
                <div className="wrapInput">
                    <label className="labelStyle">server</label>
                    <StyledInput value={server} id="server" onChange={(e) => setServer(e.target.value)}></StyledInput>
                </div>
                <div className="wrapInput">
                    <label className="labelStyle">port</label>
                    <StyledInputNumber type="number" value={port} id="port" onChange={(e) => setPort(e.target.value)}></StyledInputNumber>
                </div>
                <div className="wrapInput">
                    <label className="labelStyle">recursion</label>
                    <StyledSelectBorder>
                        <StyledSelect value={recursion} onChange={(e) => setRecursion(e.target.value)}>
                            <option>true</option>
                            <option>false</option>
                        </StyledSelect>
                    </StyledSelectBorder>
                </div>
                <div className="wrapInput">
                    <label className="labelStyle">query type</label>
                    <StyledSelectBorder>
                        <StyledSelect value={queryType} id="QueryType" onChange={(e) => setQueryType(e.target.value)}>
                            <option>A</option>
                            <option>NS</option>
                            <option>SOA</option>
                            <option>MX</option>
                            <option>DNSKEY</option>
                        </StyledSelect>
                    </StyledSelectBorder>
                </div>
                <div className="wrapInput">
                    <label className="labelStyle">zone</label>
                    <StyledInput type="text" className="zone" onChange={(e) => setZone(e.target.value)} value={zone} placeholder="zone"></StyledInput>
                </div>
                <div className="wrapInput">
                    <label className="labelStyle">protocol</label>
                    <StyledSelectBorder>
                        <StyledSelect value={protocol} id="protocol" onChange={(e) => setProtocol(e.target.value)}>
                            <option>udp</option>
                            <option>tcp</option>
                        </StyledSelect>
                    </StyledSelectBorder>
                </div>
                <StyledSubmit type="submit" value="digish" disabled={!zone}></StyledSubmit>
            </form>
            <form className="digInput" onSubmit={handelSubmit}>
                <StyledInput1 value={server} id="server" onChange={(e) => setServer(e.target.value)}></StyledInput1>
                <StyledInputNumber1 type="number" value={port} id="port" onChange={(e) => setPort(e.target.value)}></StyledInputNumber1>
                <StyledSelectBorder1>
                    <StyledSelect1 value={recursion} onChange={(e) => setRecursion(e.target.value)}>
                        <option>true</option>
                        <option>false</option>
                    </StyledSelect1>
                </StyledSelectBorder1>
                <StyledSelectBorder1>
                    <StyledSelect1 value={queryType} id="QueryType" onChange={(e) => setQueryType(e.target.value)}>
                        <option>A</option>
                        <option>NS</option>
                        <option>SOA</option>
                        <option>MX</option>
                        <option>DNSKEY</option>
                    </StyledSelect1>
                </StyledSelectBorder1>
                <StyledInput1 type="text" className="zone" onChange={(e) => setZone(e.target.value)} value={zone} placeholder="zone"></StyledInput1>
                <StyledSelectBorder1>
                    <StyledSelect1 value={protocol} id="protocol" onChange={(e) => setProtocol(e.target.value)}>
                        <option>udp</option>
                        <option>tcp</option>
                    </StyledSelect1>
                </StyledSelectBorder1>
                <StyledSubmit type="submit" value="digish" disabled={!zone}></StyledSubmit>
            </form> */}

            <form className="digInput" onSubmit={handelSubmit}>
                <div className="labelDiv">
                    <StyledInput2 type="text" className="zone" onChange={(e) => setZone(e.target.value)} value={zone} ></StyledInput2>
                    <label className={`is${zone ? 'active' : ''} `}>zone</label>
                </div>
                <div className="labelDiv">
                    <StyledInput2 value={server} id="server" onChange={(e) => setServer(e.target.value)}></StyledInput2>
                    <label className={`is${server ? 'active' : ''} `}>server</label>
                </div>
                <div className="labelDiv">
                    <StyledInputNumber2 type="number" value={port} id="port" onChange={(e) => setPort(e.target.value)}></StyledInputNumber2>
                    <label className={`is${port ? 'active' : ''} `}>port</label>
                </div>
                <div className="labelDiv">
                    <StyledSelectBorder2 className="selectBorder">
                        <StyledSelect2 value={recursion} onChange={(e) => setRecursion(e.target.value)}>
                            <option>true</option>
                            <option>false</option>
                        </StyledSelect2>
                    </StyledSelectBorder2>
                    <label className={`is${recursion ? 'active' : ''} `}>recursion</label>
                </div>
                <div className="labelDiv">    
                    <StyledSelectBorder2 className="selectBorder">
                        <StyledSelect2 value={queryType} id="QueryType" onChange={(e) => setQueryType(e.target.value)}>
                            <option>A</option>
                            <option>NS</option>
                            <option>SOA</option>
                            <option>MX</option>
                            <option>DNSKEY</option>
                        </StyledSelect2>
                    </StyledSelectBorder2>
                    <label className={`is${queryType ? 'active' : ''} `}>query type</label>
                </div>
                <div className="labelDiv">
                    <StyledSelectBorder2 className="selectBorder">
                        <StyledSelect2  value={protocol} id="protocol" onChange={(e) => setProtocol(e.target.value)}>
                            <option>udp</option>
                            <option>tcp</option>
                        </StyledSelect2>
                    </StyledSelectBorder2>
                    <label className={`is${protocol ? 'active' : ''} `}>protocol</label>
                </div>
                
                <StyledSubmit type="submit" value="digish" disabled={!zone}></StyledSubmit>
            </form>

            <form className="digInput" onSubmit={handelSubmit}>
                <div className="labelDiv2">
                    <label className={`${zone ? 'active2' : ''} `}>zone</label>
                    <StyledInput3 type="text" className="zone" onChange={(e) => setZone(e.target.value)} value={zone} ></StyledInput3>
                </div>
                <div className="labelDiv2">
                    <label className={`${server ? 'active2' : ''} `}>server</label>
                    <StyledInput3 value={server} id="server" onChange={(e) => setServer(e.target.value)}></StyledInput3>
                </div>
                <div className="labelDiv2">
                    <label className={`${port ? 'active2' : ''} `}>port</label>
                    <StyledInputNumber3 type="number" value={port} id="port" onChange={(e) => setPort(e.target.value)}></StyledInputNumber3>
                </div>
                <div className="labelDiv2">
                    <label className={`${recursion ? 'active2' : ''} `}>recursion</label>
                    <StyledSelect3 value={recursion} onChange={(e) => setRecursion(e.target.value)}>
                            <option>true</option>
                            <option>false</option>
                        </StyledSelect3>
                </div>
                <div className="labelDiv2">
                    <label className={`${queryType ? 'active2' : ''} `}>query type</label>
                    <StyledSelect3 value={queryType} id="QueryType" onChange={(e) => setQueryType(e.target.value)}>
                            <option>A</option>
                            <option>NS</option>
                            <option>SOA</option>
                            <option>MX</option>
                            <option>DNSKEY</option>
                        </StyledSelect3>    
                </div>
                <div className="labelDiv2">
                    <label className={`${protocol ? 'active2' : ''} `}>protocol</label>
                    <StyledSelect3  value={protocol} id="protocol" onChange={(e) => setProtocol(e.target.value)}>
                            <option>udp</option>
                            <option>tcp</option>
                        </StyledSelect3>
                </div>
                <StyledSubmit type="submit" value="digish" disabled={!zone}></StyledSubmit>
            </form>
        </header>
        {content}
    </div>
}