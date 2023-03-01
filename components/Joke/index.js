import useSWR from "swr";
import { useRouter } from "next/router";
import Button from "../Button";
import JokeForm from "../JokeForm";

export default function Joke() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, mutate } = useSWR(id ? `/api/jokes/${id}` : null);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  async function handleDelete() {
    await fetch(`/api/jokes/${id}`, {
      method: "DELETE",
    });

    router.push("/");
  }

  async function handleUpdate(joke) {
    await fetch(`/api/jokes/${id}`, {
      method: "PUT",
      body: JSON.stringify(joke),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <>
      <small>ID: {id}</small>
      <h1>{data?.joke}</h1>
      <JokeForm value={data?.joke} onSubmit={handleUpdate} mutate={mutate} />
      <Button onClick={handleDelete}>Delete Joke</Button>
      <Button type="button" onClick={() => router.push("/")}>
        Back to all
      </Button>
    </>
  );
}
