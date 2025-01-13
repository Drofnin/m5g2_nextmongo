import {MongoClient, ServerApiVersion} from 'mongodb'

const uri = process.env.MONGODB_URI
if(!uri){
    throw new Error("environment variable MONGODB_URI is not defined");
}


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const cursor = await client.db("test").collection("greetings").find();
    const array = await cursor.toArray()
    return array;

    /*await client.db("admin").command({ ping: 1 });*/

    /*console.log("Pinged your deployment. You successfully connected to MongoDB!");*/
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
/*run().catch(console.dir);*/

export default async function Database() {
  const greetings =  await run();
  return (<>
      {greetings.map(greetingObj=> <h1>{greetingObj.greeting}</h1>)}
  </>)
}


   /* run().catch(console.dir);
    return (<h1>Trying out the database</h1>)
  }*/
