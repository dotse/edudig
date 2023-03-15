package apiserver

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/dotse/edudig/pkg"
	"github.com/miekg/dns"
)

/*
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

*/

// digish gets query data from the frontend, creates and sends a dns query.
// The reply is parsed and sent back to the frontend.
func digish(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("access-control-allow-origin", "*")
	w.Header().Set("access-control-allow-methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("access-control-allow-headers", "Accept, content-type, referer ")
	if r.Method == "OPTIONS" {
		return
	}
	var query pkg.Query
	var dug pkg.Dug
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&query)
	if err != nil {
		log.Printf("Unmarshalling error, %v", err)
	}
	fmt.Println(query.Zone)
	message := new(dns.Msg)
	message.RecursionDesired, err = strconv.ParseBool(query.Recursion)
	if err != nil {
		message.RecursionDesired = true
	}
	message.Id = dns.Id()

	message.Question = make([]dns.Question, 1)
	message.Question[0] = dns.Question{
		Name:   dns.Fqdn(query.Zone),
		Qtype:  dns.StringToType[query.Qtype],
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

	dug = pkg.Dug{
		Zone: query.Zone,
		Resp: pkg.Response{
			MsgHdr:     response.MsgHdr,
			Compress:   response.Compress,
			Question:   response.Question,
			Answer:     response.Answer,
			Authority:  response.Ns,
			Additional: response.Extra,
		},
		RTT:        rtt,
		Nameserver: query.Nameserver,
		MsgSize:    msgSize,
		Transport:  query.Transport,
	}
	err = json.NewEncoder(w).Encode(dug)
	if err != nil {
		log.Printf("Encoding error, %v", err)
	}
}
