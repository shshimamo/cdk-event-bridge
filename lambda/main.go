package main

import (
	"context"
	"log"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handleEvent(ctx context.Context, event events.CloudWatchEvent) {
	log.Printf("v: %v\n", event)
	log.Printf("+v: %+v\n", event)
	log.Printf("#v: %#v\n", event)
	log.Printf("T: %T\n", event)
}

func main() {
	lambda.Start(handleEvent)
}
