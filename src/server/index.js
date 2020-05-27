import { Server } from "miragejs";
import models from "./models";
import serializers from "./serializers";
import seeds from "./seeds";
import routes from "./routes";

export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment,
    models,
    serializers,
    seeds,
    routes
  });

  return server;
}
