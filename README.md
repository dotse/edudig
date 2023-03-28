# EduDig 

Learn DNS using edudig.

### What is EduDig?
Dig is the defacto standard DNS troubleshooting tool. Sadly dig is not always available and has a little bit of a learning curve. EduDig is a web 'dig' that is both useful and educational.
This will enable domain name owners to more easily be able to troubleshoot on their own domain issues and hopefully spread knowledge about the workings of the Domain Name System and how to use dig.

### Try it out.
https://edudig.se

### For (optional) IPv6 support

**Windows**: Untested

**Mac**: Does not work

**Linux**: Tested on Amazon Linux

Adding IPv6 support to Docker:

Add the following to /etc/docker/daemon.json
```
{
    "ipv6": true,
    "fixed-cidr-v6": "fc00:c0de:cafe::/64"
}
```

Restart docker

Add IPv6 routing to iptables on host machine

```ip6tables -t nat -A POSTROUTING -o <interface> -j MASQUERADE```

Run docker-compose with the option ```--file docker-compose-v6.yaml```
