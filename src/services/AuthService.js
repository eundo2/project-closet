import http from '../http-common';

class AuthService {
  login(id, password) {
    return http.post(`/auth/login`, {id,password})
      .then((response) => {
        console.log("r"+response);

        if (response.data.accessToken) {
          console.log("r"+response.data);

          //accessToken이 있을 시
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem('user');
  }
  delete(id) { //프론트에서 아이디가 안넘어옴? 확인필요
    //console.log(id);
    localStorage.removeItem('user');
    //console.log(id);
    return http.delete(`/auth/delete/`+id);
  }
  register(id, password, username, style_1, style_2) { 
    return http.post(`/auth/register`, {
      id,
      password,
      username,
      // gender,
      style_1,
      style_2,
    });
  }
  update(id, password, username, style_1, style_2) {
    // return http.post(`/auth/update/${data.id}`, data).then((response) => {
    //   if (response.data) {
    //     localStorage.setItem('user', JSON.stringify(response.data));
    //     //수정..?
    //     // const userInfo = window.localStorage.getItem('user');
    //     // const parsedUserInfo = JSON.parse(userInfo);
    //     // localStorage.setItem(
    //     //   'user',
    //     //   JSON.stringify({ ...parsedUserInfo, style_1: data.style_1 }),
    //     // );
    //     // return response.data;
    //   }
    //   return response.data;
    // });
    return http
      .post(`/auth/update/`, {
        id,
        password,
        username,
        style_1,
        style_2,
      })
      .then((response) => {
        if (response) {
          //accessToken이 있을 시
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
