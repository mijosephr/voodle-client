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

  it("updates poll options", () => {
    const poll = server.create("poll", { uid: "a7c3v9", title: "Poll #1" });

    server.create("option", { poll, text: "Option A" });
    server.create("option", { poll, text: "Option B" });
    server.create("option", { poll, text: "Option C" });

    cy.visit(`/polls/${poll.uid}/edit`);

    cy.findByTestId("title")
      .clear()
      .type("Poll #123");
    cy.findByTestId("options").click();
    cy.findByTestId("add").click();
    cy.findAllByTestId("text").each((item, index) => {
      cy.wrap(item)
        .clear()
        .type(`Option ${index + 1}`);
    });
    // cy.findByTestId("saveOptions").click();
    cy.get("#saveOptions").click();
    // cy.findByTestId("savePoll").click();
    cy.get("#savePoll").click();

    cy.findByTestId("title").should("contain", "Poll #123");
    cy.findAllByTestId("option").should("have.length", 4);
  });
});
