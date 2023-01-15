#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkEventBridgeStack } from '../lib/cdk-event-bridge-stack';

const app = new cdk.App();
new CdkEventBridgeStack(app, 'CdkEventBridgeStack', {
});