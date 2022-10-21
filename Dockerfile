FROM golang:1.18.5-alpine AS build

RUN apk add --update git curl bash

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download && go mod verify
RUN go install github.com/revel/cmd/revel@latest


ENV CGO_ENABLED 0

ADD . .

EXPOSE 9000
ENTRYPOINT revel run
