import React from "react";
import { Sparkles, Trophy, Flame, Play, ArrowRight, Award } from "lucide-react";

interface HeroProps {
  onCtaclick: () => void;
}

export default function Hero({ onCtaclick }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-radial from-slate-50 via-slate-100 to-white pt-24 pb-16 sm:pb-24 lg:pt-32">
      {/* Decorative ambient background blur blobs */}
      <div className="absolute top-1/4 -left-32 -z-10 h-96 w-96 rounded-full bg-blue-100 opacity-70 blur-3xl" />
      <div className="absolute top-1/3 right-10 -z-10 h-96 w-96 rounded-full bg-indigo-100 opacity-60 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center">
          {/* Main Visual content banner text left column */}
          <div className="space-y-6 sm:space-y-8 lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-blue-800 border border-blue-100 shadow-xs">
              <Sparkles className="h-4 w-4 text-blue-600 animate-pulse" />
              <span>2026 수험 패러다임: 초개인화 생성형 AI 합격 솔루션</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.15]">
              방대한 시험 공부,<br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                생성형 AI
              </span>
              로 가장 먼저 합격합니다
            </h1>

            <p className="max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              공무원, 공기업 NCS, 국가기술자격증까지! 단순 기출 암기를 넘어 
              나만의 1:1 개인 비서가 만들어주는 초단기 고효율 합격 로드맵, 
              출제 선지 분석, 그리고 1초 단기 기억용 연상 비법으로 시험을 완전히 장악해보세요.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onCtaclick}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:shadow-xl transition-all duration-200 cursor-pointer text-center"
              >
                <span>무료 AI 합격 시뮬레이터 실행</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={onCtaclick}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-4 text-base font-bold text-slate-700 shadow-xs hover:bg-slate-50 transition-all duration-200 cursor-pointer text-center"
              >
                <Play className="h-4 w-4 text-slate-400 fill-slate-400" />
                <span>체험 가이드 확인</span>
              </button>
            </div>

            {/* Microstats banner */}
            <div className="grid grid-cols-3 gap-4 border-t border-slate-200 mt-10 pt-8">
              <div>
                <dt className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-display">142k+</dt>
                <dd className="text-xs sm:text-sm font-medium text-slate-500 mt-1">누적 도출 로드맵</dd>
              </div>
              <div>
                <dt className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-display">-4.8<span className="text-lg font-bold">개월</span></dt>
                <dd className="text-xs sm:text-sm font-medium text-slate-500 mt-1">평균 수험기간 단축</dd>
              </div>
              <div>
                <dt className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-display">91.2%</dt>
                <dd className="text-xs sm:text-sm font-medium text-slate-500 mt-1">자격 국가시험 합격률</dd>
              </div>
            </div>
          </div>

          {/* Right Column illustration placeholder with gorgeous abstract ui mock */}
          <div className="mt-12 lg:mt-0 lg:col-span-5 relative">
            <div className="relative mx-auto w-full max-w-[420px] rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl">
              <div className="absolute -top-4 -right-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-lg animate-bounce">
                <Trophy className="h-6 w-6" />
              </div>

              <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">PassAI 합격 증명서</h4>
                  <p className="text-xs text-slate-400">학습분석 최적화 수립 완료</p>
                </div>
              </div>

              <div className="space-y-3.5">
                <div className="rounded-xl bg-slate-50 p-3.5 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">최적화 가이드</span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-700">📌 공무원 행정법 '기속 vs 재량'</p>
                  <p className="text-[11px] text-indigo-600 font-medium">👉 암기법: 기속은 기계처럼(법에묶임), 재량은 자율재량!</p>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-emerald-50/50 p-3 border border-emerald-100">
                  <div className="flex items-center gap-2">
                    <Flame className="h-4 w-4 text-emerald-600" />
                    <span className="text-xs font-semibold text-slate-700">일일 모의고사 완성도</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 font-display">100 / 100</span>
                </div>

                <div className="rounded-xl border border-slate-100 p-3 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-500">NCS 수리자료 해석 역량</span>
                    <span className="font-bold text-indigo-600">상위 2.4%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full bg-indigo-500" style={{ width: "88%" }} />
                  </div>
                </div>

                <div className="text-center pt-2">
                  <span className="text-[11px] text-slate-400 font-medium">본 시뮬레이션은 실시간 고시 출제 패턴 빅데이터를 참조합니다.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
