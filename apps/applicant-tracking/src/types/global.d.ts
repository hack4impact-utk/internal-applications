/* eslint-disable no-var */

declare global {
  var mongoose: {
    conn: mongoose // the mongoose connection to use
    promise: Promise<mongoose> | null // the promise that resolves when the connection is established
  }
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string // the URI of the mongodb instance to connect to
      CALENDLY_PAT: string // personal access token for Calendly integration
      CALENDLY_ORG_URI: string // URI of the H4I UTK calendly org
      CALENDLY_USER_URI: string // URI of the H4I UTK calendly user 
      CALENDLY_SIGNING_SECRET: string // shared signing secret used to verify origin of webhook requests
    }
  }
}

export {}
