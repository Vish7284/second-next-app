import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "PATCH") {
    const { id } = req.query;

    const client = await MongoClient.connect(
      "mongodb+srv://vp7524019445:nItWKLdqsXiLb19M@cluster0.n1rnof8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );

    const db = client.db();
    const todoListItem = db.collection("to-dos");

    const todo = await todoListItem.findOne({ _id: ObjectId(id) });
    const result = await todoListItem.updateOne(
      { _id: ObjectId(id) },
      { $set: { completed: !todo.completed } }
    );

    client.close();

    res.status(200).json({ message: "Todo updated", result });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
