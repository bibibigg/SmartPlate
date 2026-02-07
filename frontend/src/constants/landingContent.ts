// 랜딩페이지 데모 데이터 및 텍스트 상수

// 데모 신체 정보
export const DEMO_BODY_DATA = {
  height: 175,
  weight: 70,
  bodyFat: 15,
  muscleMass: 32,
  age: 28,
  gender: 'male' as const,
  goal: 'maintain' as const,
  activityLevel: 'moderate' as const,
};

// 데모 칼로리 통계
export const DEMO_CALORIE_STATS = {
  BMR: 1650,
  TDEE: 2280,
  targetCalories: 2280,
  todayCalories: 1650,
};

// Feature 섹션 데이터
export const FEATURE_SECTIONS = [
  {
    id: 'dashboard',
    title: '실시간 대시보드',
    subtitle: '한눈에 보는 나의 건강 데이터',
    description:
      '칼로리와 영양소를 실시간으로 추적하고 목표 달성도를 확인하세요.',
  },
  {
    id: 'ai-analysis',
    title: 'AI 이미지 분석',
    subtitle: '사진 한 장으로 영양 정보 분석',
    description:
      'OpenAI GPT-5.2 Vision API가 음식을 자동 인식하고 칼로리와 영양소를 추정합니다.',
    features: ['자동 음식 인식', '칼로리 추정', '확신도 제공'],
  },
  {
    id: 'personalized',
    title: '맞춤형 칼로리 관리',
    subtitle: '나만의 맞춤형 칼로리 목표',
    description:
      '신체 정보와 활동 수준을 기반으로 개인화된 칼로리 목표를 설정하세요.',
    stats: [
      { label: '기초대사량', value: '1,650 kcal' },
      { label: '일일 소비 칼로리', value: '2,280 kcal' },
      { label: '목표 칼로리', value: '2,280 kcal' },
    ],
  },
  {
    id: 'easy-record',
    title: '식품안전처 공식 데이터',
    subtitle: '정확한 영양 정보 검색',
    description:
      '45,000개 이상의 식품안전처 공식 데이터를 손쉽게 검색하고 기록하세요.',
  },
];

// Social Proof 통계
export const SOCIAL_PROOF_STATS = [
  { label: '활성 사용자', value: 10000, suffix: '+' },
  { label: '식품 데이터', value: 45000, suffix: '+' },
  { label: '데이터 정확도', value: 99.9, decimals: 1, suffix: '%' },
];

// CTA 텍스트
export const CTA_TEXT = {
  hero: {
    primary: '무료로 시작하기',
    secondary: '데모 보기',
  },
  final: {
    title: '지금 바로 시작하세요',
    subtitle: '무료로 모든 기능을 사용해보세요',
    primary: '회원가입하기',
    secondary: '이미 계정이 있으신가요?',
  },
};

// 랜딩페이지 색상 (Tailwind 클래스)
export const LANDING_COLORS = {
  gradient: 'from-[#00BCD4] to-[#0097A7]',
  gradientDark: 'from-[#0097A7] to-[#00796B]',
  bgLight: 'from-blue-50 via-white to-cyan-50',
  bgDark: 'from-gray-900 via-gray-800 to-gray-900',
};
