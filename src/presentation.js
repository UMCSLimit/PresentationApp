import React from 'react';
import Clock from 'react-live-clock';
import createTheme from 'spectacle/lib/themes/default';

import { Deck, Heading, Slide, Text, Image,
  // List, ListItem
} from 'spectacle';
// import NewsUmcs from './components/NewsUmcs';
import umcsImage from './images/umcs.jpg';
// import getNews from './api';
import axios from 'axios';

require('normalize.css');
require('./UMCSnews.css');

const theme = createTheme(
  {
    primary: 'white',
    secondary: '#1F2022',
    tertiary: '#03A9FC',
    quaternary: '#CECECE',
    type: '#fff',
  },
  {
    primary: 'Montserrat',
    secondary: 'Helvetica',
    type: 'Bitter',
  }
);

export default class Presentation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newsObj: {
        success: false,
        payload: []
      }
    };

    this.slideImage = this.slideImage.bind(this);
    this.updateApi = this.updateApi.bind(this);
  }

  updateApi() {
    axios.get('http://localhost:5000/news')
    .then(res => {
      const news = res.data;
      this.setState({
        newsObj: news
      })
    })
    .catch(err => {
      console.log('error');
    })
  }

  componentDidMount() {
    this.updateApi();
    let apiInterval = setInterval(this.updateApi, 10000);
    this.setState({ 
      apiInterval, 
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.apiInterval);
  }

  slideImage(url) {
    return (
      <Slide transition={['fade']} bgColor="primary">
        <Image src={url}></Image>
      </Slide>
    )
  }

  render() {
    const { newsObj } = this.state;
    const i = 0;
    return (
      <Deck
        transition={['zoom', 'slide']}
        theme={theme}
        // autoplay={true}
        autoplayDuration={5000}
        contentWidth={'90%'}
        progress={'bar'}
        controls={false}
      >
        <Slide transition={['zoom']} bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Witaj
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            open the presentation/index.js file to get started
          </Text>
        </Slide>

        { newsObj.success !== false &&
          <Slide maxWidth="100" className="UMCS" transition={['fade']}>
            <Text 
            fill
            bgColor={newsObj.payload[i].color}
            textColor='type'
            textFont='type'
            >
              {newsObj.payload[i].type}
            </Text>
            <Image width="900" src={newsObj.payload[i].url}  ></Image>
            <Heading  textColor="secondary" className="HEAD" size={6}>
              {newsObj.payload[i].title}
            </Heading>
          </Slide>
        }
        <Slide transition={['fade']} bgColor="tertiary">
          <Heading size={6} textColor="secondary" caps>
            godzina
          </Heading>
          <Heading size={6} fit={true} textColor="primary" caps>
            <Clock format={'HH:mm:ss'} ticking={true} interval={1000} />
          </Heading>
        </Slide>
        <Slide transition={['fade']} bgColor="primary">
          <Image src={umcsImage}></Image>
        </Slide>
        {this.slideImage("https://phavi.umcs.pl/ph/c,1600,400,m,c/box/2019/0107/132840-fbcover9.png")}
      </Deck>
    );
  }
}