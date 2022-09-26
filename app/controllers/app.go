package controllers

import (
	"github.com/miekg/dns"
	"github.com/revel/revel"
)

type App struct {
	*revel.Controller
}

func (c App) JDig(zone string) revel.Result {
	Zone := zone
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

func (c App) Dig(zone string) revel.Result {
	Zone := zone
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

func (c App) Index() revel.Result {
	// Get a static A record for catch22.se
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
