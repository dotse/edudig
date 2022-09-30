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

func (c App) Dig(zone string) revel.Result {
	qname = zone
	port = 53
	nameserver = "8.8.8.8"
	rd = true

	// build message by sections
	message := createMessage(rd)
	updateQuestion(message, qname)

	dnsClient := clientSetup()
	response, rtt, err := dnsClient.Exchange(message, nameserver+":"+strconv.Itoa(port))
	if err != nil {
		panic(err)
	}
	msgSize := response.Len()
	return c.Render(zone, response, rtt, nameserver, msgSize)

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

func createMessage(rd bool) *dns.Msg {
	message := new(dns.Msg)
	message.RecursionDesired = rd
	message.Id = 666
	return message
}

func updateQuestion(message *dns.Msg, qname string) {
	message.Question = make([]dns.Question, 1)
	message.Question[0] = dns.Question{
		Name:   dns.Fqdn(qname),
		Qtype:  dns.TypeA,
		Qclass: dns.ClassINET,
	}
}

func clientSetup() *dns.Client {
	c := new(dns.Client)
	c.Net = "tcp"
	c.DialTimeout = 1 * time.Second
	c.ReadTimeout = 1 * time.Second
	c.WriteTimeout = 1 * time.Second
	return c
}
