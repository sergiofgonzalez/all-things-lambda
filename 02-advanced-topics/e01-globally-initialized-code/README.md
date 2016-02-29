# All Things Lambda &mdash; e01-globally-initialized-code
> illustrates how different executions share the same globally initialized code

## Description
Lambda functions are supposed to be executed in a container. Additionally, code that is not part of the handler is initialized only once (the first time), and then cached for the rest of the executions of the Lambda.

Rather than exploiting this *experimental feature*, you should be aware of this fact to prevent gotchas.

In the example, an array of numbers is initialized outside the definition of the handler (therefore, it would be cached for subsequent executions), and additional numbers are pushed into the array in the subsequent executions.
The program will display the state of the array before and after executing the Lambda function, so that you can check that the arrays is effectively cached.

### Configuration and Testing
The Lambda function do not expect any input event, and only requires the most basic execution role.
