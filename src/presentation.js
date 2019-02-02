import React from 'react';
import Clock from 'react-live-clock';
import createTheme from 'spectacle/lib/themes/default';

import { Deck, Heading, Slide, Text, Image, GoToAction } from 'spectacle';
// import NewsUmcs from './components/NewsUmcs';
import umcsImage from './images/umcs.jpg';
import getNews from './api';
require('normalize.css');

const theme = createTheme(
  {
    primary: 'white',
    secondary: '#1F2022',
    tertiary: '#03A9FC',
    quaternary: '#CECECE',
  },
  {
    primary: 'Montserrat',
    secondary: 'Helvetica',
  }
);

export default class Presentation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mylist: []
    };

    this.slideImage = this.slideImage.bind(this);
    this.updateApi = this.updateApi.bind(this);
  }

  updateApi() {
    const newNews = getNews();
    this.setState({ myList: newNews });
  }


  componentDidMount() {
    let apiInterval = setInterval(this.updateApi, 10000);
    this.setState({ apiInterval });
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
    return (
      <Deck
        transition={['zoom', 'slide']}
        theme={theme}
        autoplay={true}
        autoplayDuration={5000}
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
        <Slide transition={['zoom']} bgColor="primary">
          123
        </Slide>
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

// <NewsUmcs/>
