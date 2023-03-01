import JokeList from "../components/JokeList";
import JokeForm from "../components/JokeForm";

export default function HomePage() {
  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const jokeData = Object.fromEntries(formData);

    const response = await fetch("/api/jokes", {
      method: "POST",
      body: JSON.stringify(jokeData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      await response.json();
      jokes.mutate();
      event.target.reset();
    } else {
      console.error(`Error: ${response.status}`);
    }
  }
  return (
    <>
      <JokeForm onSubmit={handleSubmit} />
      <JokeList />
    </>
  );
}
