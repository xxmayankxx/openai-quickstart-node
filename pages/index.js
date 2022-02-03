import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState("I have this overwhelming urge to spit on you");
  const [question, setQuestion] = useState("");
  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ animal: animalInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setAnimalInput("");
    setQuestion(animalInput);
  }

  return (
    <div>
      <Head>
        <title>Not so friendly neighborhood chatbot</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        {/* <img src="/dog.png" className={styles.icon} /> */}
        <h3>I'm not so friendly neighborhood chatbot. I run on Sarcasm++</h3>
                <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Ask me something interesting..."
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Ask" />
        </form>
        {/* <div className={styles.question}>{question}</div> */}
        <div className={styles.result}>{result}</div>
        <img src="/roman.png" className={styles.roman} />
      </main>
    </div>
  );
}
