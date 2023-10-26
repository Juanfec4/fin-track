import "dotenv/config";
import express from "express";
import ip from "ip";

const port: string = process.env.PORT || "8080";
const app = express();

app.listen(port, () => {
  console.log(`Server started on: http://${ip.address()}:${port}`);
});
