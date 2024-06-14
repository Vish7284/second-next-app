import { MongoClient } from "mongodb";

const handler =async(req,res)=>{
    if(req.method === 'POST'){
        const data = req.body;
        const client = await MongoClient.connect(
          "mongodb+srv://vp7524019445:nItWKLdqsXiLb19M@cluster0.n1rnof8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
        );
        const db = client.db();
        const todoListItem = db.collection("to-dos");
        const result = await todoListItem.insertOne(data);
            console.log(result);
            client.close();
            res.status(201).json({ message: "to-do Inserted!" });
    }

};
export default handler;

// nItWKLdqsXiLb19M;