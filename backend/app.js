const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.get("/pokemon-list", async (req, res) => {
  try {
    const offset = Math.floor(Math.random() * 100);
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching list" });
  }
});

app.get("/pokemonDetail/:name", async (req, res) => {
  try {
    const name = req.params.name;

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.log("Error fetching pokemon detail", err);
    res.status(500).json({ message: "Error fetching detail" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
