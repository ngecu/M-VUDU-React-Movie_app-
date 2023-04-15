import * as React from 'react';
import { useState } from 'react';
import { Card } from 'antd';
import { Drawer } from 'antd';
import { Row,Col } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';


const { Meta } = Card;


export default function RecipeReviewCard({item}) {
  const rating = item.vote_average

  const [open, setOpen] = useState(false);
  const [drawerImg, setDrawerimg] = useState('');
  const [drawerTitle, setDrawertitle] = useState('');
  const [vote_average,setVoteavreage] = useState('');
  const [vote_count,setvoteCount] = useState('')
  const [overview,setOverview] = useState('')
  const [release_date,setReleasedate] = useState('')

  


  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return(
    <>
    <Card
    hoverable
    onClick={
      ()=>{
      showDrawer()
      setDrawerimg(`https://image.tmdb.org/t/p/w1280${item.poster_path}`)
      setDrawertitle(item.title)
      setVoteavreage(item.vote_average)
      setvoteCount(item.vote_count)
      setOverview(item.overview)
      setReleasedate(item.release_date)

    }}
    cover={<img alt="example" src={`https://image.tmdb.org/t/p/w1280${item.poster_path}`} />}
  >
    <Meta title={item.title} description={<p style={{"color":"#C28BFF"}} >
    <StarRatings
        rating={(rating*5)/10}
        starRatedColor="purple"
        numberOfStars={5}
        starDimension="15px"
        starSpacing="1px"
      />
      ({item.vote_count} Votes)
       </p>} />
  </Card>

  <Drawer title={drawerTitle} placement="right" onClose={onClose} open={open}>
        <Row>
          <Col>
          <img alt="example" style={{width:"100%"}} src={drawerImg} />
          </Col>
        </Row>
       <h1>Overview</h1>
        <p>{overview}</p>
        <p>Rating : 
          
        <StarRatings
        rating={(rating*5)/10}
        starRatedColor="purple"
        numberOfStars={5}
        starDimension="20px"
        starSpacing="1px"
      />
          </p>
        <p>Vount Count : {vote_count}</p>
        <p>Release Date : {release_date}</p>


        


      </Drawer>
  </>
  )
}