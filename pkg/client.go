package pkg

import (
	"fmt"
	"net"
	"strings"
	"time"

	"github.com/miekg/dns"
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
	IpVersion  string `json:"IpVersion"`
}

// Harmonize lookup nameserver to always use IP:Port
// Check if valid IP. If not assume hostname and look it up, selevting the first available ip
// of correct version
func (q *Query) GetLookupNS() string {
	var ns string
	ip := net.ParseIP(q.Nameserver)
	if ip != nil {
		if q.IpVersion == "6" {
			ns = "[" + q.Nameserver + "]:" + q.Port
		} else {
			ns = q.Nameserver + ":" + q.Port
		}
	} else {
		IPlist, err := net.LookupIP(q.Nameserver)
		if err != nil {
			fmt.Printf("Nameserver lookup error: %v\n", err)
		} else {
			for _, ip := range IPlist {
				if q.IpVersion == "6" {
					if strings.Count(ip.String(), ":") >= 2 {
						ns = "[" + ip.String() + "]:" + q.Port
						break
					}
				} else {
					ns = ip.String() + ":" + q.Port
					break
				}
			}
		}

	}
	return ns
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
