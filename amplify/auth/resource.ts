import { Runtime } from 'aws-cdk-lib/aws-lambda'
import { defineAuth, Func } from '@aws-amplify/backend'

/**
 * Define and configure your auth resource
 * When used alongside data, it is automatically configured as an auth provider for data
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    // add social providers
    externalProviders: {
      /**
       * first, create your secrets using `amplify sandbox secret`
       * then, import `secret` from `@aws-amplify/backend`
       * @see https://docs.amplify.aws/gen2/deploy-and-host/sandbox-environments/features/#setting-secrets
       */
      // loginWithAmazon: {
      //   clientId: secret('LOGINWITHAMAZON_CLIENT_ID'),
      //   clientSecret: secret('LOGINWITHAMAZON_CLIENT_SECRET'),
      // }
    },
  },
  /**
   * enable multifactor authentication
   * @see https://docs.amplify.aws/gen2/build-a-backend/auth/manage-mfa
   */
  // multifactor: {
  //   mode: 'OPTIONAL',
  //   sms: {
  //     smsMessage: (code) => `Your verification code is ${code}`,
  //   },
  // },
  userAttributes: {
    /** request additional attributes for your app's users */
    // profilePicture: {
    //   mutable: true,
    //   required: false,
    // },
  },
  triggers: {
    preSignUp: Func.fromDir({
      name: 'pre-signup',
      codePath: './pre-signup',
      runtime: Runtime.PYTHON_3_9,
    }),
    postConfirmation: await Func.build({
      name: 'post-confirmation',
      // codePath: './post-confirmation/build',
      buildCommand: 'cd post-confirmation; npm run build',
      outDir: './post-confirmation/build',
    }),
  },
})
