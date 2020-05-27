import { Server, Model, Serializer } from "miragejs";

const ApplicationSerializer = Serializer.extend({
  root: false,
  embed: true
});

export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment,

    models: {
      poll: Model
    },

    serializers: {
      application: ApplicationSerializer
    },

    seeds(server) {
      server.create("poll", { uid: "a7c3v9", title: "Poll #1" });
      server.create("poll", { uid: "k6s3c1", title: "Poll #2" });
      server.create("poll", { uid: "m2x8w0", title: "Poll #3" });
    },

    routes() {
      this.namespace = "api";

      this.get("/polls", schema => {
        return schema.polls.all();
      });

      this.post("/polls", (schema, request) => {
        const uid = Math.random()
          .toString(36)
          .slice(2);
        const { title } = JSON.parse(request.requestBody);
        return schema.polls.create({ uid, title });
      });

      this.get("/polls/:uid", (schema, request) => {
        return schema.polls.findBy({ uid: request.params.uid });
      });

      this.put("/polls/:uid", (schema, request) => {
        const { title } = JSON.parse(request.requestBody);
        const poll = schema.polls.findBy({ uid: request.params.uid });
        poll.update({ title });
        return poll;
      });
    }
  });

  return server;
}
