// Calling all API's here
import axios from 'axios';

const URL = 'http://localhost:5000/'
const INSTA = URL + 'instagram'
const NEWS = URL + 'news'

const getNews = () => {
  axios.get(NEWS)
    .then(res => {
      const news = res.data;
      console.log(news);
      return news;
    })
    .catch(err => {
      console.log('error');
      return {'success': false};
    })
}

export default getNews;
