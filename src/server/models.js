import { Model, belongsTo, hasMany } from "miragejs";

export default {
  poll: Model.extend({
    options: hasMany("option")
  }),
  option: Model.extend({
    poll: belongsTo("poll", { inverse: "options" })
  })
};
