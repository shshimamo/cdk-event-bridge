import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as events from 'aws-cdk-lib/aws-events';
import * as eventsTargets from 'aws-cdk-lib/aws-events-targets';
import * as go from '@aws-cdk/aws-lambda-go-alpha'
import { Construct } from 'constructs';

export class CdkEventBridgeStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const batchSampleTable = new dynamodb.Table(this, "DynamodbTable", {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: "sample_id",
        type: dynamodb.AttributeType.NUMBER,
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    const lambda = new go.GoFunction(this, "LambdaFunction", {
      entry: "lambda",
      timeout: cdk.Duration.seconds(300),
      environment: {
        TABLE_NAME: batchSampleTable.tableName
      }
    });
    batchSampleTable.grantReadWriteData(lambda);

    // EventBridge
    new events.Rule(this, "EventsRule", {
      // See: https://docs.aws.amazon.com/ja_jp/AmazonCloudWatch/latest/events/ScheduledEvents.html#CronExpressions
      schedule: events.Schedule.cron({ minute: "*/5" }),
      targets: [new eventsTargets.LambdaFunction(lambda, { retryAttempts: 3 })],
    });
  }
}
