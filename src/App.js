// @ts-nocheck
import "./App.css";
import { useState, useEffect } from "react";
import { Container, Button, Heading, Badge, Link } from "@chakra-ui/react";
import { FaTelegram } from "react-icons/fa";

function App() {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");

  const fetchContent = () => {
    fetch("http://api.quotable.io/random")
      .then((res) => res.json())
      .then((quote) => {
        setText(quote.content);
        setAuthor(quote.author);
      });
  };
  const copy = () => {
    navigator.clipboard.writeText(text).then(
      () => {
        console.log("Async: Copying to clipboard was successful!");
      },
      (err) => {
        console.error("Async: Could not copy text: ", err);
      }
    );
  };
  useEffect(() => {
    fetchContent();
  }, []);
  return (
    <div className="App">
      <div className="quote-card">
        <Container maxW="container.lg" style={{ marginTop: 40 }}>
          <Heading className="quote-text" as="h3" size="lg">
            {text}
          </Heading>
          <Badge style={{ marginTop: 10 }} colorScheme="purple">
            {author}
          </Badge>
        </Container>
        <Button
          style={{ marginTop: 30, marginRight: 10 }}
          colorScheme="pink"
          variant="solid"
          onClick={fetchContent}
        >
          Refresh
        </Button>
        <Button
          onClick={copy}
          style={{ marginTop: 30, marginRight: 10 }}
          colorScheme="teal"
          variant="solid"
        >
          Copy
        </Button>
        <Button
          colorScheme="telegram"
          leftIcon={<FaTelegram />}
          style={{ marginTop: 30 }}
        >
          <Link href="https://t.me/worldofsut" isExternal>
            Telegram-канал
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default App;
