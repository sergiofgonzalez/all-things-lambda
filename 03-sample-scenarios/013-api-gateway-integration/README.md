# All Things Lambda &mdash; 013-api-gateway-integration
> building a serverless backend using Lambda with with the API Gateway

## Description
Lambda function that is activated by an HTTP call to the API Gateway. The lambda expects an event message which is formatted using API Gateway capabilities and returns back an `application/json` message to the caller.

### Configuration and Testing
The Lambda function needs to be configured with the basic execution role. However, to be able to properly test the function you will have to create a configure an API using the API Gateway.
1. Create a new API
2. Create a new resource
3. Create the `GET` method
4. Configure the Mapping template as follows
```
{
  "httpMethod": "$context.httpMethod",
  "resourcePath": "$context.resourcePath",
  "body": "$input.json('$')",
  "headers": "$input.params().header",
  "query": {
    #foreach($query in $input.params().querystring.keySet())
    "$query": "$util.escapeJavaScript($input.params().querystring.get($query))" #if($foreach.hasNext),#end
    #end
  },
  "params": "$input.params().path"
}
```
5. Test within the API Gateway
6. Add a query parameter
7. Verify from within the API Gateway that the invocation is successfully performed. Verify the response from the Lambda function.
