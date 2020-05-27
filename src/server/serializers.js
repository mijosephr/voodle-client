import { Serializer } from "miragejs";

const ApplicationSerializer = Serializer.extend({
  root: false,
  embed: true
});

export default {
  application: ApplicationSerializer,
  poll: ApplicationSerializer.extend({
    include: ["options"]
  })
};
