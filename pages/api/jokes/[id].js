import dbConnect from "../../../db/connect";
import Joke from "../../../db/models/Joke";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const joke = await Joke.findById(id);

    if (!joke) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(joke);
  }

  if (request.method === "DELETE") {
    const jokeToDelete = await Joke.findByIdAndDelete(id);
    response.status(200).json(jokeToDelete);
  }

  if (request.method === "PUT") {
    const updatedJoke = await Joke.findByIdAndUpdate(id, {
      $set: request.body,
    });
    console.log(updatedJoke);
    response.status(200).json(updatedJoke);
  }
}
