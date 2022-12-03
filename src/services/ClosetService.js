import http from '../http-common';
import authHeader from './AuthHeader';
class ClosetService {
  /////////////////////////옷 관련/////////////////////////
  // 옷 관리 페이지 서비스
  createCloth(data) { // 옷 등록에도 userid가 필요함
    // 보낼 것) 멤버id, 옷코드, 옷종류, 색, 이미지
    // return http.post(`/cloth/add`, data);
    console.log(data);
    return http.post(`/cloth/add`, data);
  }
  //모든 아우터 조회
  getAllOuters(userId) {
    // return http.get(`/cloth/outers`, userId);
    return http.get(`/cloth/outers?id=`+userId);
  }
  //모든 상의 조회(category가 top인 옷)
  getAllTops(userId) {
    // return http.get(`/cloth/tops`, userId);
    return http.get(`/cloth/tops?id=`+userId);
  }
  //모든 하의 조회(category가 bottom인 옷)
  getAllBottoms(userId) {
    // return http.get('/cloth/bottoms', userId);
    console.log("겟" + userId+"key");
    return http.get(`/cloth/bottoms?id=`+userId);
  }
  //특정 아우터 조회
  getAOuter(userId, id) { //유저와 옷의 아이디 //찍어보니 유저는 클로즈고 옷은 언디파인드인데
    console.log(userId);
    console.log(id);
    // return http.get(`/cloth/outer/${id}`, userId); //옷의 id와 pictureAsFile 을 가지고 온다.//여기서 id는 clothId
    return http.get(`/cloth/outer/${id}`+"?id="+userId);
  }
  //특정 상의 조회
  getATop(userId, id) {
    return http.get(`/cloth/top/${id}`+"?id="+userId);
  }
  //특정 하의 조회
  getABottom(userId, id) {
    return http.get(`/cloth/bottom/${id}`+"?id="+userId);
  }
  //아우터 삭제
  deleteOuters(userId, deleteList) {
    //deleteList는
    // ['test-4', 'test-5']
    // 이런식으로 삭제할 아이템의 아이디가 들어있는 배열임
    // return http.delete('/cloth/outers/${deleteList}');
    var query = "?memberID="+userId;
    for(var i in deleteList){
      query += "&delete="+deleteList[i];
    } 
    return http.delete('/cloth/outers/'+query); //넘어감
  }
  //상의 삭제
  deleteTops(userId, deleteList) {
    //deleteList는
    // ['test-4', 'test-5']
    // 이런식으로 삭제할 아이템의 아이디가 들어있는 배열임
    // return http.delete('/cloth/tops/${deleteList}');
    var query = "?memberID="+userId;
    for(var i in deleteList){
      query += "&delete="+deleteList[i];
    } 
    return http.delete('/cloth/tops/'+query);
  }
  //하의 삭제
  deleteBottoms(userId, deleteList) {
    //deleteList는
    // ['test-4', 'test-5']
    // 이런식으로 삭제할 아이템의 아이디가 들어있는 배열임
    // return http.delete('/cloth/bottoms/${deleteList}');
    var query = "?memberID="+userId;
    for(var i in deleteList){
      query += "&delete="+deleteList[i];
    } 
    return http.delete('/cloth/bottoms/'+query);
  }
  /////////////////////////코디 관련/////////////////////////
  createCody(data) {
    return http.post(`/cody/add`, data);
  }
  //모든 코디 조회
  getAllCodys(userId) {
    console.log("get cody id: "+userId);
    return http.get(`/cody/codys?id=`+userId);
  }
  //코디 삭제
  deleteCodys(userId, deleteList) {
    //deleteList는
    // ['test-4', 'test-5']
    // 이런식으로 삭제할 아이템의 아이디가 들어있는 배열임
    // return http.delete('/cody/codys/${deleteList}', userId);
    var query = "?memberID="+userId;
    for(var i in deleteList){
      query += "&delete="+deleteList[i];
    } 
    return http.delete('/cody/codys/'+query);
  }
  /////////////////////////추천 관련/////////////////////////
  //모든 사용자 옷 기반 추천 코디 조회
  getAllCCodys(userId) {
    return http.get(`/recommend/clothbased?id=`+userId);
  }
  //모든 선호스타일1 기반 추천 코디 조회
  getAllPS1Codys(userId, style) {
    console.log("-"+userId+" "+style);
    return http.get(`/recommend/stylebased1?id=`+userId+'&style='+style);
  }
  //모든 선호스타일2 기반 추천 코디 조회
  getAllPS2Codys(userId, style) {
    console.log("--"+userId+" "+style);
    return http.get(`/recommend/stylebased2?id=`+userId+'&style='+style);
  }
}
export default new ClosetService();
