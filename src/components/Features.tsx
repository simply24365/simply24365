import React from "react";
import { Sparkles, Calendar, BookOpenCheck, Brain, Lightbulb, Clock, CheckCircle } from "lucide-react";

export default function Features() {
  const steps = [
    {
      icon: <Calendar className="h-6 w-6 text-blue-600" />,
      title: "1:1 학습 로드맵 플래너",
      desc: "본인의 일일 가용 공부 시간, 준비 시험 직렬, 학습 스타일을 바탕으로 몇 주차에 어떤 단원을 마스터해야 할지 기하급수적으로 구체화된 스케줄을 도출합니다.",
      tip: "실시간 컨설팅 피드백",
    },
    {
      icon: <Brain className="h-6 w-6 text-indigo-600" />,
      title: "1초 개념 정복 암기 비결",
      desc: "가장 골머리 아픈 단기 공식이나 판례의 기속 행위를 이해하기 쉽게 실생활 비유에 빗대고, 국시 킬러 문항들의 앞글자 자음 암기 비급(두문자요약)을 즉각 추천합니다.",
      tip: "두문자 기억 연상 요령 제공",
    },
    {
      icon: <BookOpenCheck className="h-6 w-6 text-emerald-600" />,
      title: "평가원급 실전 모의고사",
      desc: "단독 데이터의 단순 복제가 아닌, 기출 범위의 핵심 개념 지문을 변형해 오선지 함정이 도사리는 완성형 4지선다 객관식 모의고사와 친절한 맞춤형 해설을 수혈합니다.",
      tip: "3문항 고효율 Retention 측정",
    },
  ];

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest leading-6">혁신적인 AI 무기</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            합격에 걸리는 시간을<br />
            획기적으로 압축하는 3가지 핵심 기능
          </p>
          <p className="text-sm sm:text-base text-slate-500">
            의지력 부족과 비효율적인 공부 습관은 이제 끝입니다. 합격으로 정교하게 유도하는 AI 조력자들을 즉시 경험하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 sm:p-8 hover:translate-y-[-4px] transition-all duration-300 shadow-xs"
            >
              <div className="absolute top-0 right-0 h-16 w-16 bg-radial from-slate-50 to-white -z-1" />
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 mb-6 border border-slate-100">
                {step.icon}
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">{step.desc}</p>

              <div className="mt-auto flex items-center gap-2 pt-4 border-t border-slate-100">
                <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-ping" />
                <span className="text-xs font-bold text-blue-600">{step.tip}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Big visual trust card banner inside features */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-blue-900 to-slate-900 p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl -z-1" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-300">합격 신뢰 보증</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              불필요한 책장 넘기기, 독서실 겉공부는 이제 버리십시오
            </h3>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed max-w-2xl">
              어려운 시험도 AI와 함께 최단 경로로 영리하게 반복 학습하면 
              독학보다 2.5배 빠른 개념 고착도가 증명됩니다. 아래 체험존에서 지금 즉시 합격 비밀노트를 도출해보세요.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
