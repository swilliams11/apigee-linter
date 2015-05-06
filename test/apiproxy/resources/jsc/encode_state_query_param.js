var state = context.getVariable("request.queryparam.state");
context.setVariable("mystate", state);
//var location = context.getVariable("request.header.Location");

var encoded = encodeURIComponent(state);
context.setVariable("encodedState",encoded);
//var pattern = /state=[\S\w\W\d\D]*&/g;
//location = location.replace(pattern, "&state=" + state + "&");

//https://login.salesforce.com/services/authcallback/00Dj0000001sJ0uEAE/Sean_OAuth_test?scope=READ&state=1234%20/&code=Vb6mVZHi
//response_type=code​&client_id=I2kUbU2v1TMUbR2QAiU9FB8TcK4w8j9c​&redirect_uri=https%3A%2F%2Flogin.salesforce.com%2Fservices%2Fauthcallback%2F00Dj0000001sJ0uEAE%2FSean_OAuth_test​&state=1234%20%2F​

/*var location = "https://login.salesforce.com/services/authcallback/00Dj0000001sJ0uEAE/Sean_OAuth_test?"
 + "response_type=" + context.getVariable("request.queryparam.response_type")
 + "&client_id=" + context.getVariable("request.queryparam.client_id")
 + "&redirect_uri=" + context.getVariable("request.queryparam.redirect_uri")
 + "&state=" + encoded
 + "&code=" + context.getVariable("request.queryparam.code");*/

var location = "https://login.salesforce.com/services/authcallback/00Dj0000001sJ0uEAE/Sean_OAuth_test?"
 + "scope=READ"
 + "&state=" + encoded
 + "&code=" + context.getVariable("oauthv2authcode.GenerateAuthorizationCode.code");


context.setVariable("response.queryparam.state",encoded);
context.setVariable("response.header.Location",location);