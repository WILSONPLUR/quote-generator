import "./App.css";
import { useState, useEffect } from "react";
import { Container, Button, Heading, Badge, Alert, AlertIcon } from "@chakra-ui/react";

function App() {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");

  const fetchContent = async() => {
    let response = await fetch("http://api.quotable.io/random")
    let quote = await response.json();
    setText(quote.content);
    setAuthor(quote.author)
  }
  const copy = () => {
    navigator.clipboard.writeText(text).then(
      () => {
         return (<Alert status='success'><AlertIcon />Copied!</Alert>)
      },
      (err) => {
        console.log(err);
      }
    );
  };
  useEffect(() => {
    fetchContent();
  }, []);
  return (
    <div className="App">
      <div className="quote-card">
        <Container maxW="container.md"  style={{ marginTop: 40 }}>
          <Heading className="quote-text" as="h3" size="lg">
            {text}
          </Heading>
          <Badge style={{ marginTop: 10 }} colorScheme="purple">
            {author}
          </Badge>
        </Container>
        <div className="quote-btns">
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
        </div>
       
      </div>
    </div>
  );
}

export default App;
