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
	var doBit bool

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
	doBit, err = strconv.ParseBool(query.DNSSEC)
	message.SetEdns0(1232, doBit)
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
	timeStamp := time.Now().Format("Mon Jan 2 15:04:05 UTC 2006")

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
		TimeStamp:  timeStamp,
	}
	err = json.NewEncoder(w).Encode(dug)
	if err != nil {
		log.Printf("Encoding error, %v", err)
	}
}
