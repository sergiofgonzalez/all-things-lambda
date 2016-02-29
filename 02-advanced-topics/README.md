# All Things Lambda &mdash; Advanced Topics
> Advanced concepts: the context object, OS commands, logging and testing Lambdas

## 005-context-properties
Illustrates some of the properties on the `context` object.

## 006-os-commands
Illustrates how to invoke OS commands in a Lambda function using `spawn`.

## 007-using-zeptolog
Illustrates how to use custom Node.js modules from a Lambda function. In particular the application uses `zeptolog` a minimalist custom logging library for Lambda.

## 008-custom-testing-lib
Illustrates how to write a simple testing library for your Lambda function.

## e01-globally-initialized-code
Demonstrates how Lambdas (executing in the same container) shares the globally initialized code that is not part of the handler itself.
