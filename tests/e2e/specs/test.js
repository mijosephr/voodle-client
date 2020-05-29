// eslint-disable

import { makeServer } from "../../../src/server";

describe("Edit Poll", () => {
  let server;

  beforeEach(() => {
    server = makeServer({ environment: "test" });
  });

  afterEach(() => {
    server.shutdown();
  });

  it("shows the users from our server", () => {
    const poll = server.create("poll", { uid: "a7c3v9", title: "Poll #1" });

    server.create("option", { poll, text: "Option A" });
    server.create("option", { poll, text: "Option B" });
    server.create("option", { poll, text: "Option C" });

    cy.visit(`/polls/${poll.uid}/edit`);

    cy.get('[data-testid="user-1"]').contains("Luke");
    cy.get('[data-testid="user-2"]').contains("Leia");
  });
});
