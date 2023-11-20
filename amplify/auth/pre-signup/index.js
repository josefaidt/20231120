/**
 * My pre-signup trigger
 * @type {import('aws-lambda').PreSignUpTriggerHandler}
 */
exports.handler = async (event) => {
  console.log('event: ', JSON.stringify(event))
  return event
}
