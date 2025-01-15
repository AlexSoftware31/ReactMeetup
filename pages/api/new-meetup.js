//POST api/new-meetup

import { MongoClient } from "mongodb";

export default async function handle(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    try {
      const client = await MongoClient.connect(
        "mongodb+srv://alexander:Y7TOBVxPOBo07a2m@cluster0.7lany.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
      );
      console.log("Connected to MongoDB");
      const db = client.db();
      const meetupsCollections = db.collection("meetups");

      const result = await meetupsCollections.insertOne(data);

      console.log("Insert Result:", result);

      res.status(201).json({ message: "Meetup inserted!" });
      client.close();
    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({ message: "Inserting data failed!" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
