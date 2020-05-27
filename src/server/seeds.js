export default function(server) {
  const poll1 = server.create("poll", { uid: "a7c3v9", title: "Poll #1" });
  server.create("poll", { uid: "k6s3c1", title: "Poll #2" });
  server.create("poll", { uid: "m2x8w0", title: "Poll #3" });

  server.create("option", { poll: poll1, text: "Option A" });
  server.create("option", { poll: poll1, text: "Option B" });
  server.create("option", { poll: poll1, text: "Option C" });
}
