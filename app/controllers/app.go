package controllers

import (
	"github.com/miekg/dns"
	"github.com/revel/revel"
	"strconv"
	"time"
)

type App struct {
	*revel.Controller
}

var (
	port       int    // "port number to use"
	rd         bool   // "set RD flag in query"
	qname      string // Query Name, What we are looking up
	nameserver string // Where we are looking
)

func (c App) Dig(zone string, transport string, qtype uint16) revel.Result {
	qname = zone
	port = 53
	//nameserver = "8.8.8.8"

	nameserver = "10.30.7.4"
	rd = true

	// build message by sections
	//message := createMessage(rd)
	message := new(dns.Msg)
	message.RecursionDesired = rd
	message.Id = dns.Id()

	//updateQuestion(message, qname)
	message.Question = make([]dns.Question, 1)
	message.Question[0] = dns.Question{
		Name:   dns.Fqdn(qname),
		Qtype:  qtype,
		Qclass: dns.ClassINET,
	}

	//dnsClient := clientSetup()
	client := new(dns.Client)
	client.Net = transport
	client.DialTimeout = 1 * time.Second
	client.ReadTimeout = 1 * time.Second
	client.WriteTimeout = 1 * time.Second
	response, rtt, err := client.Exchange(message, nameserver+":"+strconv.Itoa(port))
	if err != nil {
		panic(err)
	}

	msgSize := response.Len()
	return c.Render(zone, response, rtt, nameserver, msgSize, transport)

}

func (c App) Index() revel.Result {
	// Get a static SOA for pagefault.se
	Zone := "pagefault.se"

	m := new(dns.Msg)
	m.RecursionDesired = true
	m.Question = make([]dns.Question, 1)
	m.Question[0] = dns.Question{Name: dns.Fqdn(Zone), Qtype: dns.TypeSOA, Qclass: dns.ClassINET}

	client := new(dns.Client)

	client.Net = "tcp"

	response, _, err := client.Exchange(m, "8.8.8.8:53")
	rdata := dns.Field(response.Answer[0], 1)
	if err != nil {
		panic(err)
	}
	return c.Render(Zone, response, rdata)
}

func init() {
	revel.TemplateFuncs["optCodeToString"] = func(opcode int) string {
		return dns.OpcodeToString[opcode]
	}

	revel.TemplateFuncs["rCodeToString"] = func(rcode int) string {
		return dns.RcodeToString[rcode]
	}

	revel.TemplateFuncs["qclassToString"] = func(qclass uint16) string {
		return dns.ClassToString[qclass]
	}

	revel.TemplateFuncs["qtypeToString"] = func(qtype uint16) string {
		return dns.TypeToString[qtype]
	}

	revel.TemplateFuncs["getTime"] = func() string {
		now := time.Now()
		return now.Format(time.UnixDate)
	}
}
