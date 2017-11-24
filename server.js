const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fallback = require("express-history-api-fallback");
const shortid = require("shortid");

const app = express();

app.use(bodyParser.json());

if (process.env.NODE_ENV !== "production") {
  const corsOptions = {
    origin: "http://localhost:3000"
  };
  app.use(cors(corsOptions));
}

const topics = {
  nYrnfYEv: {
    id: "nYrnfYEv",
    text:
      "Tesla’s New Second-generation Roadster Will Be the Quickest Production Car Ever Made. ‘Period’ - The Verge",
    upvotes: 12
  },
  a4vhAoFG: {
    id: "a4vhAoFG",
    text:
      "Apple acquired augmented reality headset startup Vrvana for $30M - TechCrunch",
    upvotes: 4
  },
  sDrnfYEv: {
    id: "sDrnfYEv",
    text:
      "Instagram adds a request button for friends to crash your live stream - The Verge",
    upvotes: 2
  },
  t7vhAoFG: {
    id: "t7vhAoFG",
    text:
      "Firefox just released a new ultra-fast web browser to take on Google Chrome - Mashable",
    upvotes: 8
  },
  r6vhAoFG: {
    id: "t7vhAoFG",
    text:
      "AltSchool wants to change how kids learn, but fears have surfaced that it’s failing students - TechCrunch",
    upvotes: 0
  }
};

const isUndefined = value => value === undefined;

function isValidTopic(topic) {
  return (
    typeof topic === "object" &&
    (isUndefined(topic.text) ||
      (topic.text && typeof topic.text === "string" && topic.text.trim())) &&
    (isUndefined(topic.upvotes) ||
      (Number.isInteger(topic.upvotes) && topic.upvotes >= 0))
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
      upvotes: 0
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
      res.send(topic);
    } else {
      res.status(400).send({ error: "Bad request!" });
    }
  } else {
    res.status(404).send({ error: "Topic not found!" });
  }
});

app.post("/api/topics/:id/vote", (req, res) => {
  const topic = topics[req.params.id];
  if (topic) {
    const direction = req.body.direction;
    if (direction && Number.isInteger(direction)) {
      topic.upvotes = topic.upvotes + (direction > 0 ? 1 : -1);
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

// server static files in production
if (process.env.NODE_ENV === "production") {
  const root = __dirname + "/build";
  app.use(express.static(root));
  app.use(fallback("index.html", { root }));
}

const serverPort = process.env.PORT || 3001;

app.listen(serverPort, error => {
  if (!error) {
    console.log(`Bubble Up is running on port: ${serverPort}!`);
  }
});
