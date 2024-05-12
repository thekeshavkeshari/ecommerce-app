import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Module Check Ho Raha Ki Nahi");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
