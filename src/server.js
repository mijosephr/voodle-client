import { Server, Model, Serializer, belongsTo, hasMany } from "miragejs";

const ApplicationSerializer = Serializer.extend({
  root: false,
  embed: true
});

export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment,

    models: {
      poll: Model.extend({
        options: hasMany("option")
      }),
      option: Model.extend({
        poll: belongsTo("poll", { inverse: "options" })
      })
    },

    serializers: {
      application: ApplicationSerializer,
      poll: ApplicationSerializer.extend({
        include: ["options"]
      })
    },

    seeds(server) {
      const poll1 = server.create("poll", { uid: "a7c3v9", title: "Poll #1" });
      server.create("poll", { uid: "k6s3c1", title: "Poll #2" });
      server.create("poll", { uid: "m2x8w0", title: "Poll #3" });

      server.create("option", { poll: poll1, text: "Option A" });
      server.create("option", { poll: poll1, text: "Option B" });
      server.create("option", { poll: poll1, text: "Option C" });
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
        const { title, options } = JSON.parse(request.requestBody);
        const poll = schema.polls.create({ uid, title });

        options.forEach(option => {
          const { text } = option;
          schema.options.create({ poll, text });
        });

        return poll;
      });

      this.get("/polls/:uid", (schema, request) => {
        return schema.polls.findBy({ uid: request.params.uid });
      });

      this.put("/polls/:uid", (schema, request) => {
        const { title, options } = JSON.parse(request.requestBody);
        const poll = schema.polls.findBy({ uid: request.params.uid });

        poll.update({ title });

        const currentOptionIds = schema.options
          .where({ pollId: poll.id })
          .models.map(option => {
            return option.id;
          });
        const optionToKeepIds = options
          .filter(option => {
            return !!option.id;
          })
          .map(option => {
            return option.id;
          });
        const optionToDeleteIds = currentOptionIds.filter(
          x => !optionToKeepIds.includes(x)
        );

        optionToDeleteIds.forEach(id => {
          schema.options.find(id).destroy();
        });

        options.forEach(option => {
          const { text } = option;
          const optionId = option.id || null;
          if (optionId) {
            const option = schema.options.find(optionId);
            option.update({ text });
          } else {
            schema.options.create({ poll, text });
          }
        });

        return poll;
      });
    }
  });

  return server;
}
