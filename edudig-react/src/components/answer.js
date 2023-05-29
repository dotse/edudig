import { useEffect, useState } from "react";
import styled from "styled-components";
import '../styles/_variables.scss';
import { v4 as uuidv4 } from 'uuid';
import { CopyIcon } from "../icons/copyIcon";

//Textfiles Imports
import AAFlag from "../textfiles/AAFlag.json"
import AdditionalSection from "../textfiles/AdditionalSection.json"
import ADFlag from "../textfiles/ADFlag.json"
import ANCOUNT from "../textfiles/ANCOUNT.json"
import AnswerSection from "../textfiles/AnswerSection.json"
import ARCOUNT from "../textfiles/ARCOUNT.json"
import AuthoritySection from "../textfiles/AuthoritySection.json"
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
import ARR from "../textfiles/ARR.json"
import SOARR from "../textfiles/SOARR.json"

//React styled components
const StyledAnswerWrapper = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    gap: 16px;
    margin-bottom: 110px;

    @media screen and (min-width: 1200px){
        flex-direction: row;
        align-items: flex-start;
        width: 1200px;
        margin-top: 10px;
    }
`
const StyledTerminal = styled.div`
    background-color: #070D0C;
    border-radius: 10px;
    color: #FDFFFE;
    font-family: 'Monda', Lucida Console, monospace;
    font-size: 0.80rem;
    margin-top:: 0px;
    padding: 10px;
    text-align: left; 
    @media screen and (min-width: 1200px){
        margin-right: 16px;
        width: 100%;
    }
`
const StyledTerminalSection = styled.div`
    margin-top: 0px;
    margin-bottom: 12px;
    display: flex;
    flex-direction: column;
`
const StyledTerminalP = styled.p`
    padding-top: 5px;
    padding-left: 5px;
    margin-top: 0px;
    margin-bottom: 0px;
`
const StyledTerminalPHover = styled.a`
    text-decoration: none;
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
    margin-top: 16px;
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 10px;
    display: flex;
    @media screen and (min-width: 1200px){
        margin-top: 0;
        flex-direction: column;
        width: 70%;
    }
    @media screen and (max-width: 768px){
        flex-direction: column;
    }
`
const StyledInfoBox = styled.div`
    background-color: #fdfffe;
    border-bottom-left-radius: 50px;
    border-top-right-radius: 50px;
    padding: 12px;
    margin: 24px 12px 12px 12px;
    flex: 1 1 0px;

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
    justify-content: center;
    row-gap: 24px;
    flex: 1 1 0px;
`
const StyledTerminalLine = styled.div`
    background-color: #070D0C;
    border-radius: 10px;
    color: #FDFFFE;
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
    const digishQuestion = props.data[0];
    const digishResp = props.data[1];
    let response = digishResp.Response;
    let questionTransport = (digishQuestion.Transport !== "udp") ? "+tcp" : "";
    let dnssec = (digishQuestion.DNSSEC === 'true') ? "+dnssec" : "";
    
    //Lists for mapping
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
    const queryTime = Math.round(digishResp['Round trip time']/100000)
    const when = digishResp.Timestamp;
    
    //Usestate variables 
    const [firstText, setFirstText] = useState();
    const [text, setText] = useState();
    const [classroomView, setClassroomView] = useState(props.classroomState);
    const [showAdditionalDefault, setShowAdditionalDefault] = useState(false);

    //functions:

    //Returns styled component with mapped content 
    const mapFunction = ((list,value,text,hover,file) => {
        const map = new Map(list);
        const key = map.get(value);
        if(hover !== undefined){
            return <StyledTerminalPHover href="#infoSection" tabIndex="0" key={uuidv4()} onClick={() => setFile(file)}>{text}: {key},</StyledTerminalPHover>
        }
        return(`${key}`)
    })

    //Sets json file for infosection
    const setFile = (jsonFile) => {
        if (jsonFile) {
            const list = [jsonFile]
            setText(mapText(list))
        } else {
            setText(mapText([{"Title" : "Something went wrong", "Paragraphs" : ["The info seems to be missing"]}]))
        }
        setFirstText('')
    }

    //Maps out json and returns styled components for header and paragraph
    const mapText = (list) => {
        return list.map((jsonFile, i) => {
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
                    <h3 key={uuidv4()}>{jsonFile.Title}</h3>
                    {paragraphs}
                    {items}
                </div>
            )
        })
    }
    
    const getRR = (rr) => {
        if (rr === 'A') {
            return ARR
        } else if (rr === 'SOA') {
            return SOARR
        }
    }

    //Creats table for terminal window
    const createTable = (respSection) => {
        //Renders table row
        const renderTableRow = (name, ttl, qClass, type, queryType, typeCovered,flags, protocol, algorithm, labels, origTtl, preference) => (
          <tr key={uuidv4()} onClick={() => setFile(getRR(type))} className="tableRowHover">
            <td key={uuidv4()} className="firstCell tableP">{name}</td>
            <td key={uuidv4()} className="queryTypeClass">{ttl}</td>
            <td key={uuidv4()} className="queryTypeClass">{qClass}</td>
            <td key={uuidv4()} className="queryTypeClass rrType" tabIndex="0">{type}</td>
            <td key={uuidv4()} className="lastCell">{queryType}{typeCovered} {flags} {protocol} {algorithm} {labels} {origTtl} {preference}</td>
          </tr>
        );
        // Renders second table row
        const renderSecondRow = (inception, expiration, keyTag, signerName, signature, mbox, serial, refresh, retry, expire, minttl, nextDomain, renderTypeBitMap, publicKey, mx) => (
          <tr key={uuidv4()}>
            <td className="secondRow" key={uuidv4()} colSpan={5}>
              <span className="inception">{inception} </span>
              <span className="expiration">{expiration} </span>
              <span className="keyTag">{keyTag} </span>
              <span className="signerName">{signerName} </span>
              <span className="signature">{signature} </span>
              <span className="mbox">{mbox} </span>
              <span className="serial">{serial} </span>
              <span className="refresh">{refresh} </span>
              <span className="retry">{retry} </span>
              <span className="expire">{expire} </span>
              <span className="minttl">{minttl} </span>
              <span className="nextDomain">{nextDomain} </span>
              <span className="renderTypeBitMap">{renderTypeBitMap} </span>
              <span className="renderTypeBitMap">{publicKey} </span>
              <span className="renderTypeBitMap">{mx} </span>
            </td>
          </tr>
        );
        //Process section type
        const processSection = (section) => {
          let name = '';
          let ttl = '';
          let qClass = '';
          let type = '';
          let queryType = '';
          let typeCovered = '';
          let algorithm = '';
          let labels = '';
          let origTtl = '';
          let inception = '';
          let expiration = '';
          let keyTag = '';
          let signerName = '';
          let signature = '';
          let mbox = '';
          let serial = '';
          let refresh = '';
          let retry = '';
          let expire = '';
          let minttl = '';
          let nextDomain = '';
          let typeBitMap = [];
          let renderTypeBitMap = '';
          let mx = '';
          let preference = '';
          let flags = '';
          let protocol = '';
          let publicKey = '';
      
          if (section.Hdr) {
            type = mapFunction(queryTypeList, section.Hdr.Rrtype);
            qClass = section.Hdr.Class;
            queryType = section.A ? section.A : section.Ns;
            name = section.Hdr.Name;
            ttl = section.Hdr.Ttl;
      
            if (type === "RRSIG") {
              typeCovered = mapFunction(queryTypeList, section.TypeCovered);
              algorithm = section.Algorithm;
              labels = section.Labels;
              origTtl = section.OrigTtl;
              inception = section.Inception;
              expiration = section.Expiration;
              keyTag = section.KeyTag;
              signerName = section.SignerName;
              signature = section.Signature;
            }
            if (type === "SOA") {
              mbox = section.Mbox;
              minttl = section.Minttl;
              refresh = section.Refresh;
              retry = section.Retry;
              serial = section.Serial;
              expire = section.Expire;
            }
            if (type === "NSEC") {
              nextDomain = section.NextDomain;
              for (let i = 0; i < section.TypeBitMap.length; i++) {
                typeBitMap.push(mapFunction(queryTypeList, section.TypeBitMap[i]));
              }
              renderTypeBitMap = typeBitMap.map((type) => <span key={uuidv4()}>{type} </span>);
            }
            if (type === 'MX') {
              mx = section.Mx;
              preference = section.Preference;
            }
            if (type === 'DNSKEY') {
                flags = section.Flags;
                protocol = section.Protocol;
                algorithm = section.Algorithm
                publicKey = section.PublicKey;
            }
          } else if (respSection === response.Question) {
            type = mapFunction(queryTypeList, section.Qtype);
            qClass = section.Qclass;
            name = section.Name;
          }
      
          if (qClass === 1 || qClass === 3 || qClass === 4) {
            qClass = mapFunction(queryClassList, qClass);
          }
      
          return (
            <table key={uuidv4()}>
              <tbody key={uuidv4()}>
                {renderTableRow(name, ttl, qClass, type, queryType, typeCovered, flags, protocol, algorithm, labels, origTtl, preference)}
                {renderSecondRow(inception, expiration, keyTag, signerName, signature, mbox, serial, refresh, retry, expire, minttl, nextDomain, renderTypeBitMap, publicKey, mx)}
              </tbody>
            </table>
          );
        };
      
        return respSection.map((section) => processSection(section));
      };

    useEffect (() => {
        const setFirstFile = (jsonFile) => {
            const list = [jsonFile]
            setFirstText(mapText(list))
        }
        if(!text) {
            setFirstFile(Info)
        }
        setClassroomView(props.classroomState)
        if(response.Additional.length === 1  && response.Additional[0].Hdr.Name === '.'){
            setShowAdditionalDefault(true)
        } else { setShowAdditionalDefault(false) }
    },[props.classroomState, response, text]);

    const opCode = mapFunction(opCodeList,response.MsgHdr.Opcode, "opcode", "hover", OPCode);
    const rCode = mapFunction(rCodeList,response.MsgHdr.Rcode, "status", "hover", Status);

    //Question section
    let digishQuestionLen = response.Question ? response.Question.length : '0';
    let digishQuestions = createTable(response.Question);

    //Answer section
    let digishAnswerLen = response.Answer ? response.Answer.length : '';
    let digishAnswers = response.Answer ? createTable(response.Answer) : '';

    //Authority section
    let digishAuthorityLen = response.Authority ? response.Authority.length : '';
    let digishAuthority = response.Authority ? createTable(response.Authority) : '';
    
    //Additional section
    let digishAdditionalLen = response.Additional ? response.Additional.length : '0';
    let digishAdditional = '';
    let digishAdditionalOpt = '';
    if (response.Additional) {
        const modifiedAdditionalResponse = response.Additional.filter(item => item.Hdr.Name !== '.');
        const optResponse = response.Additional.filter(item => item.Hdr.Name === '.');

        digishAdditional = createTable(modifiedAdditionalResponse);
        digishAdditionalOpt = createTable(optResponse);
    } else {
        digishAdditional = createTable(response.Additional);
    }

    return <StyledAnswerWrapper>
                <StyledTerminal>
                    <StyledTerminalSection>
                        <StyledTerminalP>; &#60;&#60;&#62;&#62; DiGiSH &#60;&#60;&#62;&#62;  @{digishQuestion.Nameserver} -p {digishQuestion.Port} {digishQuestion.Qtype} {digishQuestion.Zone} {questionTransport} {dnssec}</StyledTerminalP>
                        <StyledTerminalP>;; global options: +cmd</StyledTerminalP>
                        <StyledTerminalP>;; Got answer: </StyledTerminalP>
                        <div className="flexRow">
                            <StyledTerminalP>;; -&#62;&#62;HEADER&#60;&#60;</StyledTerminalP>
                            {opCode}
                            {rCode}
                            <StyledTerminalPHover tabIndex="0" onClick={() => setFile(ID)}>id: {response.MsgHdr.Id}</StyledTerminalPHover>
                        </div>
                        <div className="flexRow">
                            <StyledTerminalPHover tabIndex="0"
                                onClick={() => setFile(Flags)}>
                                ;; flags:
                            </StyledTerminalPHover>
                            <StyledTerminalPHover tabIndex="0"
                                onClick={() => setFile(QRFlag)} 
                                className={`terminalRow${response.MsgHdr.Response ? 'Set' : 'Unset'}${classroomView ? 'Hidden' : ''}`}>
                                    qr
                            </StyledTerminalPHover>
                            <StyledTerminalPHover tabIndex="0"
                                onClick={() => setFile(AAFlag)}
                                className={`terminalRow${response.MsgHdr.Authoritative ? 'Set' : 'Unset'}${classroomView ? 'Hidden' : ''}`}>
                                    aa
                            </StyledTerminalPHover>
                            <StyledTerminalPHover
                                onClick={() => setFile(TCFlag)}
                                className={`terminalRow${response.MsgHdr.Truncated ? 'Set' : 'Unset'}${classroomView ? 'Hidden' : ''}`}>
                                    tc
                                </StyledTerminalPHover>
                            <StyledTerminalPHover
                                onClick={() => setFile(RDFlag)}
                                className={`terminalRow${response.MsgHdr.RecursionDesired ? 'Set' : 'Unset'}${classroomView ? 'Hidden' : ''}`}>
                                    rd
                            </StyledTerminalPHover>
                            <StyledTerminalPHover tabIndex="0"
                                onClick={() => setFile(RAFlag)}
                                className={`terminalRow${response.MsgHdr.RecursionAvailable ? 'Set' : 'Unset'}${classroomView ? 'Hidden' : ''}`}>
                                    ra
                            </StyledTerminalPHover>
                            <StyledTerminalPHover tabIndex="0"
                                onClick={() => setFile(ZFlag)}
                                className={`terminalRowUnset${classroomView ? 'Hidden' : ''}`}>
                                    z
                            </StyledTerminalPHover>
                            <StyledTerminalPHover tabIndex="0"
                                onClick={() => setFile(ADFlag)}
                                className={`terminalRow${response.MsgHdr.AuthenticatedData ? 'Set' : 'Unset'}${classroomView ? 'Hidden' : ''}`}>
                                    ad
                            </StyledTerminalPHover>
                            <StyledTerminalPHover tabIndex="0"
                                onClick={() => setFile(CDFlag)}
                                className={`terminalRow${response.MsgHdr.CheckingDisabled ? 'Set' : 'Unset'}${classroomView ? 'Hidden' : ''}`}>
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
                                AUTHORITY:{digishAuthorityLen},
                            </StyledTerminalPHover>
                            <StyledTerminalPHover tabIndex="0" onClick={() => setFile(ARCOUNT)} >
                                ADDITIONAL:{digishAdditionalLen}
                            </StyledTerminalPHover>
                        </div>
                    </StyledTerminalSection>
                    <StyledTerminalSection>
                        <StyledTerminalP>;; OPT PSEUDOSECTION:</StyledTerminalP>
                        <StyledTerminalP>; EDNS: version: 0, flags:; udp: 1232 </StyledTerminalP>
                        <StyledTerminalPHover tabIndex="0" onClick={() => setFile(QuestionSection)} >;; QUESTION SECTION:</StyledTerminalPHover>
                            <div className="tableMargin">{digishQuestions}</div>
                    </StyledTerminalSection>
                    <StyledTerminalSection>
                    <StyledTerminalPHover tabIndex="0" onClick={() => setFile(AnswerSection)} className={`terminalRow${response.Answer ? 'Set' : 'Unset'}${classroomView ? 'Hidden' : ''} `} >;; ANSWER SECTION:</StyledTerminalPHover>
                        <div className="tableMargin">{digishAnswers}</div>
                    </StyledTerminalSection>
                    <StyledTerminalSection>
                        <StyledTerminalPHover tabIndex="0" className={`terminalRow${response.Authority ? 'Set' : 'Unset'}${classroomView ? 'Hidden' : ''} `} onClick={() => setFile(AuthoritySection)}>;; AUTHORITY SECTION:</StyledTerminalPHover>
                        <div className="tableMargin">{digishAuthority}</div>
                    </StyledTerminalSection>
                    <StyledTerminalSection className= {showAdditionalDefault ? `hidden${classroomView}` : ''}>
                        <StyledTerminalPHover tabIndex="0" className={`terminalRow${(response.Additional && !showAdditionalDefault) ? 'Set' : 'Unset'}${classroomView ? 'Hidden' : ''} `} onClick={() => setFile(AdditionalSection)}>;; ADDITIONAL SECTION:</StyledTerminalPHover>
                        <div className={`tableMargin terminalRow${(response.Additional && !showAdditionalDefault) ? 'Set' : 'Unset'}${classroomView ? 'Hidden' : ''}`}>{digishAdditional}
                            <div className= {`terminalRow${(digishAdditionalOpt && !classroomView) ? 'Unset' : 'UnsetHidden'}`} >{digishAdditionalOpt}</div>
                        </div>
                    </StyledTerminalSection>
                    <StyledTerminalSection>
                        <StyledTerminalPHover tabIndex="0" onClick={() => setFile(QueryTime)}>
                            ;; Query time: {queryTime} msec
                        </StyledTerminalPHover>
                        <StyledTerminalPHover tabIndex="0" onClick={() => setFile(Server)} >
                            ;; SERVER: {digishResp.Nameserver}#{digishQuestion.Port}({digishResp.Nameserver}) ({digishQuestion.Transport.toUpperCase()})
                        </StyledTerminalPHover>
                        <StyledTerminalPHover tabIndex="0" onClick={() => setFile(When)} >
                            ;; WHEN: {when}
                        </StyledTerminalPHover>
                        <StyledTerminalPHover tabIndex="0" onClick={() => setFile(MSGSize)} >
                            ;; MSG SIZE rcvd: {digishResp['Message Size']}
                        </StyledTerminalPHover>
                    </StyledTerminalSection>
                </StyledTerminal>
                
                <StyledInfoBoxWrapper>
                <h2 className="infoSectionH2">Info section</h2>
                    <StyledTipBox className="tipBox">
                        <div>
                            <h3>Tip!</h3>
                            <h4>Copy and paste this line into your terminal</h4>
                        </div>
                        <StyledTerminalLine className="terminal">
                            <p>dig @{digishQuestion.Nameserver} -p {digishQuestion.Port} {digishQuestion.Qtype} {digishQuestion.Zone} {questionTransport} {dnssec}</p>
                            <CopyIcon onClick={() =>
                                {navigator.clipboard.writeText(`dig @${digishQuestion.Nameserver} -p ${digishQuestion.Port} ${digishQuestion.Qtype} ${digishQuestion.Zone} ${questionTransport} ${dnssec}`)}
                                }></CopyIcon>
                        </StyledTerminalLine>
                    </StyledTipBox>
                    <StyledInfoBox>
                        {text}
                        {firstText}
                    </StyledInfoBox>
                </StyledInfoBoxWrapper>
         </StyledAnswerWrapper>
}