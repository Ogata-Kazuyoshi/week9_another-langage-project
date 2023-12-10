import axios from 'axios';

const axiosClient = axios.create({
  //発表本番の時にサーバー落ちた時の対応で8080PORTをローカルは使う
  // baseURL: 'http://localhost:8080/api/v1',
  baseURL: 'https://gowebserver.onrender.com/api/v1',
});

export default axiosClient;
