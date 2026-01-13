# SmartPlate - 스마트 식단 관리 서비스

- 목적 : 사용자의 신체 정보와 식사 정보를 기반으로 식사 칼로리를 관리하는 웹 애플리케이션
- 기간 : 2025.05.14 ~ 06.07

# 링크 : https://smart-plate-kappa.vercel.app/

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

### 프론트엔드

- **React**: 19.1.4
- **빌드 도구**: Vite
- **언어**: TypeScript 5.9.3
- **상태 관리**: Zustand
- **데이터 패칭**: Tanstack Query 5.76.1
- **라우팅**: React Router 7.5.3
- **스타일링**: Tailwind CSS 4.1.8
- **애니메이션**: framer-motion 12.15.0
- **검증**: Zod 4.2.1

### 백엔드

- **런타임**: Node.js
- **Express**: 4.18.2
- **언어**: TypeScript 5.9.3
- **데이터베이스**: Supabase (PostgreSQL)
- **AI API**: OpenAI GPT-5.2
- **인증**: bcrypt 6.0.0
- **검증**: Zod 4.2.1

### 배포 및 인프라

- **프론트엔드 배포**: Vercel
- **백엔드 배포**: GCP

## 주요 기능

### 1. 신체 정보 관리

<img src="https://raw.githubusercontent.com/bibibigg/SmartPlate/main/frontend/public/bodyinfo.png" alt="신체정보입력"/>

- **신체 정보 입력**: 신장, 체중, 체지방량, 나이, 성별 등 입력
- **기초대사량 계산**: 입력된 정보를 바탕으로 개인별 기초대사량 자동 계산
- **목표 설정**: 체중 감량, 유지, 증량 등 개인 목표 설정
- **권장 칼로리 산출**: 목표에 따른 일일 권장 섭취 칼로리 제공

### 2. 식사 기록 및 추적

<img src="https://raw.githubusercontent.com/bibibigg/SmartPlate/main/frontend/public/meals.png" alt="식단입력"/>

- **식사 기록**: 음식 검색을 통한 간편한 식사 기록 저장
- **영양 정보 제공**: 식품의약안전처 데이터 기반 정확한 영양 성분 정보
- **칼로리 계산**: 섭취한 음식의 총 칼로리 자동 계산

<img src="https://raw.githubusercontent.com/bibibigg/SmartPlate/main/frontend/public/mealModal.png" alt="직접입력"/>

- **식사 정보 직접 입력**: 검색을 통해 음식정보가 없을경우 + 버튼을 클릭하여 직접 입력을 통한 음식 입력

<img src="https://raw.githubusercontent.com/bibibigg/SmartPlate/main/frontend/public/ImageAnalysis.png" alt="ai이미지분석"/>

- **AI 이미지 분석**: OpenAI GPT-5.2 Vision API를 통한 음식 사진 자동 인식 및 칼로리 추정
  - 음식 사진 업로드만으로 자동으로 음식 이름, 칼로리, 영양소 분석
  - Structured Outputs(Zod)를 통한 타입 안전한 데이터 처리
  - 확신도 제공으로 분석 신뢰도 확인 가능

### 3. 대시보드 및 시각화

<img src="https://raw.githubusercontent.com/bibibigg/SmartPlate/main/frontend/public/home.png" alt="대시보드"/>

- **일일 칼로리 현황**: 오늘 하루 섭취한 음식정보를 토대로 목표 섭취 칼로리와 비교하여 섭취한 칼로리를 시각화

### 4. 데이터 관리

- **음식 데이터베이스**: 식품의약안전처 공식 데이터 활용
- **데이터 동기화**: 프론트엔드-백엔드 간 실시간 데이터 동기화

### 5. 사용자 경험

<img src="https://raw.githubusercontent.com/bibibigg/SmartPlate/main/frontend/public/darkmode.png" alt="대시보드"/>

- 헤더의 우측 아이콘 클릭을 통해 다크모드/라이트모드 지원
- 반응형 디자인
