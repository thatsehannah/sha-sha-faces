// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://25cd5c07550ebc801fae31a50f5dd163@o4508814444068865.ingest.us.sentry.io/4509015969693696",

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
