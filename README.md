# 🖥️ The First Class 조의 Nest.js 트렐로(Trello) 프로젝트

![썸네일](./imgs/thumbnail.png)

## 프로젝트 소개

- 프로젝트 이름 : 트렐로(Trello) 프로젝트
- 내용 : Nest.js를 이용한 프로젝트 협업 도구 서비스 제작
- 구분 : 팀 프로젝트
- GitHub : https://github.com/komiharuu/Trello_Project
- 시연 영상 : 
- 배포 : 

<br>

## 팀원 구성

- 팀장 : 안지윤 [@komiharuu](https://github.com/komiharuu)
- 팀원 : 김정찬 [@jkc-mycode](https://github.com/jkc-mycode)
- 팀원 : 박서진 [@Parkseojin2](https://github.com/Parkseojin2)
- 팀원 : 이수빈 [@soobeen0301](https://github.com/soobeen0301)
- 팀원 : 문병조 [@AYAAKIASA](https://github.com/AYAAKIASA)

<br>

## 1. 개발 기간

- 2024.07.11 ~ 2024.07.17

<br>

## 2. 개발 환경

- 운영체제 : Window/Mac
- FrontEnd : X
- BackEnd : TypeScript, Nest.js, MySQL(TypeORM)
- Tool : Visual Studio Code, Insomnia, DBeaver
- Publish : PM2, AWS/RDS, AWS/EC2, AWS/Load Balancer

<br>

## 3. 역할 분배

- **안지윤**
  - 카드 관련 CRUD 구현
  - 카드 이동 로직 구현
  - 카드 댓글 생성, 수정, 삭제 구현
  - 발표 진행
- **김정찬**
  - 회원가입, 로그인/로그아웃, 토큰 재발급 구현
  - 사용자 프로필 조회, 수정, 삭제 구현
  - 각 기능별 테스트 코드 작성 (미완성)
  - Readme 작성
- **박서진**
  - 리스트 관련 CRUD 구현
  - 리스트 이동 로직 구현
  - 시연 영상 제작
- **이수빈**
  - 보드 관련 CRUD 구현
  - 보드 사용자 초대 기능 구현
  - 사용자 초대 수락 기능 구현
  - 발표 PPT 제작
- **문병조**
  - 회원가입, 로그인/로그아웃, 토큰 재발급 구현
  - 사용자 프로필 조회, 수정, 삭제 구현
  - CI/CD 설정

<br>

## 4. API 명세서 및 ERD, 와이어 프레임

- API 명세서 : https://west-territory-778.notion.site/Team-SuperNova-Node-js-2e4bd4ba9a84478ab0d6659cb0edd4b6?pvs=4

- ERD : https://www.erdcloud.com/d/bpC2oMvg3F3LvA4bE

- 와이어프레임 : https://www.figma.com/board/EjLbjpXmBcWE1Air58DnSR/Trello_Project?node-id=0-1&t=QB6TSAlNQ7nnxc28-0

![와이어프레임](./imgs/wireframe.png)

<br>

## 5. 주요 기능 및 설명
### 5-1. 사용자 회원가입 API
#### 5-1-1. 회원가입 Controller
- 

#### 5-1-2. 회원가입 Service
- 

<br>

![와이어프레임](./imgs/thumbnail.png)

<br>

### 5-2. 로그인 API
#### 5-2-1. 로그인 Controller
- 

#### 5-2-2. 로그인 Service
- 

<br>

![와이어프레임](./imgs/thumbnail.png)

<br>

### 5-3. 로그아웃 API
#### 5-3-1. 로그아웃 Controller
- 

#### 5-3-2. 로그아웃 Service
- 

<br>

![와이어프레임](./imgs/thumbnail.png)

<br>

### 5-4. 토큰 재발급 API
#### 5-4-1. 토큰 재발급 Controller
- 

#### 5-4-2. 토큰 재발급 Service
- 

<br>

![와이어프레임](./imgs/thumbnail.png)

<br>

### 5-5. 사용자 프로필 조회 API
#### 5-5-1. 사용자 프로필 조회 Controller
- 

#### 5-5-2. 사용자 프로필 조회 Service
- 

<br>

![와이어프레임](./imgs/thumbnail.png)

<br>

### 5-6. 사용자 프로필 수정 API
#### 5-6-1. 사용자 프로필 수정 Controller
- 

#### 5-6-2. 사용자 프로필 수정 Service
- 

<br>

![와이어프레임](./imgs/thumbnail.png)

<br>

### 5-7. 사용자 프로필 삭제 API
#### 5-7-1. 사용자 프로필 삭제 Controller
- 

#### 5-7-2. 사용자 프로필 삭제 Service
- 

<br>

![와이어프레임](./imgs/thumbnail.png)

<br>

### 5-8. 보드 생성 API
#### 5-8-1. 보드 생성 Controller
- 

#### 5-8-2. 보드 생성 Service
- 

<br>

![와이어프레임](./imgs/thumbnail.png)

<br>

### 5-9. 보드 목록 조회 API
#### 5-9-1. 보드 목록 조회 Controller
- 

#### 5-9-2. 보드 목록 조회 Service
- 

<br>

![와이어프레임](./imgs/thumbnail.png)

<br>

### 5-10. 보드 상세 조회 API
#### 5-10-1. 보드 상세 조회 Controller
- 

#### 5-10-2. 보드 상세 조회 Service
- 

<br>

![와이어프레임](./imgs/thumbnail.png)

<br>

### 5-11. 보드 수정 API
#### 5-11-1. 보드 수정 Controller
- 

#### 5-11-2. 보드 수정 Service
- 

<br>

![와이어프레임](./imgs/thumbnail.png)

<br>

### 5-12. 보드 삭제 API
#### 5-12-1. 보드 삭제 Controller
- 

#### 5-12-2. 보드 삭제 Service
- 

<br>

![와이어프레임](./imgs/thumbnail.png)

<br>

### 5-13. 보드 초대 API
#### 5-13-1. 보드 초대 Controller
- 

#### 5-13-2. 보드 초대 Service
- 

<br>

![와이어프레임](./imgs/thumbnail.png)

<br>

### 5-14. 보드 초대 수락 API
#### 5-14-1. 보드 초대 수락 Controller
- 

#### 5-14-2. 보드 초대 수락 Service
- 

<br>

![와이어프레임](./imgs/thumbnail.png)

<br>

### 5-15. 리스트 생성 API
#### 5-15-1. 리스트 생성 Controller
- 

#### 5-15-2. 리스트 생성 Service
- 

<br>

![와이어프레임](./imgs/thumbnail.png)

<br>

### 5-16. 리스트 목록 조회 API
#### 5-16-1. 리스트 목록 조회 Controller
- 

#### 5-16-2. 리스트 목록 조회 Service
- 

<br>

![와이어프레임](./imgs/thumbnail.png)

<br>

### 5-17. 리스트 수정 API
#### 5-17-1. 리스트 수정 Controller
- 

#### 5-17-2. 리스트 수정 Service
- 

<br>

![와이어프레임](./imgs/thumbnail.png)

<br>

### 5-18. 리스트 삭제 API
#### 5-18-1. 리스트 삭제 Controller
- 

#### 5-18-2. 리스트 삭제 Service
- 

<br>

![와이어프레임](./imgs/thumbnail.png)

<br>

### 5-19. 리스트 이동 API
#### 5-19-1. 리스트 이동 Controller
- 

#### 5-19-2. 리스트 이동 Service
- 

<br>

![와이어프레임](./imgs/thumbnail.png)

<br>

### 5-20. 카드 생성 API
#### 5-20-1. 카드 생성 Controller
- 

#### 5-20-2. 카드 생성 Service
- 

<br>

![와이어프레임](./imgs/thumbnail.png)

<br>

### 5-21. 카드 목록 조회 API
#### 5-21-1. 카드 목록 조회 Controller
- 

#### 5-21-2. 카드 목록 조회 Service
- 

<br>

![와이어프레임](./imgs/thumbnail.png)

<br>

### 5-22. 카드 상세 조회 API
#### 5-22-1. 카드 상세 조회 Controller
- 

#### 5-22-2. 카드 상세 조회 Service
- 

<br>

![와이어프레임](./imgs/thumbnail.png)

<br>

### 5-23. 카드 수정 API
#### 5-23-1. 카드 수정 Controller
- 

#### 5-23-2. 카드 수정 Service
- 

<br>

![와이어프레임](./imgs/thumbnail.png)

<br>

### 5-24. 카드 삭제 API
#### 5-24-1. 카드 삭제 Controller
- 

#### 5-24-2. 카드 삭제 Service
- 

<br>

![와이어프레임](./imgs/thumbnail.png)

<br>

### 5-25. 카드 이동 API
#### 5-25-1. 카드 이동 Controller
- 

#### 5-25-2. 카드 이동 Service
- 

<br>

![와이어프레임](./imgs/thumbnail.png)

<br>

### 5-26. 카드 작업자 할당 API
#### 5-26-1. 카드 작업자 할당 Controller
- 

#### 5-26-2. 카드 작업자 할당 Service
- 

<br>

![와이어프레임](./imgs/thumbnail.png)

<br>

### 5-27. 카드 댓글 작성 API
#### 5-27-1. 카드 댓글 작성 Controller
- 

#### 5-27-2. 카드 댓글 작성 Service
- 

<br>

![와이어프레임](./imgs/thumbnail.png)

<br>

### 5-28. 카드 댓글 수정 API
#### 5-28-1. 카드 댓글 수정 Controller
- 

#### 5-28-2. 카드 댓글 수정 Service
- 

<br>

![와이어프레임](./imgs/thumbnail.png)

<br>

### 5-29. 리뷰 수정 API
#### 5-29-1. 카드 댓글 삭제 Controller
- 

#### 5-29-2. 카드 댓글 삭제 Service
- 

<br>

![와이어프레임](./imgs/thumbnail.png)

<br>


## 6. 어려웠던 점 및 해결 방안

### 6-1.  (안지윤)
- 

<br>

### 6-2.  (김정찬)
- 

<br>

### 6-3.  (박서진)
- 

<br>

### 6-4.  (이수빈)
- 

<br>

### 6-5.  (문병조)
- 


