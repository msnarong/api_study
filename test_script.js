
const button = document.querySelector('#button');
const showInfo = document.querySelector('#info');
const title = document.querySelector('#title');
const flag = document.querySelector('#flag');
const flagbutton = document.querySelector('#flagbutton');

// 버튼 눌렀을때 실행하는 함수
function inputCountryName(countryName) {
  document.querySelector('#country').value = countryName;
  // 나라 이름과 ISO 코드중 하나라도 입력 안 했을경우
  if (countryName == '') {
    alert('나라 이름을 입력해주세요');
  }
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
      const countrydata = JSON.parse(this.response).data[0].html_origin_cn;
      if (countrydata != undefined) {
        title.innerHTML = '<hr>' + countryName + ' 해외 입국자 조치사항';
        showInfo.innerHTML = countrydata;
      } else {
        // 아닌경우 오류 알림
        alert('없는 나라입니다');
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
button.addEventListener('click', inputCountryName); // 버튼 눌렀을때 이벤트 처리
window.addEventListener('load', inputCountryFlag);
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
