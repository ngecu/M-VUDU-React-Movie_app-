import RecipeReviewCard from './components/Card';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col,Container,Form,Navbar } from 'react-bootstrap';
import {message,Divider} from 'antd'

function App() {
  const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY
  console.log("my key is ",REACT_APP_API_KEY);
  // const [prompt,setPrompt] =useState("")
  const [movies,setMovies] = useState([])
  const [messageApi, contextHolder] = message.useMessage();

 const fetchData =async (prompt) => {
  if (prompt) {
    const {data} = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${REACT_APP_API_KEY}&query="${prompt}`);  
    const {results} = data 
    setMovies(results);
  }
  else{
    const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${REACT_APP_API_KEY}&page=${Math.floor(Math.random() * 100) + 1}`);       
    const {results} = data
    console.log(results);
    setMovies(results);
  }
 }


   useEffect(()=>{
    fetchData();  
  },[])

  const success = () => {
    messageApi.open({
      type: 'loading',
      content: 'Action in progress..',
      duration: 0,
    });
    // Dismiss manually and asynchronously
    setTimeout(messageApi.destroy, 2500);
  };

  return (
    <div className="App ">
      <Container maxWidth="sm">
      {contextHolder}

      <Navbar bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand href="#home" style={{"color":"white"}}>
        <img
              src="https://i.pinimg.com/originals/4d/78/79/4d7879049736de0fc394cb31686bb6c9.gif"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          
          M-VUDU</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
          <Form.Group className="mb-3" controlId="formBasicMovie">
        <Form.Control type="text" placeholder="Enter Movie Name" onKeyUp={(e)=>{
          fetchData(e.target.value)
          success()
        }} />
      </Form.Group>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>

     

<Row style={{marginTop:"7%"}}>
{movies.map((item,i)=>(
    <Col xs={3} lg={3}>
         <RecipeReviewCard item={item} />
    </Col>
     ))}
    <Divider />
  </Row>

       
      </Container>
    </div>
  );
}

export default App;
