import { useState, useEffect } from "react";
import { Container, Button, Badge, useToast, Text, Box, Center  } from "@chakra-ui/react";

function App() {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const toast = useToast();

  const fetchContent = async() => {
    let response = await fetch("http://api.quotable.io/random")
    let quote = await response.json();
    setText(quote.content);
    setAuthor(quote.author)
  }


  const copy = () => {
    navigator.clipboard.writeText(text).then(
      () => { 
          return toast({
            title: 'Quote copied!',
            status: 'info',
            duration: 3000,
            isClosable: false,
          })
             },
      (err) => {
        return toast({
          title: 'Error...Try again',
          description: err,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    );
    
  };
  useEffect(() => {
    fetchContent();
  }, []);
  return (
        
  
    <Container display="flex" flexDirection="column" textAlign="center" centerContent maxW="container.md"  style={{ marginTop: 40 }}>
         <Center h="600px">
           <Box>
         <Text fontSize="2xl" fontStyle="italic">
            {text}
          </Text>
          <Badge style={{ marginTop: 10 }} colorScheme="purple">
            {author}
          </Badge>
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
        </Box>
         </Center>
    </Container>
  );
}

export default App;
