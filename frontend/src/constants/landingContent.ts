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
  BMR: 1650, // 기초대사량
  TDEE: 2280, // 일일 소비 칼로리
  targetCalories: 2280, // 목표 칼로리 (유지)
  todayCalories: 1650, // 오늘 섭취 칼로리
  remainingCalories: 630, // 남은 칼로리
  progressPercentage: 72, // 진행률 (1650/2280 * 100)
};

// 섹션 헤드라인
export const SECTION_HEADLINES = {
  dashboardPreview: {
    title: "복잡한 계산은 이제 그만",
    subtitle: "한눈에 보는 나의 건강 데이터",
    description:
      "신체 정보를 입력하면 자동으로 계산되는 BMR, TDEE, 목표 칼로리. 실시간으로 추적되는 섭취 칼로리를 시각적으로 확인하세요.",
  },
  aiAnalysis: {
    title: "일일이 음식 검색? 이제 그만!",
    subtitle: "사진 한 장으로 끝내는 칼로리 분석",
    description:
      "OpenAI GPT-5.2 Vision 기술로 음식 사진을 자동 분석합니다. 95% 이상의 정확도로 칼로리와 영양소를 즉시 확인하세요.",
  },
  personalizedCalorie: {
    title: "당신만을 위한 맞춤형 목표",
    subtitle: "과학적 근거 기반 칼로리 관리",
    description:
      "나이, 성별, 체중, 활동량을 고려한 정확한 BMR, TDEE 계산. 감량, 유지, 증량 목표에 맞춘 최적의 칼로리를 제안합니다.",
  },
  foodDatabase: {
    title: "정확한 영양 정보, 믿을 수 있는 데이터",
    subtitle: "식품의약품안전처 공식 데이터 45,000개 이상",
    description:
      "정부 기관이 검증한 정확한 영양 정보를 제공합니다. 탄수화물, 단백질, 지방, 나트륨 등 9가지 이상의 상세 영양소를 확인하세요.",
  },
} as const;

// AI 분석 기능 체크리스트
export const AI_FEATURES = [
  {
    icon: "✓",
    title: "자동 음식 인식",
    description: "사진만 찍으면 AI가 알아서 분석",
  },
  {
    icon: "✓",
    title: "칼로리 자동 계산",
    description: "복잡한 검색 필요 없음",
  },
  {
    icon: "✓",
    title: "영양소 분석",
    description: "탄/단/지 자동 계산",
  },
  {
    icon: "✓",
    title: "확신도 제공",
    description: "AI 분석 신뢰도 95%+",
  },
] as const;

// 맞춤형 칼로리 기능 체크리스트
export const PERSONALIZED_FEATURES = [
  {
    icon: "✓",
    title: "BMR 자동 계산",
    description: "나이, 성별, 체중 기반",
  },
  {
    icon: "✓",
    title: "활동량 고려",
    description: "TDEE 정확도 향상",
  },
  {
    icon: "✓",
    title: "목표별 최적화",
    description: "감량/유지/증량 맞춤",
  },
  {
    icon: "✓",
    title: "실시간 추적",
    description: "차트로 진행 상황 확인",
  },
] as const;

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
