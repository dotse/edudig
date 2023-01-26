package apiserver

import (
	"encoding/json"
	"fmt"
	"github.com/miekg/dns"
	"log"
	"net/http"
	"time"
)

var TypeToInt = map[string]uint16{
	"None":       0,
	"A":          1,
	"NS":         2,
	"MD":         3,
	"MF":         4,
	"CNAME":      5,
	"SOA":        6,
	"MB":         7,
	"MG":         8,
	"MR":         9,
	"NULL":       10,
	"PTR":        12,
	"HINFO":      13,
	"MINFO":      14,
	"MX":         15,
	"TXT":        16,
	"RP":         17,
	"AFSDB":      18,
	"X25":        19,
	"ISDN":       20,
	"RT":         21,
	"NSAPPTR":    23,
	"SIG":        24,
	"KEY":        25,
	"PX":         26,
	"GPOS":       27,
	"AAAA":       28,
	"LOC":        29,
	"NXT":        30,
	"EID":        31,
	"NIMLOC":     32,
	"SRV":        33,
	"ATMA":       34,
	"NAPTR":      35,
	"KX":         36,
	"CERT":       37,
	"DNAME":      39,
	"OPT":        41,
	"APL":        42,
	"DS":         43,
	"SSHFP":      44,
	"RRSIG":      46,
	"NSEC":       47,
	"DNSKEY":     48,
	"DHCID":      49,
	"NSEC3":      50,
	"NSEC3PARAM": 51,
	"TLSA":       52,
	"SMIMEA":     53,
	"HIP":        55,
	"NINFO":      56,
	"RKEY":       57,
	"TALINK":     58,
	"CDS":        59,
	"CDNSKEY":    60,
	"OPENPGPKEY": 61,
	"CSYNC":      62,
	"ZONEMD":     63,
	"SVCB":       64,
	"HTTPS":      65,
	"SPF":        99,
	"UINFO":      100,
	"UID":        101,
	"GID":        102,
	"UNSPEC":     103,
	"NID":        104,
	"L32":        105,
	"L64":        106,
	"LP":         107,
	"EUI48":      108,
	"EUI64":      109,
	"URI":        256,
	"CAA":        257,
	"AVC":        258,
	"TKEY":       249,
	"TSIG":       250,
	"IXFR":       251,
	"AXFR":       252,
	"MAILB":      253,
	"MAILA":      254,
	"ANY":        255,
	"TA":         32768,
	"DLV":        32769,
	"Reserved":   65535,
}

type Query struct {
	Zone       string `json:"Zone"`
	Nameserver string `json:"Nameserver"`
	Transport  string `json:"Transport"`
	Qname      string `json:"Qname"`
	Qtype      string `json:"Qtype"`
	Port       string `json:"Port"`
	Recursion  bool   `json:"Recursion"`
}

type DugOut struct {
	Zone       string        `json:"Zone"`
	Resp       *dns.Msg      `json:"Response"`
	RTT        time.Duration `json:"Round trip time"`
	Nameserver string        `json:"Nameserver"`
	MsgSize    int           `json:"Message Size"`
	Transport  string        `json:"Transport"`
}

var Queries []Query

func digish(w http.ResponseWriter, r *http.Request) {
	var query Query
	var dugOut DugOut

	// TODO: Read up on Unmarshal and NewDecoder, what is the differnce?
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&query)
	if err != nil {
		log.Printf("Unmarshalling error, %v", err)
	}
	fmt.Println(query.Zone)
	message := new(dns.Msg)
	message.RecursionDesired = query.Recursion
	message.Id = dns.Id()

	message.Question = make([]dns.Question, 1)
	message.Question[0] = dns.Question{
		Name:   dns.Fqdn(query.Zone),
		Qtype:  TypeToInt[query.Qtype],
		Qclass: dns.ClassINET,
	}

	client := new(dns.Client)
	client.Net = query.Transport
	client.DialTimeout = 1 * time.Second
	client.ReadTimeout = 1 * time.Second
	client.WriteTimeout = 1 * time.Second
	response, rtt, err := client.Exchange(message, query.Nameserver+":"+query.Port)
	if err != nil {
		panic(err)
	}

	msgSize := response.Len()

	dugOut = DugOut{
		Zone:       query.Zone,
		Resp:       response,
		RTT:        rtt,
		Nameserver: query.Nameserver,
		MsgSize:    msgSize,
		Transport:  query.Transport,
	}
	err = json.NewEncoder(w).Encode(dugOut)
	if err != nil {
		log.Printf("Encoding error, %v", err)
	}
}
