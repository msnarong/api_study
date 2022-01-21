
const button = document.querySelector('#button');
const showInfo = document.querySelector('#info');
const title = document.querySelector('#title');
const flag = document.querySelector('#flag');
const flagbutton = document.querySelector('#flagbutton');

function inputCountryName(countryName) {
  // API 활용 코드
  const xhr = new XMLHttpRequest();
  const EncodingKey = 'DbakMaVDHqAIbWiwMG9Hm67W398h5mBPRRUwiqQALm0frxh4fCLVEvgeevHaSz8OjHFQ6AtSyaofLHpwbsnQsA%3D%3D';
  const DecodingKey = 'DbakMaVDHqAIbWiwMG9Hm67W398h5mBPRRUwiqQALm0frxh4fCLVEvgeevHaSz8OjHFQ6AtSyaofLHpwbsnQsA==';
  let url = 'http://apis.data.go.kr/1262000/CountryOverseasArrivalsService/getCountryOverseasArrivalsList'; /*URL*/
  let queryParams = '?' + encodeURIComponent('serviceKey') + '=' + EncodingKey; /*Service Key*/
  queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('JSON'); /**/
  queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
  queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
  queryParams += '&' + encodeURIComponent('cond[country_nm::EQ]') + '=' + encodeURIComponent(countryName); /**/
  //queryParams += '&' + encodeURIComponent('cond[country_iso_alp2::EQ]') + '=' + encodeURIComponent(isoCode); /**/

  xhr.open('GET', url + queryParams);
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      console.log(countryName);
      try{
        const countrydata = JSON.parse(this.response).data[0].html_origin_cn;
        title.innerHTML = '<hr>' + countryName + ' 해외 입국자 조치사항';
        showInfo.innerHTML = countrydata;
      } catch(error){
        alert('※ 정보가 없는 나라 혹은 나라 이름을 잘못 입력 ※');
        title.innerHTML = '';
        showInfo.innerHTML = '';
      }
    }
  };
  xhr.send('');
}

function inputCountryFlag() {
  const EncodingKey = 'DbakMaVDHqAIbWiwMG9Hm67W398h5mBPRRUwiqQALm0frxh4fCLVEvgeevHaSz8OjHFQ6AtSyaofLHpwbsnQsA%3D%3D';
  const xhr = new XMLHttpRequest();
  let url = 'http://apis.data.go.kr/1262000/CountryFlagService2/getCountryFlagList2'; /*URL*/
  let queryParams = '?' + encodeURIComponent('serviceKey') + '=' + EncodingKey; /*Service Key*/
  queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('JSON'); /**/
  queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('196'); /**/
  //queryParams += '&' + encodeURIComponent('cond[country_nm::EQ]') + '=' + encodeURIComponent(); /**/
  //queryParams += '&' + encodeURIComponent('cond[country_iso_alp2::EQ]') + '=' + encodeURIComponent('GH'); /**/
  //queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
  xhr.open('GET', url + queryParams);
  xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
      let countryArr = JSON.parse(this.response).data;
      countryArr.forEach((element) => {
        const flagDiv = document.createElement('div');
        const flagP = document.createElement('p');
        const flagImage = document.createElement('input');

        flagDiv.setAttribute('style', 'display:inline-block; margin:10px; text-align:center;');

        flagImage.setAttribute('type', 'image');
        flagImage.setAttribute('id', element['country_nm']);
        flagImage.setAttribute('src', element['download_url']);
        flagImage.setAttribute('onclick', 'inputCountryName(this.id)');
        flagImage.setAttribute('width', 100);
        flagImage.setAttribute('height', 60);

        flagP.textContent = element['country_nm'];

        flagDiv.appendChild(flagImage);
        flagDiv.appendChild(flagP);
        flag.appendChild(flagDiv);
      });
    }
  };
  xhr.send('');
}
// 나라 이름을 직접 입력하여 제출 버튼을 누르는 경우 이벤트 처리
button.addEventListener('click', () => {
  const countryName = document.querySelector('#country').value;
  inputCountryName(countryName);
}); 
// 웹 페이지가 로드 되면 발생하는 이벤트 처리
window.addEventListener('load', inputCountryFlag);
// flagbutton 을 눌렀을때 이벤트 처리
flagbutton.addEventListener('click', function(){
  if(flag.style.display == 'none'){
    flagbutton.value = '국기 접기';
    flag.style.display = 'block';
  }
  else {
    flagbutton.value = '국기 펼치기';
    flag.style.display = 'none';
  }
})