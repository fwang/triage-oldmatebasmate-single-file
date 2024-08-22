/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "playground",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    const api = new sst.aws.ApiGatewayV2("Api");
    const web = new sst.aws.StaticSite("Web", {
      path: "web",
      environment: {
        VITE_API_URL: api.url,
      },
    });

    api.route("GET /", {
      handler: "./functions/index.handler",
      link: [web],
    });
  },
});

