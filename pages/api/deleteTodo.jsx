import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { id } = req.query;

    const client = await MongoClient.connect(
      "mongodb+srv://vp7524019445:nItWKLdqsXiLb19M@cluster0.n1rnof8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );

    const db = client.db();
    const todoListItem = db.collection("to-dos");

    const result = await todoListItem.deleteOne({ _id: ObjectId(id) });

    client.close();

    res.status(200).json({ message: "Todo deleted", result });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
