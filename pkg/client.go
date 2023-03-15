package pkg

import (
	"github.com/miekg/dns"
	"time"
)

// Query contains the information needed to create a DNS query
type Query struct {
	Zone       string `json:"Zone"`
	Nameserver string `json:"Nameserver"`
	Transport  string `json:"Transport"`
	Qname      string `json:"Qname"`
	Qtype      string `json:"Qtype"`
	Port       string `json:"Port"`
	Recursion  string `json:"Recursion"`
}

// Response is used to rename the fields dns.Msg.Ns -> Response.Authority
// and dns.Msg.Extra -> Response.Additional to make it easier for the front end.
type Response struct {
	MsgHdr     dns.MsgHdr
	Compress   bool
	Question   []dns.Question
	Answer     []dns.RR
	Authority  []dns.RR
	Additional []dns.RR
}

// Dug contains the reply from the dns query and some extra data to be returned to the frontend
type Dug struct {
	Zone       string        `json:"Zone"`
	Resp       Response      `json:"Response"`
	RTT        time.Duration `json:"Round trip time"`
	Nameserver string        `json:"Nameserver"`
	MsgSize    int           `json:"Message Size"`
	Transport  string        `json:"Transport"`
}
