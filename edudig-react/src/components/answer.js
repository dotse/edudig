import { useEffect, useState } from "react"
import styled from "styled-components"
import { v4 as uuidv4 } from 'uuid';
import AAFlag from "../textfiles/AAFlag.json"
import ADFlag from "../textfiles/ADFlag.json"
import ANCOUNT from "../textfiles/ANCOUNT.json"
import AnswerSection from "../textfiles/AnswerSection.json"
import ARCOUNT from "../textfiles/ARCOUNT.json"
import CDFlag from "../textfiles/CDFlag.json"
import Flags from "../textfiles/Flags.json"
import ID from "../textfiles/ID.json"
import Info from "../textfiles/Info.json"
import MSGSize from "../textfiles/MSGSize.json"
import NSCount from "../textfiles/NSCount.json"
import OPCode from "../textfiles/OPCode.json"
import QDCount from "../textfiles/QDCount.json"
import QRFlag from "../textfiles/QRFlag.json"
import QueryTime from "../textfiles/QueryTime.json"
import QuestionSection from "../textfiles/QuestionSection.json"
import RAFlag from "../textfiles/RAFlag.json"
import RDFlag from "../textfiles/RDFlag.json"
import Server from "../textfiles/Server.json"
import Status from "../textfiles/Status.json"
import TCFlag from "../textfiles/TCFlag.json"
import When from "../textfiles/When.json"
import ZFlag from "../textfiles/ZFlag.json"

const StyledAnswerWrapper = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    width: 100vw;
    @media screen and (min-width: 1024px){
        flex-direction: row;
    }  
`
const StyledTerminal = styled.div`
    background-color: #070D0C;
    border-radius: 10px;
    color: #FDFFFE;
    font-family: 'Monda', Lucida Console, monospace;
    font-size: 0.80rem;
    margin-top:: 0px;
    padding-top: 10px;
    padding-left: 10px;
    width: 90vw;
    text-align: left;
    @media screen and (min-width: 1024px){
        width: 55vw;
    }
`
const StyledTerminalSection = styled.div`
    margin-top: 0px;
    margin-bottom: 12px;
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
    cursor: pointer;
    &:hover {
        color: #FF8C00;
    }
`
const StyledInfoBoxWrapper = styled.div`
    background-color: #49A671;
    width: 100vw;
    padding-top: 12px;
    padding-bottom: 12px;
    @media screen and (min-width: 1024px){
        width: 40vw;
    }
`
const StyledInfoBox = styled.div`
    background-color: #fdfffe;
    border-bottom-left-radius: 50px;
    border-top-right-radius: 50px;
    padding: 12px;
    margin: 12px;
`
const StyledTipBox = styled.div`
    background-color: #fdfffe;
    border-bottom-left-radius: 50px;
    border-top-right-radius: 50px;
    margin: 12px;
    padding: 16px;
    text-align: left;
    display: flex;
    flex-direction: column; 
`
const StyledTerminalLine = styled.div`
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
const StyledInfoP = styled.p`
    text-align: left;
    margin: 12px;
`

export const Answer = (props) => {
    const digishQuestion = props.data[0]
    const digishResp = props.data[1]
    const digishRespResp = digishResp.Response
    const [text, setText] = useState();
    let questionTransport = "";
    if (digishQuestion.Transport !== "udp"){
        questionTransport = "+tcp"
    }
    const queryTypeList = [[0,"None"],
    [1,"A"],
    [2,"NS"],
    [3,"MD"],
    [4,"MF"],
    [5,"CNAME"],
    [6,"SOA"],
    [7,"MB"],
    [8,"MG"],
    [9,"MR"],
    [10,"NULL"],
    [12,"PTR"],
    [13,"HINFO"],
    [14,"MINFO"],
    [15,"MX"],
    [16,"TXT"],
    [17,"RP"],
    [18,"AFSDB"],
    [19,"X25"],
    [20,"ISDN"],
    [21,"RT"],
    [23,"NSAPPTR"],
    [24,"SIG"],
    [25,"KEY"],
    [26,"PX"],
    [27,"GPOS"],
    [28,"AAAA"],
    [29,"LOC"],
    [30,"NXT"],
    [31,"EID"],
    [32,"NIMLOC"],
    [33,"SRV"],
    [34,"ATMA"],
    [35,"NAPTR"],
    [36,"KX"],
    [37,"CERT"],
    [39,"DNAME"],
    [41,"OPT"],
    [42,"APL"],
    [43,"DS"],
    [44,"SSHFP"],
    [46,"RRSIG"],
    [47,"NSEC"],
    [48,"DNSKEY"],
    [49,"DHCID"],
    [50,"NSEC3"],
    [51,"NSEC3PARAM"],
    [52,"TLSA"],
    [53,"SMIMEA"],
    [55,"HIP"],
    [56,"NINFO"],
    [57,"RKEY"],
    [58,"TALINK"],
    [59,"CDS"],
    [60,"CDNSKEY"],
    [61,"OPENPGPKEY"],
    [62,"CSYNC"],
    [63,"ZONEMD"],
    [64,"SVCB"],
    [65,"HTTPS"],
    [99,"SPF"],
    [100,"UINFO"],
    [101,"UID"],
    [102,"GID"],
    [103,"UNSPEC"],
    [104,"NID"],
    [105,"L32"],
    [106,"L64"],
    [107,"LP"],
    [108,"EUI48"],
    [109,"EUI64"],
    [256,"URI"],
    [257,"CAA"],
    [258,"AVC"],
    [249,"TKEY"],
    [250,"TSIG"],
    [251,"IXFR"],
    [252,"AXFR"],
    [253,"MAILB"],
    [254,"MAILA"],
    [255,"ANY"],
    [32768,"TA"],
    [32769,"DLV"],
    [65535,"Reserved"]];
    const queryClassList = [[1, "IN"],[3,"CH"],[4,"HS"]];
    const rCodeList = [[0, "NOERROR"], [1, "FORMATERROR"],[2, "SERVERFAILURE"],[3,"NAMEERROR"],[4,"NOTIMPLEMENTED"],[5,"REFUSED"]];
    const opCodeList = [[0, "QUERY"],[1,"IQUERY"],[2,"STATUS"]];
    const days = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
      ]
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
      const queryTime = Math.round(digishResp['Round trip time']/100000)
      const d = new Date();
      const day = days[d.getDay()];
      const month = months[d.getMonth()];
      const date = d.getDate();
      const hour = d.getHours();
      const minute = d.getMinutes();
      const second = d.getSeconds();
      const year = d.getFullYear()
      const time =`${day} ${month} ${date} ${hour}:${minute}:${second} CET ${year}`  

    const mapFunction = ((list,value,text,hover,file) => {
        const map = new Map(list);
        const key = map.get(value);
        if(hover !== undefined){
            return <StyledTerminalPHover tabIndex="0" key={uuidv4()} onClick={() => setFile(file)}>{text} {key}</StyledTerminalPHover>
        }
        return(<StyledTerminalP key={uuidv4()} className="queryTypeClass">{text} {key}</StyledTerminalP>)
    })

    const setFile = (jsonFile) => {
        const list = [jsonFile]
        setText(list.map((jsonFile, i) => {
            let items = <></>
            if(jsonFile.ListItems !== undefined){
                items = jsonFile.ListItems.map((listItem, i) => {
                    return (
                        <div key={uuidv4()}>
                            <StyledInfoP key={uuidv4()}>{listItem}</StyledInfoP>
                        </div>
                    )
                })
            };
            let paragraphs = <></>
            if(jsonFile.Paragraphs !== undefined){
                paragraphs = jsonFile.Paragraphs.map((paragraph, i) => {
                    return(
                        <div key={uuidv4()}>
                            <StyledInfoP key={uuidv4()}>{paragraph}</StyledInfoP>
                        </div>
                    )
                })
            };
            return(
                <div key={uuidv4()}>
                    <h4 key={uuidv4()}>{jsonFile.Title}</h4>
                    {paragraphs}
                    {items}
                </div>
            )
        }))
    }

    useEffect (() => {
        setFile(Info)
    },[])
    
    const digish = `; <<>> DiGiSH <<>>  ${digishResp.Zone}`;
    const opCode = mapFunction(opCodeList,digishRespResp.Opcode, "opcode", "hover", OPCode);
    const digishHeader = `;; ->>HEADER<<-`;
    const rCode = mapFunction(rCodeList,digishRespResp.Rcode, "status", "hover", Status);
    let digishQuestionLen = "0";
    if (digishRespResp.Question != null) {
        digishQuestionLen = digishRespResp.Question.length
    };
    let digishAnswerSection ="";
    let digishAnswerLen = "0";
    let digishAnswers = "";
    if (digishRespResp.Answer != null){
        digishAnswerSection = (<StyledTerminalPHover tabIndex="0" onClick={() => setFile(AnswerSection)} >
            ;; ANSWER SECTION:</StyledTerminalPHover>);
        digishAnswerLen = digishRespResp.Answer.length;
        digishAnswers = digishRespResp.Answer.map((Answer,i) => {
            i = +1;
            const rrType = mapFunction(queryTypeList, Answer.Hdr.Rrtype);
            let qClass = (<StyledTerminalP  className="queryTypeClass">{Answer.Hdr.Class }</StyledTerminalP >);
            if(Answer.Hdr.Class === 1 || Answer.Hdr.Class === 3 || Answer.Hdr.Class ===4){
                qClass = mapFunction(queryClassList,Answer.Hdr.Class)
            };
            return (<table key={uuidv4()}>
                <tbody key={uuidv4()}>
                    <tr key={uuidv4()}>
                        <td key={uuidv4()} className="firstCell">
                            <StyledTerminalP className="queryTypeClass">{Answer.Hdr.Name}</StyledTerminalP>
                        </td>
                        <td key={uuidv4()}>
                            <StyledTerminalP className="queryTypeClass" key={uuidv4()}>{Answer.Hdr.Ttl}</StyledTerminalP>
                        </td>
                        <td key={uuidv4()}>{qClass}</td>
                        <td key={uuidv4()}>{rrType}</td>
                        <td key={uuidv4()}>
                            <StyledTerminalP className="queryTypeClass" key={uuidv4()}>{Answer.A}</StyledTerminalP>
                        </td>
                    </tr>
                </tbody>
            </table>)
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

    let digishQuestions = digishRespResp.Question.map((Question, i) => {
        i = +1;
        const qType = mapFunction(queryTypeList,Question.Qtype)
        let qClass = <StyledTerminalP className="noPadding">{Question.Qclass}</StyledTerminalP>
        if(Question.Qclass === 1 || Question.Qclass === 3 || Question.Qclass === 4){
            qClass = mapFunction(queryClassList, Question.Qclass)
        }
        return (<table key={uuidv4()}>
                <tbody key={uuidv4()}>
                    <tr key={uuidv4()}>
                        <td key={uuidv4()} className="firstCell">
                            <StyledTerminalP key={uuidv4()} className="noPadding">;{Question.Name}</StyledTerminalP >
                        </td>
                        <td key={uuidv4()}></td>
                        <td key={uuidv4()}>{qClass}</td>
                        <td key={uuidv4()}>{qType}</td>
                    </tr>
                </tbody>
            </table>)
    })

    return <StyledAnswerWrapper>
            <section className="answerSection">
                <StyledTerminal>
                    <StyledTerminalSection>
                        <StyledTerminalP>{digish}</StyledTerminalP>
                        <StyledTerminalP>;; global options: +cmd</StyledTerminalP>
                        <StyledTerminalP>;; Got answer: </StyledTerminalP>
                        <div className="flexRow">
                            <StyledTerminalP>{digishHeader}</StyledTerminalP>
                            {opCode}
                            {rCode}
                            <StyledTerminalPHover tabIndex="0" onClick={() => setFile(ID)}>id: {digishRespResp.Id}</StyledTerminalPHover>
                        </div>
                        
                        <div className="flexRow">
                            <StyledTerminalPHover tabIndex="0" 
                                onClick={() => setFile(Flags)}>
                                ;; flags:
                            </StyledTerminalPHover>
                            <StyledTerminalPHover tabIndex="0" 
                                onClick={() => setFile(QRFlag)} 
                                className={`flag${digishRespResp.Response ? true : ''}`}>
                                    qr
                            </StyledTerminalPHover>
                            <StyledTerminalPHover tabIndex="0" 
                                onClick={() => setFile(AAFlag)} 
                                className={`flag${digishRespResp.Authoritative ? true : ''}`}>
                                    aa
                            </StyledTerminalPHover>
                            <StyledTerminalPHover
                                onClick={() => setFile(TCFlag)}  
                                className={`flag${digishRespResp.Truncated ? true : ''}`}>
                                    tc
                                </StyledTerminalPHover>
                            <StyledTerminalPHover
                                onClick={() => setFile(RDFlag)}  
                                className={`flag${digishRespResp.RecursionDesired ? true : ''}`}>
                                    rd
                            </StyledTerminalPHover>
                            <StyledTerminalPHover tabIndex="0" 
                                onClick={() => setFile(RAFlag)} 
                                className={`flag${digishRespResp.RecursionAvailable ? true : ''}`}>
                                    ra
                            </StyledTerminalPHover>
                            <StyledTerminalPHover tabIndex="0" 
                                onClick={() => setFile(ZFlag)} 
                                className="flag">
                                    z
                            </StyledTerminalPHover>
                            <StyledTerminalPHover tabIndex="0" 
                                onClick={() => setFile(ADFlag)} 
                                className={`flag${digishRespResp.AuthenticatedData ? true : ''}`}>
                                    ad
                            </StyledTerminalPHover>
                            <StyledTerminalPHover tabIndex="0" 
                                onClick={() => setFile(CDFlag)} 
                                className={`flag${digishRespResp.CheckingDisabled ? true : ''}`}>
                                    cd
                            </StyledTerminalPHover>
                            <p className="noPadding">;</p>
                            <StyledTerminalPHover tabIndex="0" onClick={() => setFile(QDCount)} >
                                QUERY:{digishQuestionLen},
                            </StyledTerminalPHover>
                            <StyledTerminalPHover tabIndex="0" onClick={() => setFile(ANCOUNT)} >
                                ANSWER:{digishAnswerLen},
                            </StyledTerminalPHover>
                            <StyledTerminalPHover tabIndex="0" onClick={() => setFile(NSCount)} >
                                AUTHORITY:{digishNsLen},
                            </StyledTerminalPHover>
                            <StyledTerminalPHover tabIndex="0" onClick={() => setFile(ARCOUNT)} >
                                ADDITIONAL:{digishExtraLen}
                            </StyledTerminalPHover>
                        </div>
                    </StyledTerminalSection>
                    <StyledTerminalSection>
                        <StyledTerminalP>;; OPT PSEUDOSECTION:</StyledTerminalP>
                        <StyledTerminalP>; EDNS: version: 0, flags:; udp: 1232 </StyledTerminalP>
                        <StyledTerminalPHover tabIndex="0" onClick={() => setFile(QuestionSection)} >
                            ;; QUESTION SECTION:
                        </StyledTerminalPHover>
                        {digishQuestions}
                    </StyledTerminalSection>
                    <StyledTerminalSection>
                        {digishAnswerSection}
                        {digishAnswers}
                    </StyledTerminalSection>
                    <StyledTerminalSection>
                        <StyledTerminalPHover tabIndex="0" onClick={() => setFile(QueryTime)}>
                            ;; Query time: {queryTime} msec
                        </StyledTerminalPHover>
                        <StyledTerminalPHover tabIndex="0" onClick={() => setFile(Server)} >
                            ;; SERVER: {digishResp.Nameserver}#port({digishResp.Nameserver})
                        </StyledTerminalPHover>
                        <StyledTerminalPHover tabIndex="0" onClick={() => setFile(When)} >
                            ;; WHEN: {time}
                        </StyledTerminalPHover>
                        <StyledTerminalPHover tabIndex="0" onClick={() => setFile(MSGSize)} >
                            ;; MSG SIZE rcvd: {digishResp['Message Size']}
                        </StyledTerminalPHover>
                    </StyledTerminalSection>
                </StyledTerminal>
            </section>
            <section>
                <StyledInfoBoxWrapper>
                    <StyledTipBox className="tipBox">
                        <h3>Tip!</h3>
                        <h4>Copy and paste this line into your terminal</h4>
                        <StyledTerminalLine className="terminal">
                            <p>dig @{digishQuestion.Nameserver} -p {digishQuestion.Port} {digishQuestion.QueryType} {digishQuestion.Zone} {questionTransport}</p>
                            <div className="copyBtn" onClick={() => 
                                {navigator.clipboard.writeText(`dig @${digishQuestion.Nameserver} -p ${digishQuestion.Port} ${digishQuestion.QueryType} ${digishQuestion.Zone} ${questionTransport}`)}
                                }>             
                            </div>
                        </StyledTerminalLine>
                    </StyledTipBox>
                    <h2>Info section</h2>
                    <StyledInfoBox>
                        {text}
                    </StyledInfoBox>
                </StyledInfoBoxWrapper>
            </section>
         </StyledAnswerWrapper>
}