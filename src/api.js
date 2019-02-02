// Calling all API's here
import axios from 'axios';

const url = 'http://localhost:5000'

const getNews = () => {
  axios.get(url)
    .then(res => {
      const news = res.data;
      console.log(news);
      return news;
    })
    .catch(err => {
      console.log('error');
      return {'message': 'error'};
    })
}

export default getNews;
