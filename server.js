const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const isInteger = require("lodash/isinteger");
const isUndefined = require("lodash/isundefined");
const shortid = require("shortid");

const app = express();

app.use(bodyParser.json());

const corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));

const topics = {
  nYrnfYEv: {
    id: "nYrnfYEv",
    text: "Cultural accumulation vs. cultural decay",
    upvotes: 19,
    downvotes: 1
  },
  a4vhAoFG: {
    id: "a4vhAoFG",
    text: "Silicon Valley could be the next hotspot for SEC whistleblowers",
    upvotes: 45,
    downvotes: 0
  }
};

function isValidTopic(topic) {
  return (
    typeof topic === "object" &&
    (isUndefined(topic.text) ||
      (topic.text && typeof topic.text === "string" && topic.text.trim())) &&
    (isUndefined(topic.upvotes) ||
      (isInteger(topic.upvotes) && topic.upvotes >= 0)) &&
    (isUndefined(topic.downvotes) ||
      (isInteger(topic.downvotes) && topic.downvotes >= 0))
  );
}

app.get("/api/topics", (req, res) => {
  res.send(Object.values(topics));
});

app.get("/api/topics/:id", (req, res) => {
  const topic = topics[req.params.id];
  if (topic) {
    res.send(topic);
  } else {
    res.status(404).send({ error: "Topic not found!" });
  }
});

app.post("/api/topics", (req, res) => {
  if (isValidTopic(req.body) && req.body.text) {
    const topic = {
      id: shortid.generate(),
      text: req.body.text,
      upvotes: 0,
      downvotes: 0
    };
    topics[topic.id] = topic;
    res.send(topic);
  } else {
    res.status(400).send({ error: "Bad request!" });
  }
});

app.put("/api/topics/:id", (req, res) => {
  const topic = topics[req.params.id];
  if (topic) {
    if (isValidTopic(req.body)) {
      topic.text = req.body.text || topic.text;
      topic.upvotes = isUndefined(req.body.upvotes)
        ? topic.upvotes
        : req.body.upvotes;
      topic.downvotes = isUndefined(req.body.downvotes)
        ? topic.downvotes
        : req.body.downvotes;
      res.send(topic);
    } else {
      res.status(400).send({ error: "Bad request!" });
    }
  } else {
    res.status(404).send({ error: "Topic not found!" });
  }
});

app.delete("/api/topics/:id", (req, res) => {
  if (topics[req.params.id]) {
    delete topics[req.params.id];
    res.send({ message: "Success!" });
  } else {
    res.status(404).send({ error: "Topic not found!" });
  }
});

app.listen(3001, () =>
  console.log("Bubble-Up development mock server listening on port 3001!")
);
