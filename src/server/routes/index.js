import { makeSlug, createOrUpdateOptions, deleteMissingOptions } from "./utils";

export default function() {
  this.namespace = "api";

  this.get("/polls", schema => {
    return schema.polls.all();
  });

  this.post("/polls", (schema, request) => {
    const uid = makeSlug();
    const { title, options } = JSON.parse(request.requestBody);

    const poll = schema.polls.create({ uid, title });
    createOrUpdateOptions(schema, poll, options);

    return poll;
  });

  this.get("/polls/:uid", (schema, request) => {
    return schema.polls.findBy({ uid: request.params.uid });
  });

  this.put("/polls/:uid", (schema, request) => {
    const { title, options } = JSON.parse(request.requestBody);
    const poll = schema.polls.findBy({ uid: request.params.uid });

    poll.update({ title });
    deleteMissingOptions(schema, poll, options);
    createOrUpdateOptions(schema, poll, options);

    return poll;
  });
}
