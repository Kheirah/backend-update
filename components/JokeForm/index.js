import styled from "styled-components";
import Button from "../Button";
import { useState } from "react";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-block-start: 2rem;
`;

export default function JokeForm({ value, onSubmit, mutate }) {
  const [joke, setJoke] = useState(value);

  function handleUpdate(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const jokeData = Object.fromEntries(formData);
    onSubmit(jokeData);
    mutate();
  }

  return (
    <StyledForm onSubmit={handleUpdate}>
      <label htmlFor="joke-input">Submit Joke</label>
      <input
        type="text"
        id="joke-input"
        name="joke"
        value={joke}
        onChange={(event) => setJoke(event.target.value)}
      />
      <Button width="fit-content" type="submit">
        Submit
      </Button>
    </StyledForm>
  );
}
