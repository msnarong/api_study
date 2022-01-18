/* Javascript 샘플 코드 */

const button = document.querySelector('#button');
const showInfo = document.querySelector('#info');
const title = document.querySelector('#title');

// 버튼 눌렀을때 실행하는 함수
function inputCountryName() {
    let countryName = document.querySelector('#country').value;
    let isoCode = document.querySelector('#countryIsoCode').value;
    // 나라 이름과 ISO 코드중 하나라도 입력 안 했을경우
    if(countryName == "" || isoCode == ""){
        alert("나라 이름과 iso코드를 입력해주세요");
    }
    // API 활용 코드
    const xhr = new XMLHttpRequest();
    const EncodingKey = 'DbakMaVDHqAIbWiwMG9Hm67W398h5mBPRRUwiqQALm0frxh4fCLVEvgeevHaSz8OjHFQ6AtSyaofLHpwbsnQsA%3D%3D';
    const DecodingKey = 'DbakMaVDHqAIbWiwMG9Hm67W398h5mBPRRUwiqQALm0frxh4fCLVEvgeevHaSz8OjHFQ6AtSyaofLHpwbsnQsA==';
    var url = 'http://apis.data.go.kr/1262000/CountryOverseasArrivalsService/getCountryOverseasArrivalsList'; /*URL*/
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + EncodingKey; /*Service Key*/
    queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('JSON'); /**/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('cond[country_nm::EQ]') + '=' + encodeURIComponent(countryName); /**/
    queryParams += '&' + encodeURIComponent('cond[country_iso_alp2::EQ]') + '=' + encodeURIComponent(isoCode); /**/

    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            const JSONobj = JSON.parse(this.response); // JSON 객체 받기
            const JSONdata = JSONobj['data']; // JSON 객체중 data 부분 받기
            let countrydata; // 웹에 출력할 데이터

            for (i in JSONdata) { // data를 순회하면서 html_origin_cn 받기
                countrydata = JSONdata[i]['html_origin_cn'];
            }

            if(countrydata != undefined){ // 나라이름과 iso 코드가 제대로 입력된 경우
                //countrydata = countrydata.replace(/(<([^>]+)>)/ig, "");
                title.innerHTML = '<hr>' + countryName + '(' + isoCode + ')' + ' 해외 입국자 조치사항';
                showInfo.innerHTML = countrydata;
            }
            else{ // 아닌경우 오류 알림
                alert("나라이름과 iso코드를 정확히 입력해주세요");
                title.innerHTML = '';
                showInfo.innerHTML = '';
            }
        }
    };
    xhr.send('');
}

button.addEventListener('click', inputCountryName); // 버튼 눌렀을때 이벤트 처리
