import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth/authSlice';
import HeroSection from '../components/Landing/sections/HeroSection';

/**
 * 랜딩페이지 메인 페이지
 * 신규 방문자를 위한 서비스 소개 및 회원가입 유도
 */
export default function LandingPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // 로그인된 사용자는 대시보드로 리다이렉트
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <HeroSection />
      {/* TODO: 추가 섹션들은 Phase 1 완료 후 구현 */}
      {/* <DashboardPreview /> */}
      {/* <AIAnalysisFeature /> */}
      {/* <PersonalizedFeature /> */}
      {/* <FinalCTA /> */}
    </div>
  );
}
