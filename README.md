# SmartPlate - 스마트 식단 관리 서비스

- 목적 : 사용자의 신체 정보와 식사 정보를 기반으로 식사 칼로리를 관리하는 웹 애플리케이션
- 기간 : 2025.05.14 ~ 06.07

## 프로젝트 목적 및 배경

- 신체 정보 입력 기반 개인별 소비 칼로리 안내 서비스
- 신장, 체중, 체지방량 등을 기반으로 기초 대사량 계산
- 목적에 맞는 개인별 맞춤 섭취 칼로리 가이드 제공
- 식품의약안전처 공식 데이터를 활용한 정확한 영양 정보 제공

## 주요 목표

- 사용자 신체 정보 기반 정확한 기초대사량 계산
- 개인별 목표에 따른 맞춤형 칼로리 섭취량 안내
- 직관적이고 사용하기 쉬운 식단 기록 인터페이스
- 공식 데이터베이스 기반의 신뢰할 수 있는 영양 정보 제공

## 데이터 정보

- <a href='https://various.foodsafetykorea.go.kr/nutrient/'>식품의약안전처 식품영양성분 데이터베이스</a>

## 기술 스택

- **프론트엔드**: React 19.0
- **빌드 도구**: Vite
- **상태 관리**: Redux toolkit 2.8.2
- **데이터 패칭**: Tanstack Query 5.76.1
- **라우팅**: React Router 7.5.3
- **스타일링**: Tailwind CSS 4.1.8
- **애니메이션**: framer-motion 12.15.0

## 프로젝트 구조

```
SmartPlate/
├── frontend (루트)
│ ├── public/ # 정적 파일
│ ├── src/
│ │ ├── components/ # 컴포넌트
│ │ │ ├── bodyInfo/ # 신체정보 관련 컴포넌트
│ │ │ ├── Dashboard/ # 대시보드 컴포넌트
│ │ │ ├── Meals/ # 식사 관련 컴포넌트
│ │ │ ├── UI/ # 공통 UI 컴포넌트
│ │ │ └── MainNavigation.jsx # 네비게이션 바
│ │ │
│ │ ├── pages/ # 페이지 컴포넌트
│ │ │ ├── Analysis.jsx # 분석 페이지 (준비중 페이지)
│ │ │ ├── BodyInfo.jsx # 신체정보 입력 페이지
│ │ │ ├── HomePage.jsx # 홈 페이지
│ │ │ └── MealsRecord.jsx # 식사 기록 페이지
│ │ ├── layouts/ # 레이아웃 컴포넌트
│ │ ├── store/ # Redux 상태 관리
│ │ ├── utils/ # 유틸리티 함수
│ │ ├── assets/ # 이미지, 아이콘 등
│ │ ├── App.jsx # 메인 앱 컴포넌트
│ │ ├── main.jsx # 앱 진입점
│ │ └── index.css # 글로벌 스타일
│ ├── index.html # HTML 템플릿
│ ├── package.json # 프론트엔드 의존성
│ ├── vite.config.js # Vite 설정
│ └── eslint.config.js # ESLint 설정
│
├── backend/ # 백엔드 서버
│ ├── data/ # 데이터 파일
│ ├── server.js # Express 서버
│ └── package.json # 백엔드 의존성
```

## 주요 기능

### 1. 신체 정보 관리

<img src="https://raw.githubusercontent.com/bibibigg/SmartPlate/main/public/bodyinfo.png" alt="신체정보입력"/>
<img src="https://github.com/bibibigg/SmartPlate/tree/main/public/bodyinfo.png" alt="신체정보입력"/>

- **신체 정보 입력**: 신장, 체중, 체지방량, 나이, 성별 등 입력
- **기초대사량 계산**: 입력된 정보를 바탕으로 개인별 기초대사량 자동 계산
- **목표 설정**: 체중 감량, 유지, 증량 등 개인 목표 설정
- **권장 칼로리 산출**: 목표에 따른 일일 권장 섭취 칼로리 제공

### 2. 식사 기록 및 추적

<img src="https://github.com/bibibigg/SmartPlate/tree/main/public/meals.png" alt="식단입력"/>

- **식사 기록**: 아침, 점심, 저녁, 간식별 음식 섭취 기록
- **영양 정보 제공**: 식품의약안전처 데이터 기반 정확한 영양 성분 정보
- **칼로리 계산**: 섭취한 음식의 총 칼로리 자동 계산

<img src="https://github.com/bibibigg/SmartPlate/tree/main/public/mealModal.png" alt="직접입력"/>

- **식사 정보 직접 입력**: 검색을 통해 음식정보가 없을경우 직접 입력을 통한 음식 입력

### 3. 대시보드 및 시각화

<img src="https://github.com/bibibigg/SmartPlate/tree/main/public/home.png" alt="대시보드"/>

- **일일 칼로리 현황**: 목표 대비 실제 섭취 칼로리 시각적 표시

### 4. 데이터 관리

- **음식 데이터베이스**: 식품의약안전처 공식 데이터 활용
- **데이터 동기화**: 프론트엔드-백엔드 간 실시간 데이터 동기화

### 5. 사용자 경험

- 다크모드/라이트모드 지원
- 반응형 디자인

## 설치 및 실행

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm start
```
