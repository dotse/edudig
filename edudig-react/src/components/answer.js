import { useEffect, useState } from "react"
import styled from "styled-components"
import infoText from "../textfiles/Info.txt"
import OPCodeText from "../textfiles/OPCode.txt"
import QDCountText from "../textfiles/QDCount.txt"

const StyledAnswerWrapper = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media screen and (min-width: 500px){
        flex-direction: row;
    }  
`

const StyledTerminal = styled.div`
    background-color: #070D0C;
    border-radius: 10px;
    color: #FDFFFE;
    font-family: 'Monda', Lucida Console, monospace;
    font-size: 0.80rem;
    padding: 12px;
    margin: 12px;
    width: 55vw;
    text-align: left;
`
const StyledInfoBoxWrapper = styled.div`
    background-color: #49A671;
    width: 40vw;
    padding:12px;
`
const StyledInfoBox = styled.div`
    background-color: #fdfffe;
    border-bottom-left-radius: 50px;
    border-top-right-radius: 50px;
    padding: 12px;
`
const StyledTerminalP = styled.p`
    padding-top: 5px;
    padding-left: 5px;
    margin-top: 0px;
    margin-bottom: 0px;
`
const StyledTerminalPHover = styled.p`
    padding-top: 5px;
    padding-left: 5px;
    margin-top: 0px;
    margin-bottom: 0px;
    &:hover {
        color: #FF8C00;
    }
`

export const Answer = (props) => {
    const digishResp = props.data
    const digishRespResp = digishResp.Response
    const time = Date().toLocaleString()
    const [text, setText] = useState();
    

    console.log(digishResp);

    useEffect (() => {
        setFile(infoText)
    },[])

    const setFile = (textFile) => {
        fetch(textFile)
        .then((response) => response.text())
        .then((textContent) => {
          setText(textContent);
        });
    };
    
    const digish = `; <<>> DiGiSH <<>>  ${digishResp.Zone}`
    let opCode = ""
    if(digishRespResp.Opcode === 0){
        opCode = "QUERY"
    }
    else if(digishRespResp.Opcode === 1){
        opCode = "IQUERY"
    }
    else if(digishRespResp.Opcode === 2){
        opCode = "STATUS"
    }
    const digishHeader = `;; ->>HEADER<<-`
    const digishHeaderOpcode = `opcode ${opCode}`
    let rCode = ""
    if(digishRespResp.Rcode === 0){
        rCode = "NOERROR"
    }
    else if(digishRespResp.Rcode === 1){
        rCode = "FORMATERROR"
    }
    else if(digishRespResp.Rcode === 2){
        rCode = "SERVERFAILURE"
    }
    else if(digishRespResp.Rcode === 3){
        rCode = "NAMEERROR"
    }
    else if(digishRespResp.Opcode === 4){
        rCode = "NOTIMPLEMENTED"
    }
    else if(digishRespResp.Opcode === 5){
        rCode = "REFUSED"
    }
    const digishHeaderRcode = `status: ${rCode}`;
    const digishHeaderID = `id: ${digishRespResp.Id}`;
    let digishQuestionLen = "0";
    if (digishRespResp.Question != null) {
        digishQuestionLen = digishRespResp.Question.length
    }
    let digishAnswerLen = "0";
    let digishAnswers = ""
    if (digishRespResp.Answer != null){
        digishAnswerLen = digishRespResp.Answer.length
        digishAnswers = digishRespResp.Answer.map((Answer) => {
            return (<div className="flexRow">
                <p key={Answer.Hdr.Name}>{Answer.Hdr.Name}</p>
                <p key="" >{Answer.Hdr.Class}</p>
                <p key="" > {Answer.Hdr.Rrtype}</p>
                <p key={Answer.A}>{Answer.A}</p>
            </div>)
        })
    }
    let digishNsLen = "0";
    if(digishRespResp.ns != null){
        digishNsLen = digishRespResp.ns.length
    }
    let digishExtraLen = "0";
    if(digishRespResp.Extra != null){
        digishExtraLen = digishRespResp.Extra.length
    }

    let digishQuestions = digishRespResp.Question.map((Question) => {
        return (<div className="flexGrid">
            <p key={Question.Name} className="noPadding">{Question.Name}</p>
            <p key="IN" className="noPadding" id="">{Question.Qtype.toString()}</p>
            <p key="A" className="noPadding">{Question.Qclass.toString()}</p>
            </div>)
    })

    const queryTime = Math.round(digishResp['Round trip time']/100000)
   

    return <StyledAnswerWrapper>
            <section className="answerSection">
                <StyledTerminal>
                    <StyledTerminalP>{digish}</StyledTerminalP>
                    <StyledTerminalP>;; global options: +cmd</StyledTerminalP>
                    <StyledTerminalP>;; Got answer: </StyledTerminalP>
                    <div className="flexRow">
                        <StyledTerminalP>{digishHeader}</StyledTerminalP>
                        <StyledTerminalPHover onClick={() => setFile(OPCodeText)}>
                            {digishHeaderOpcode},
                        </StyledTerminalPHover>
                        <StyledTerminalPHover>{digishHeaderRcode},</StyledTerminalPHover>
                        <StyledTerminalPHover>{digishHeaderID}</StyledTerminalPHover>
                    </div>
                    
                    <div className="flexRow">
                        <StyledTerminalP>;; flags:</StyledTerminalP>
                        <StyledTerminalPHover className={`flag${digishRespResp.Response ? true : ''}`}>qr</StyledTerminalPHover>
                        <StyledTerminalPHover className={`flag${digishRespResp.Authoritative ? true : ''}`}>aa</StyledTerminalPHover>
                        <StyledTerminalPHover className={`flag${digishRespResp.Truncated ? true : ''}`}>tc</StyledTerminalPHover>
                        <StyledTerminalPHover className={`flag${digishRespResp.RecursionDesired ? true : ''}`}>rd</StyledTerminalPHover>
                        <StyledTerminalPHover className={`flag${digishRespResp.RecursionAvailable ? true : ''}`}>ra</StyledTerminalPHover>
                        <StyledTerminalPHover className="flag">z</StyledTerminalPHover>
                        <StyledTerminalPHover className={`flag${digishRespResp.AuthenticatedData ? true : ''}`}>ad</StyledTerminalPHover>
                        <StyledTerminalPHover className={`flag${digishRespResp.CheckingDisabled ? true : ''}`}>cd</StyledTerminalPHover>
                        <p className="noPadding">;</p>
                        <StyledTerminalPHover>QUERY:{digishQuestionLen},</StyledTerminalPHover>
                        <StyledTerminalPHover>ANSWER:{digishAnswerLen},</StyledTerminalPHover>
                        <StyledTerminalPHover>AUTHORITY:{digishNsLen},</StyledTerminalPHover>
                        <StyledTerminalPHover>ADDITIONAL:{digishExtraLen}</StyledTerminalPHover>
                    </div>
                    <StyledTerminalP>;; OPT PSEUDOSECTION:</StyledTerminalP>
                    <StyledTerminalP>; EDNS: version: 0, flags:; udp: 1232 </StyledTerminalP>
                    <StyledTerminalPHover>;; QUESTION SECTION:</StyledTerminalPHover>
                    <div className="flexRow">
                        <StyledTerminalP>;</StyledTerminalP>
                        {digishQuestions}
                    </div>
                    <StyledTerminalPHover>;; ANSWER SECTION:</StyledTerminalPHover>
                    {digishAnswers}
                    <StyledTerminalPHover>;; Query time: {queryTime} msec</StyledTerminalPHover>
                    <StyledTerminalPHover>;; SERVER: {digishResp.Nameserver}#port({digishResp.Nameserver})</StyledTerminalPHover>
                    <StyledTerminalPHover>;; WHEN: {time}</StyledTerminalPHover>
                </StyledTerminal>
            </section>
            <StyledInfoBoxWrapper>
                <h2>Info section</h2>
                <StyledInfoBox>
                    <p>{text}</p>
                </StyledInfoBox>
            </StyledInfoBoxWrapper>
        </StyledAnswerWrapper>
}