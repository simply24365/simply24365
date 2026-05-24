import React from "react";
import { GraduationCap, Briefcase, Award, ArrowRight, Zap, Target, BookOpen } from "lucide-react";

export default function Categories() {
  const sections = [
    {
      id: "civil",
      icon: <GraduationCap className="h-6 w-6 text-blue-600" />,
      title: "9급/7급 공무원 시험",
      badge: "전문직렬 완벽 커버",
      subtitle: "방대한 암기량과 기출 정리가 필요한 수험생",
      subjects: ["국어/영어/한국사", "행정학/행정법", "세법/회계학/관세법", "경찰학/형소법/소방학"],
      aiFocus: "판례 최신 지엽선지 변형, 헷갈리는 국가 행정 법령 두문자 기억 암기장 자동 빌드",
      effect: "기본서 회독 시간 50% 단축",
      color: "border-blue-100 bg-blue-50/25",
    },
    {
      id: "public",
      icon: <Briefcase className="h-6 w-6 text-indigo-600" />,
      title: "공기업 NCS / 인적성",
      badge: "시간 단축 스피드런",
      subtitle: "시간 싸움이 철저한 NCS 직업기초능력 공략",
      subjects: ["의사소통능력", "수리능력 (자료해석)", "문제해결능력", "전공필기 (경영/전기/기계)"],
      aiFocus: "수리 원리 공식 속독 요령법, 문제 유형별 논리적 함정 탐색 문제 반복 훈련",
      effect: "수리 문제 개당 풀이 시간 -35초",
      color: "border-indigo-100 bg-indigo-50/25",
    },
    {
      id: "certificate",
      icon: <Award className="h-6 w-6 text-emerald-600" />,
      title: "국가 자격증 (기사/전문)",
      badge: "과락 방지 최적 합격",
      subtitle: "단기간에 핵심 과목 평균 60점 이상 획득이 필요한 수험 수험생",
      subjects: ["정보처리기사/기계기사", "전기기사/소방설비기사", "산업안전기사/건설안전", "가맹거래사/자산관리사"],
      aiFocus: "계산 공식 한눈에 요약, 단원별 빈출 기출 공식 변형문제 및 실무 핵심 암기노트",
      effect: "독학 기출 합격 유도율 91.2%",
      color: "border-emerald-100 bg-emerald-50/25",
    },
  ];

  return (
    <section className="bg-white py-20 border-y border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest">수험 분야별 지원</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            대한민국 모든 국가고시 및 자격증,<br />
            AI가 완벽히 꿰뚫고 있습니다
          </p>
          <p className="text-sm sm:text-base text-slate-500">
            직렬과 전공에 상관없이 AI 마스터가 수험 빅데이터를 기반으로 최단기 효율 합격 가이드를 제공합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sections.map((sec) => (
            <div
              key={sec.id}
              className={`rounded-2xl border ${sec.color} p-6 sm:p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300`}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-white shadow-xs">
                    {sec.icon}
                  </div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 border border-slate-200/50">
                    {sec.badge}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900">{sec.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{sec.subtitle}</p>
                </div>

                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">주요 마스터 과목</span>
                  <div className="flex flex-wrap gap-1.5">
                    {sec.subjects.map((sub, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 rounded-lg bg-white border border-slate-100 px-2 py-1 text-xs font-semibold text-slate-600 shadow-3xs"
                      >
                        <BookOpen className="h-3 w-3 text-slate-400" />
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                    <Target className="h-3.5 w-3.5 text-blue-500 animate-pulse" />
                    <span>AI 밀착 피드백 포커스</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">{sec.aiFocus}</p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Zap className="h-4 w-4 text-amber-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-600">입증된 합격 지표:</span>
                  <span className="text-xs font-black text-slate-800">{sec.effect}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
