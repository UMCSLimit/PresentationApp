import React from 'react';
import axios from 'axios';
import { Heading, Text, Image } from 'spectacle';

const urlUMCS = 'http://localhost:5000';

class NewsUmcs extends React.Component {
  constructor() {
    super();
    this.state = {
      news: {},
      slideList: []
    };
  }

  componentDidMount() {
    axios.get(urlUMCS)
      .then(res => {
        const news = res.data;
        const slideList = news.map((d) => {
          return (
            <div>
              <Heading key={d.id} size={5}>
                {d.title}
              </Heading>
              <Image src={d.url}></Image>
              <Text></Text>
            </div>
          )});
        this.setState({ news, slideList });
      })
  }

  render() {
    if(this.state.slideList)
      return (
        <div>
          { this.state.slideList }
        </div>
      )
    return (
      <div></div>
    )
  }
}

export default NewsUmcs;
