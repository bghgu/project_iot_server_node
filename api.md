# 사물인터넷 캡스톤 디자인 API 문서
---
## 로그 조회

| 메소드  | 경로   | 짧은 설명 |
| ---- | ---- | ----- |
| GET  | /log | 로그 조회 |

### 응답 바디
#### 이메일 중복확인 성공
```json
{
	[
	    {
	        "index": 1,
	        "name": "배다슬",
	        "time": "2017-11-16T04:46:41.000Z",
	        "photo": "https://s3.ap-northeast-2.amazonaws.com/project-sm/e99b37d38e5b41de838036a744b4f45.jpg"
	    },
	    {
	        "index": 2,
	        "name": "김혜리",
	        "time": "2017-11-16T04:46:41.000Z",
	        "photo": "https://s3.ap-northeast-2.amazonaws.com/project-sm/default-user.png"
	    }
	]
}
```
---
## 얼굴 비교

| 메소드  | 경로      | 짧은 설명 |
| ---- | ------- | ----- |
| POST | /upload | 얼굴 비교 |

### 요청 헤더
~~~
Content-Type: multipart/form-data
~~~
### 요청 바디
```json
{
	"phtot" : "사진파일"
}
```
### 응답 바디
#### 동일 인물 확인
```json
{
    "message": "SUCCESS"
}
```
#### 분석 실패
```json
{
    "message": "FAIL"
}
```
---
