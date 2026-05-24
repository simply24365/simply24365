import React, { useState } from "react";
import {
  Sparkles,
  GraduationCap,
  Briefcase,
  Award,
  BookOpen,
  Target,
  Zap,
  CheckCircle,
  Calendar,
  Brain,
  User,
  Clock,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Play,
  Flame,
  Trophy,
  AlertTriangle,
  RotateCcw,
  Check,
  XCircle,
  Search,
  BookOpenCheck,
  Star,
  Quote,
  Lightbulb
} from "lucide-react";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Features from "./components/Features";
import { PlanResponse, SummaryResponse, QuestionsResponse, ExamCategory, MockQuestion } from "./types";

// ==========================================
// PRESET HIGH-FIDELITY OUTCOMES (DEMO SLATE)
// ==========================================
const PRESET_PLANS: Record<string, PlanResponse> = {
  general: {
    coreSubjects: ["행정법 총론", "행정학 개론", "국어 (실용국어 중심)", "한국사", "영어"],
    roadmap: [
      {
        phase: "기본이념 확립기 (1~4주)",
        weeklyAction: "핵심 요약 압축강의 1회독을 병행하며 ‘법률 용어 사전’을 완성합니다. 암기하려 조급해하지 말고, 법의 전체적인 골격(체계)만 그립니다.",
        focusGoal: "일반행정법 용어 친숙도 100% 달성, 기출 표제어 이해"
      },
      {
        phase: "핵심 기출 변형 체득기 (5~8주)",
        weeklyAction: "AI 모의고사를 병행하여 매일 20문제씩 풀고, 틀린 선지 ‘앞글자 암기노트’를 빌드합니다. 지엽적인 지문은 별도 수첩에 기재합니다.",
        focusGoal: "기출문제 풀이 시 정답률 75% 돌행 달성"
      },
      {
        phase: "킬러 함정 극복 & 약점 구멍 봉합 (9~12주)",
        weeklyAction: "오답 오답노트 무한 회독 및 단과별 동형 모의고사 3회 연속 실시. 소거법 속독 훈련으로 한 문제 풀이 시간을 평균 40초 이내로 단축합니다.",
        focusGoal: "모의고사 안정적인 합격선 (85점 이상) 고착 완료"
      }
    ],
    successTip: "많은 수험생들이 초반 2개월 동안 기본서 문장에만 함몰되어 문제 출제 형태를 보지 못합니다. 무조건 '개념 1회독 후 즉각 기출문제 매칭'을 하셔야 시간 낭비를 막을 수 있습니다.",
    cheerMessage: "방대한 헌법과 행정 지식도 결국 출제 패턴의 반복입니다. AI 맞춤 도우미와 함께라면 지름길로 도달할 수 있으니 힘을 내십시오!"
  }
};

const PRESET_SUMMARIES: Record<string, SummaryResponse> = {
  general: {
    conceptName: "행정법 위임명령 (위헌·위법 판례)",
    simpleDefinition: "법률의 구체적인 위임 없이 제정된 벌칙 조항은 원천 무효!",
    analogy: "엄마가 '마트에서 간식 사 와'라고만 두루뭉실하게 말했는데, 동생이 자기 마음대로 엄청 비싸고 자극적인 게임기를 산 뒤 '엄마가 간식 사오래서 샀어!'라며 떼쓰는 것과 같습니다. 구체적으로 허락(위임)받지 않은 사항은 무효 처리됩니다.",
    keyPoints: [
      "포괄적 위임 금지의 원칙 (헌법 제75조)",
      "위임의 구체성·개별성 수준이 명확해야 형벌/지방세 조례 제정 가능",
      "상위법이 개정되어 위임 근거가 사라진 경우, 그 즉시 집행 명령도 소멸"
    ],
    secretFormula: "★ 암기 공식: [포-구-개-벌] -> 포괄위임 금지, 구체적 개별적 위임 하에 벌칙만 제정 가능!"
  }
};

const PRESET_QUESTIONS: MockQuestion[] = [
  {
    questionText: "행정법상 '기속행위'와 '재량행위'의 성질에 관한 설명 중 가장 옳지 않은 것은?",
    options: [
      "기속행위는 법령에 규정된 요건이 충족되면 행정청이 반드시 일정한 행위를 해야 하는 행위이다.",
      "재량행위는 법령상 요건이 충족되더라도 행정청에 행위 여부나 내용의 선택권이 유보되어 있는 행위이다.",
      "기속행위의 경우, 행정청이 법을 위반하면 즉시 위법이 되나 재량행위는 재량권의 한계를 넘지 않는 이상 법원에 의해 결코 취소될 수 없다.",
      "법원은 기속행위에 대해서는 전면적으로 법령 해석을 통해 판단하는 반면, 재량행위에 대해서는 독자의 결론을 도출하지 않고 재량 일탈·남용 여부만을 심사한다."
    ],
    correctAnswerIdx: 2,
    explanation: "재량행위라 할지라도 비례의 원칙, 평등의 원칙 등 조리(행정법의 일반원칙)를 위반하여 독점적이거나 부당한 선택을 한 경우, '재량권의 일탈·남용'이 되어 법원에 의해 사법심사를 받고 취소될 수 있습니다. 따라서 '결코 취소될 수 없다'는 설명은 명백히 틀렸습니다."
  },
  {
    questionText: "NCS 문제해결능력 중 명제 논리 문제입니다. 다음 두 전제가 참일 때 반드시 참인 결론은?\n[전제 1] 기출문제를 분석하는 수험생은 고득점을 받는다.\n[전제 2] 시험 일주일 전 오답노트를 보지 않는 수험생은 고득점을 받지 못한다.",
    options: [
      "고득점을 받는 수험생은 우수한 사람이다.",
      "시험 일주일 전 오답노트를 보는 수험생은 기출문제를 분석하는 수험생이다.",
      "기출문제를 분석하는 수험생은 시험 일주일 전 오답노트를 본다.",
      "오답노트를 보지 않아도 기출문제를 분석했으면 합격한다."
    ],
    correctAnswerIdx: 2,
    explanation: "삼단논법 분석:\n전제1: 기출분석 -> 고득점\n전제2: 오답안봄 -> 고득점X (대우: 고득점 -> 오답봄)\n따라서 두 명제를 연결하면 [기출분석 -> 고득점 -> 오답봄]이 됩니다. 즉, '기출문제를 분석하는 수험생은 시험 일주일 전 오답노트를 본다'는 반드시 참입니다."
  },
  {
    questionText: "정보처리기사 소프트웨어 설계 단원 중, 여러 개의 상위 모듈이 하위 모듈 하나의 기능을 공유하여 호출할 때의 의존성 및 제어 성질을 나타내는 전형적인 키워드는?",
    options: [
      "팬인 (Fan-In)",
      "팬아웃 (Fan-Out)",
      "결합도 (Coupling)",
      "응집도 (Cohesion)"
    ],
    correctAnswerIdx: 0,
    explanation: "Fan-In은 자신을 공유하고 호출하는 상위 모듈의 개수를 의미합니다. 즉 하위 모듈 하나의 관점으로 들어오는 화살표 수입니다. 반대로 어떤 모듈이 호출하는 하위 모듈의 개수는 Fan-Out이라고 합니다."
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<"roadmap" | "concept" | "exam">("roadmap");

  // State for Simulator A: Roadmap generator
  const [examType, setExamType] = useState("9급 일반행정직 공무원");
  const [targetGoal, setTargetGoal] = useState("6개월 초단기 최종 합격");
  const [studyPeriod, setStudyPeriod] = useState("6개월");
  const [studyStyle, setStudyStyle] = useState("하루 10시간 정속 독학형");
  const [roadmapResult, setRoadmapResult] = useState<PlanResponse>(PRESET_PLANS.general);
  const [loadingRoadmap, setLoadingRoadmap] = useState(false);

  // State for Simulator B: Summary generator
  const [summarySubject, setSummarySubject] = useState("행정법");
  const [summaryTerm, setSummaryTerm] = useState("기속행위 vs 재량행위");
  const [summaryResult, setSummaryResult] = useState<SummaryResponse>(PRESET_SUMMARIES.general);
  const [loadingSummary, setLoadingSummary] = useState(false);

  // State for Simulator C: Exam generator
  const [examCategory, setExamCategory] = useState<ExamCategory>("civil");
  const [quizSubject, setQuizSubject] = useState("행정법 총론");
  const [quizLevel, setQuizLevel] = useState("보통 (인사혁신처 국가직 기출수준)");
  const [quizResult, setQuizResult] = useState<MockQuestion[]>(PRESET_QUESTIONS);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});

  // Global Demo Notice or Real API warning
  const [apiMode, setApiMode] = useState<"demo" | "live">("live");
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Smooth scroll helper
  const scrollToSimulator = () => {
    document.getElementById("simulator-section")?.scrollIntoView({ behavior: "smooth" });
  };

  // API Action handlers
  const handleGenerateRoadmap = async () => {
    setLoadingRoadmap(true);
    setFeedbackMsg(null);
    try {
      if (apiMode === "demo") {
        setTimeout(() => {
          setRoadmapResult({
            coreSubjects: [
              `${examType} 대표 과목 A`,
              `${examType} 대표 과목 B`,
              `${examType} 선택 전공 과목`,
              "한국사/NCS 기반 기본소양"
            ],
            roadmap: [
              {
                phase: "학습 적응기 (초반 1/3 기간)",
                weeklyAction: `하루 평균 공부시간에 준거해 회독 사이클을 설계했습니다. ${studyStyle} 방식을 고수하여 기본 강좌를 빠르게 스캔하고 요약 노트를 훑어봅니다.`,
                focusGoal: "핵심 빈출 빈도 상위 20% 지문 눈독 들이기"
              },
              {
                phase: "집중 문제풀이 체화 (중반 1/3 기간)",
                weeklyAction: `기출 단원별 킬러 문항과 변형 객관식을 끊임없이 분석합니다. ${targetGoal} 달성을 위해서 출제 빈도가 유독 높은 핵심 테마를 선택 집중합니다.`,
                focusGoal: "시간 내 푸는 속독 정답 비율 80% 근접"
              },
              {
                phase: "막판 뒤집기 (마지막 스퍼트)",
                weeklyAction: "모의고사 오답 비율 오답노트를 최종 리포맷팅하고, 전직렬 오선지 함정 두문자 공식을 무작한 암기 사이클에 대포 전념시킵니다.",
                focusGoal: "안정적 커트라인 돌파 및 실전 전력 완비"
              }
            ],
            successTip: `해당 분야 수험생들은 과도한 완벽주의 때문에 한 과목 기본서에 3개월 이상을 허덕이다 포기합니다. 지엽적인 한 문제보다 큰 물줄기의 70%를 완벽하게 외우는 회독이 답이라는 사실을 가슴에 새기십시오.`,
            cheerMessage: `설정하신 ${studyPeriod}은(는) 초임 기획과 올바른 AI 보조가 있다면 기적을 일궈내기에 충분한 시간입니다. 승리는 당신의 편입니다!`
          });
          setLoadingRoadmap(false);
        }, 800);
        return;
      }

      const res = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ examType, targetGoal, studyPeriod, studyStyle })
      });

      if (!res.ok) {
        throw new Error("서버 에러가 발생하여 데모 모드로 복귀합니다.");
      }

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setRoadmapResult(data);
    } catch (err: any) {
      console.warn("Live API Error:", err);
      setFeedbackMsg(`라이브 AI 엔진 호출 중 환경 이슈가 발생하여 시뮬레이션 고품질 세트로 표시됩니다. (오류내역: ${err.message})`);
      setApiMode("demo");
    } finally {
      setLoadingRoadmap(false);
    }
  };

  const handleGenerateSummary = async () => {
    setLoadingSummary(true);
    setFeedbackMsg(null);
    try {
      if (apiMode === "demo") {
        setTimeout(() => {
          setSummaryResult({
            conceptName: `${summarySubject} 분야: ${summaryTerm}`,
            simpleDefinition: `수험용 시험에 백발백중 기습 출제되는 필수 구문 핵심 선언`,
            analogy: `이 복잡한 개념은 일상생활 속 '선착순 프리패스권 쿠폰'과 유사합니다. 아무나 줬을 때는 대란이 일어나 무효가 되고, 철저하게 인증 코드번호가 새겨진 녀석만 합법입니다.`,
            keyPoints: [
              "해당 이론/법률 조문 성립 요건 3가지 준수 여부 심사",
              "대법원 학설 대립 중 다수설의 유권 해석 문안 절대 준거",
              "불일치 지문으로 자주 등장하는 함정 어미 '반드시 ~하여야 한다' 주의"
            ],
            secretFormula: `★ 암기 앞단어: [위-개-법-무] -> 위임의 한계는 개정 법률로만 제한되며 그렇지 아니하면 전면 무효화!`
          });
          setLoadingSummary(false);
        }, 800);
        return;
      }

      const res = await fetch("/api/generate-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject: summarySubject, term: summaryTerm })
      });

      if (!res.ok) {
        throw new Error("서버 에러가 발생하여 데모 모드로 복귀합니다.");
      }

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setSummaryResult(data);
    } catch (err: any) {
      console.warn("Live API Error:", err);
      setFeedbackMsg(`라이브 AI 엔진 호출 중 환경 이슈가 발생하여 시뮬레이션 고품질 세트로 표시됩니다. (오류내역: ${err.message})`);
      setApiMode("demo");
    } finally {
      setLoadingSummary(false);
    }
  };

  const handleGenerateQuiz = async () => {
    setLoadingQuiz(true);
    setFeedbackMsg(null);
    setSelectedAnswers({});
    setShowExplanation({});
    try {
      if (apiMode === "demo") {
        setTimeout(() => {
          setQuizResult([
            {
              questionText: `[체험 데모 변형테마] ${quizSubject}와 관련된 다음 지문 요령 중 객관식 수험 정답으로 구별되는 알맞은 결론은?`,
              options: [
                "무조건 행정 행위의 효력은 소급하지 않고 장래에 대해서만 인가된다.",
                "사문화된 규정은 실효법 원칙에 무관하게 아무런 강제적 지위도 가지지 않는다.",
                "특정 대상의 예외적인 허용 처분은 법정 대리인의 명확한 재량 요건 제한 사항이다.",
                "그 자체적 원인의 흠결이 명백하다면 상급 법원의 재량이 있더라도 당연 무효이다."
              ],
              correctAnswerIdx: 2,
              explanation: "예외적 승인 및 귀속 재량 조항은 행정처분의 합목적성 심사를 받아야 하므로, 기계 규칙에 속박되지 않으며 입법 취지에 따른 재량이 존재합니다."
            },
            {
              questionText: `${quizSubject} 분야 기출 킬러테마 응용 사례입니다. 판단이 옳지 않은 것은?`,
              options: [
                "주어진 요건의 전제 사실을 오해하여 한 처분은 위법하다.",
                "대체적 작용의 위반이 있더라도 대집행 이외의 직권 실행은 구제될 수 없다.",
                "헌법상 보장되는 본질수권의 범위를 넘는 해석은 원천 기속된다.",
                "단순한 절차상 하자만으로는 본안 처분의 실체적 효력에 절대적 영향을 미치지 않는다."
              ],
              correctAnswerIdx: 0,
              explanation: "사실오인 처분은 적법 절차 및 실체적 하자 사유에 직격되므로 재량권의 적극적 일탈이자 남용에 속해 사법부 취소 대상에 돌입합니다."
            }
          ]);
          setLoadingQuiz(false);
        }, 800);
        return;
      }

      const res = await fetch("/api/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ examType: examCategory, subjectKey: quizSubject, level: quizLevel })
      });

      if (!res.ok) {
        throw new Error("서버 에러가 발생하여 데모 모드로 복귀합니다.");
      }

      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setQuizResult(data.questions || []);
    } catch (err: any) {
      console.warn("Live API Error:", err);
      setFeedbackMsg(`라이브 AI 엔진 호출 중 환경 이슈가 발생하여 시뮬레이션 고품질 세트로 표시됩니다. (오류내역: ${err.message})`);
      setApiMode("demo");
    } finally {
      setLoadingQuiz(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans" id="root-layout">
      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-3xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* LOGO */}
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
                <Sparkles className="h-5 w-5 animate-pulse" />
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tight font-display">
                Pass<span className="text-blue-600">AI</span>
              </span>
              <span className="hidden sm:inline-block rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-600 border border-blue-100">
                합격 치트키
              </span>
            </div>

            {/* NAV LINKS */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
              <span className="hover:text-blue-600 transition-colors cursor-pointer">서비스 소개</span>
              <span className="hover:text-blue-600 transition-colors cursor-pointer">기능 소개</span>
              <span className="hover:text-blue-600 transition-colors cursor-pointer">합격 수기</span>
              <span className="hover:text-blue-600 transition-colors cursor-pointer" onClick={scrollToSimulator}>체험실</span>
            </nav>

            {/* CTA BUTTON */}
            <div className="flex items-center gap-4">
              <button
                onClick={scrollToSimulator}
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs sm:text-sm font-bold text-white hover:bg-slate-800 transition-all duration-200 cursor-pointer"
              >
                <span>AI 시뮬레이터 가기</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <Hero onCtaclick={scrollToSimulator} />

      {/* TARGET EXAM CATEGORIES */}
      <Categories />

      {/* INNOVATIVE AI ARMS & FEATURES */}
      <Features />

      {/* INTERACTIVE EXPERIENCE ACCELERATOR AREA */}
      <section id="simulator-section" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        {/* Abstract grids and lights for aesthetic technical feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/15 px-3 py-1 text-xs font-semibold text-blue-300 border border-blue-400/20">
              <Flame className="h-4 w-4 text-orange-400 animate-pulse" />
              <span>실시간 AI 고유 특화 엔진 테스트룸</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              AI 합격 메이커 체험실
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
              가상 수험생이 되어 원하는 옵션들을 넣고 AI 비서의 역량을 대조해 보세요.
              실제 공무원 출제 전문가 및 1타 수험 강사의 뇌 구조를 장착한 초강력 지능형 플래너입니다.
            </p>

            {/* API Mode toggle or warning */}
            <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-3">
              <div className="inline-flex rounded-xl bg-slate-800 p-1 border border-slate-700">
                <button
                  onClick={() => {
                    setApiMode("live");
                    setFeedbackMsg(null);
                  }}
                  className={`rounded-lg px-4 py-1.5 text-xs font-bold transition-all duration-200 cursor-pointer ${
                    apiMode === "live"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  🚀 실시간 생성형 AI 모델 연동
                </button>
                <button
                  onClick={() => {
                    setApiMode("demo");
                    setFeedbackMsg(null);
                  }}
                  className={`rounded-lg px-4 py-1.5 text-xs font-bold transition-all duration-200 cursor-pointer ${
                    apiMode === "demo"
                      ? "bg-slate-700 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  💡 초고속 데모 모드 (즉시 응답)
                </button>
              </div>

              {feedbackMsg && (
                <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 px-4 py-2 text-xs text-amber-200 max-w-md text-left flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{feedbackMsg}</span>
                </div>
              )}
            </div>
          </div>

          {/* SIMULATOR LAYOUT: Tabs side-by-side on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left controller: tab buttons and inputs */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-slate-800/80 border border-slate-700/60 p-2 rounded-2xl flex flex-col gap-1">
                <button
                  onClick={() => {
                    setActiveTab("roadmap");
                    setFeedbackMsg(null);
                  }}
                  className={`flex items-center gap-3 w-full p-3.5 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                    activeTab === "roadmap"
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                      : "text-slate-400 hover:bg-slate-700/50 hover:text-white"
                  }`}
                >
                  <Calendar className="h-5 w-5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold leading-none mb-1">A. 초인화 수험 로드맵</h4>
                    <p className="text-[10px] opacity-75">과목 마스터 캘린더 생성</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setActiveTab("concept");
                    setFeedbackMsg(null);
                  }}
                  className={`flex items-center gap-3 w-full p-3.5 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                    activeTab === "concept"
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                      : "text-slate-400 hover:bg-slate-700/50 hover:text-white"
                  }`}
                >
                  <Brain className="h-5 w-5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold leading-none mb-1">B. 1초 컷 영리한 암기기</h4>
                    <p className="text-[10px] opacity-75">인상론 비유 & 요점두문자</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setActiveTab("exam");
                    setFeedbackMsg(null);
                  }}
                  className={`flex items-center gap-3 w-full p-3.5 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                    activeTab === "exam"
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                      : "text-slate-400 hover:bg-slate-700/50 hover:text-white"
                  }`}
                >
                  <BookOpenCheck className="h-5 w-5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold leading-none mb-1">C. AI 평가원 모의고사</h4>
                    <p className="text-[10px] opacity-75">기출 고농축 4지선다 훈련</p>
                  </div>
                </button>
              </div>

              {/* INPUT MODULE: DYNAMIC ACCORDING TO ACTIVE TAB */}
              <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 space-y-4">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block">수험 플래닝 조건설정</span>
                
                {/* 1. Roadmap input controls */}
                {activeTab === "roadmap" && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-300 font-bold">시험 직렬 / 목표 종류</label>
                      <input
                        type="text"
                        value={examType}
                        onChange={(e) => setExamType(e.target.value)}
                        placeholder="예: 9급 행정직, 소방안전기사 등"
                        className="w-full rounded-xl bg-slate-900 border border-slate-700 p-3 text-sm text-white focus:outline-hidden focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-slate-300 font-bold">합격 목표 수준</label>
                      <input
                        type="text"
                        value={targetGoal}
                        onChange={(e) => setTargetGoal(e.target.value)}
                        placeholder="예: 6개월 고득점 합격, 평점 80점 돌파"
                        className="w-full rounded-xl bg-slate-900 border border-slate-700 p-3 text-sm text-white focus:outline-hidden focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs text-slate-300 font-bold">수험 총 기간</label>
                        <select
                          value={studyPeriod}
                          onChange={(e) => setStudyPeriod(e.target.value)}
                          className="w-full rounded-xl bg-slate-900 border border-slate-700 p-3 text-sm text-white focus:outline-hidden focus:border-blue-500"
                        >
                          <option>3개월 (초단기 스파르타)</option>
                          <option>6개월 (적정 고효율 도약)</option>
                          <option>12개월 (안정적 전력 분석)</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-slate-300 font-bold">본인 수험 형태</label>
                        <select
                          value={studyStyle}
                          onChange={(e) => setStudyStyle(e.target.value)}
                          className="w-full rounded-xl bg-slate-900 border border-slate-700 p-3 text-sm text-white"
                        >
                          <option>하루 10시간 전력 공부</option>
                          <option>하루 3시간 퇴근 직장인</option>
                          <option>기본 베이스 보유형 독재생</option>
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={handleGenerateRoadmap}
                      disabled={loadingRoadmap}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all py-3.5 text-sm font-bold cursor-pointer hover:shadow-lg disabled:opacity-50"
                    >
                      {loadingRoadmap ? (
                        <>
                          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          <span>AI 플래너 소집중...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4" />
                          <span>합격 로드맵 수립하기</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* 2. Concept input controls */}
                {activeTab === "concept" && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-300 font-bold">시험 분야 및 과목</label>
                      <input
                        type="text"
                        value={summarySubject}
                        onChange={(e) => setSummarySubject(e.target.value)}
                        placeholder="예: 행정법, NCS 수리, 전기설비"
                        className="w-full rounded-xl bg-slate-900 border border-slate-700 p-3 text-sm text-white focus:outline-hidden focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-slate-300 font-bold">헤매는 헷갈리는 특정 용어/개념</label>
                      <input
                        type="text"
                        value={summaryTerm}
                        onChange={(e) => setSummaryTerm(e.target.value)}
                        placeholder="예: 기속행위 대 재량행위, 비례행위조항"
                        className="w-full rounded-xl bg-slate-900 border border-slate-700 p-3 text-sm text-white focus:outline-hidden focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <p className="text-[11px] text-slate-400">
                      💡 법조문 한자투성이나 복잡한 계산식의 암기 원리를 두문자로 기깔나게 풀어 제치겠습니다.
                    </p>

                    <button
                      onClick={handleGenerateSummary}
                      disabled={loadingSummary}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all py-3.5 text-sm font-bold cursor-pointer hover:shadow-lg disabled:opacity-50"
                    >
                      {loadingSummary ? (
                        <>
                          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          <span>AI 일타강사 비결 생성중...</span>
                        </>
                      ) : (
                        <>
                          <Brain className="h-4 w-4" />
                          <span>1초 암기 가이드 생성</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* 3. Exam input controls */}
                {activeTab === "exam" && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-300 font-bold">시험 유형분류</label>
                      <select
                        value={examCategory}
                        onChange={(e) => setExamCategory(e.target.value as ExamCategory)}
                        className="w-full rounded-xl bg-slate-900 border border-slate-700 p-3 text-sm text-white"
                      >
                        <option value="civil">구급/칠급 공무원</option>
                        <option value="public">공기업 NCS 직무능력</option>
                        <option value="certificate">국가 기술자격증 시험</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-slate-300 font-bold">출제 희망 단원/과목</label>
                      <input
                        type="text"
                        value={quizSubject}
                        onChange={(e) => setQuizSubject(e.target.value)}
                        placeholder="예: 한국사 고대사, NCS 자료해석"
                        className="w-full rounded-xl bg-slate-900 border border-slate-700 p-3 text-sm text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-slate-300 font-bold">문제 출제 난이도</label>
                      <select
                        value={quizLevel}
                        onChange={(e) => setQuizLevel(e.target.value)}
                        className="w-full rounded-xl bg-slate-900 border border-slate-700 p-3 text-sm text-white"
                      >
                        <option>기본 기초 지식 (평가 수준 우수)</option>
                        <option>기출 정평 수준 (일반 시험 레벨)</option>
                        <option>고난도 킬러 변형 (오선지 대거 함정)</option>
                      </select>
                    </div>

                    <button
                      onClick={handleGenerateQuiz}
                      disabled={loadingQuiz}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all py-3.5 text-sm font-bold cursor-pointer hover:shadow-lg disabled:opacity-50"
                    >
                      {loadingQuiz ? (
                        <>
                          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          <span>기출분석 대조 문항 생성중...</span>
                        </>
                      ) : (
                        <>
                          <BookOpenCheck className="h-4 w-4" />
                          <span>엄선 모의고사 출제</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Output: Real-time UI visualization */}
            <div className="lg:col-span-8">
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl min-h-[480px] p-6 sm:p-8 flex flex-col justify-start relative">
                
                {/* Visual Header badge representing live screen outcome */}
                <div className="flex items-center justify-between border-b border-slate-700/60 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">
                      PassAI 가상 단말기 출력화면
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    IP_ROUTE: /api/{activeTab === "roadmap" ? "generate-plan" : activeTab === "concept" ? "generate-summary" : "generate-questions"}
                  </span>
                </div>

                {/* Loading indicator mask overlay */}
                {(loadingRoadmap || loadingSummary || loadingQuiz) && (
                  <div className="absolute inset-0 bg-slate-900/80 rounded-2xl flex flex-col items-center justify-center z-20 space-y-3">
                    <div className="h-10 w-10 animate-spin rounded-full border-3 border-blue-500 border-t-transparent" />
                    <p className="text-sm font-bold text-slate-200">AI 수험 전문가가 정보를 가시화하고 기출 요강을 정제 중입니다...</p>
                    <span className="text-xs text-slate-400">약 2-3초 가집 집계 소요됩니다.</span>
                  </div>
                )}

                {/* 1. Roadmap Result UI */}
                {activeTab === "roadmap" && roadmapResult && (
                  <div className="space-y-6 fade-in-up">
                    <div className="rounded-xl bg-slate-800/80 border border-indigo-500/20 p-5 space-y-4">
                      <div>
                        <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">출제 마스터 권장 핵심 과목</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {roadmapResult.coreSubjects?.map((subj, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-indigo-505 bg-indigo-500/10 text-indigo-300 text-xs font-semibold rounded-lg border border-indigo-500/20"
                            >
                              📚 {subj}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-700/40">
                        <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest block">시험 전략 킬러 팁</span>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-1.5 font-medium">
                          {roadmapResult.successTip}
                        </p>
                      </div>
                    </div>

                    {/* Roadmap step pipeline */}
                    <div className="space-y-4">
                      <span className="text-xs font-bold text-slate-400 block uppercase tracking-wide">주차별 맞춤 로드맵 피드백</span>
                      <div className="relative border-l border-slate-700 pl-6 ml-2 space-y-6">
                        {roadmapResult.roadmap?.map((rmStep, idx) => (
                          <div key={idx} className="relative">
                            {/* Point on timeline */}
                            <span className="absolute -left-[31px] top-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-blue-600 border border-slate-900">
                              <span className="h-1.5 w-1.5 rounded-full bg-white font-mono text-[9px]" />
                            </span>
                            <div className="space-y-1">
                              <span className="text-xs font-bold text-blue-400">{rmStep.phase}</span>
                              <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">{rmStep.weeklyAction}</p>
                              <div className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                                <Target className="h-3 w-3" />
                                <span>기대 달성수준: {rmStep.focusGoal}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Warm Cheer block */}
                    <div className="pt-4 border-t border-slate-700/60 flex items-center gap-4 bg-slate-800/30 p-4 rounded-xl">
                      <div className="h-12 w-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-300 shrink-0">
                        <Trophy className="h-6 w-6 text-amber-500" />
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">AI 플래너 드림</span>
                        <p className="text-xs text-slate-300 italic">“ {roadmapResult.cheerMessage} ”</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Summary Result UI */}
                {activeTab === "concept" && summaryResult && (
                  <div className="space-y-6 fade-in-up">
                    <div className="text-left space-y-2">
                      <div className="inline-flex rounded-lg bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 text-xs font-bold text-orange-300">
                        🔑 무릎을 탁 치는 일타요약 비법
                      </div>
                      <h3 className="text-2xl font-black text-white">{summaryResult.conceptName}</h3>
                      <p className="text-sm text-slate-300 font-semibold border-l-3 border-blue-500 pl-3">
                        {summaryResult.simpleDefinition}
                      </p>
                    </div>

                    {/* Analogy Box */}
                    <div className="rounded-xl bg-slate-800/80 border border-slate-700 p-5 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-extrabold text-blue-400">
                        <Lightbulb className="h-4 w-4 text-yellow-400 animate-bounce" />
                        <span>생생 기억보증 비유 분석</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal p-1 bg-slate-900/40 rounded-lg">
                        {summaryResult.analogy}
                      </p>
                    </div>

                    {/* Key Trap Points */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">주관식/빈출 객관식 핵심 정답조항</span>
                      <ul className="space-y-1.5">
                        {summaryResult.keyPoints?.map((pt, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-700 text-slate-300 text-[10px] font-bold shrink-0">
                              {idx + 1}
                            </span>
                            <span className="font-medium">{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Secret Formula - Mnemonics */}
                    <div className="rounded-xl bg-indigo-500/5 border border-indigo-400/20 p-4 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-300 font-mono shrink-0">
                        MN
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-indigo-300 uppercase block">핵심 앞글자 두문자 공부법</span>
                        <p className="text-sm font-extrabold text-yellow-300">{summaryResult.secretFormula}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Exam Result UI - Interactive Multiple Choice */}
                {activeTab === "exam" && quizResult && (
                  <div className="space-y-6 fade-in-up">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400">
                        📝 {quizSubject || "행정법"} 분야 총 {quizResult.length}개 엄선 시험문항
                      </span>
                      <button
                        onClick={handleGenerateQuiz}
                        className="inline-flex items-center gap-1 text-xs text-indigo-300 hover:text-white transition-all cursor-pointer bg-slate-800 border border-slate-700 px-2 py-1 rounded-md"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        <span>재출제</span>
                      </button>
                    </div>

                    <div className="space-y-8">
                      {quizResult.map((q, qIdx) => {
                        const isCorrect = selectedAnswers[qIdx] === q.correctAnswerIdx;
                        const isAnswered = selectedAnswers[qIdx] !== undefined;

                        return (
                          <div key={qIdx} className="border-b border-slate-700/60 pb-6 last:border-0">
                            {/* Question Title */}
                            <div className="space-y-2 mb-3.5">
                              <span className="font-mono text-xs font-bold text-indigo-400">QUESTION {qIdx + 1}</span>
                              <h4 className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                                {q.questionText}
                              </h4>
                            </div>

                            {/* 4 Choices */}
                            <div className="grid grid-cols-1 gap-2">
                              {q.options?.map((opt, oIdx) => {
                                const isCurrentSelected = selectedAnswers[qIdx] === oIdx;
                                const isThisRealAnswer = q.correctAnswerIdx === oIdx;

                                let btnClass = "bg-slate-900/60 border-slate-700 hover:bg-slate-800 text-slate-300";
                                if (isAnswered) {
                                  if (isThisRealAnswer) {
                                    btnClass = "bg-emerald-500/10 border-emerald-500 text-emerald-300 shadow-xs";
                                  } else if (isCurrentSelected) {
                                    btnClass = "bg-rose-500/10 border-rose-500 text-rose-300";
                                  } else {
                                    btnClass = "bg-slate-900/20 border-slate-800 text-slate-500 opacity-60";
                                  }
                                } else if (isCurrentSelected) {
                                  btnClass = "bg-indigo-500/10 border-indigo-500 text-white";
                                }

                                return (
                                  <button
                                    key={oIdx}
                                    disabled={isAnswered}
                                    onClick={() => {
                                      setSelectedAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
                                      setShowExplanation(prev => ({ ...prev, [qIdx]: true }));
                                    }}
                                    className={`w-full text-left rounded-xl border p-3.5 text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer flex items-start gap-2.5 ${btnClass}`}
                                  >
                                    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-slate-800 border border-slate-700 text-[10px] font-sans shrink-0 font-bold">
                                      {oIdx + 1}
                                    </span>
                                    <span>{opt}</span>
                                  </button>
                                );
                              })}
                            </div>

                            {/* Self correctness banner & explanation toggles */}
                            {showExplanation[qIdx] && (
                              <div className="mt-4 rounded-xl bg-slate-900/80 border border-slate-700/80 p-4 space-y-2.5">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2 text-xs font-bold">
                                    {isCorrect ? (
                                      <span className="text-emerald-400 flex items-center gap-1">
                                        <Check className="h-4 w-4" /> 정답입니다! (+10점)
                                      </span>
                                    ) : (
                                      <span className="text-rose-400 flex items-center gap-1">
                                        <XCircle className="h-4 w-4" /> 아쉽게 틀렸습니다. (정답: {q.correctAnswerIdx + 1}번)
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[10px] text-slate-400">AI 출제 정밀 해석</span>
                                </div>
                                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line border-t border-slate-800 pt-2 font-medium">
                                  {q.explanation}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENCHMARK / STATS COUNTER BANNER */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2">실제 도출 통계 인포그래픽</h3>
            <p className="text-2xl sm:text-3xl font-bold text-slate-900">압도적인 합격 단축 수치</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center">
              <span className="text-slate-400 text-xs font-bold block mb-1">9급 일반행정직 합격가</span>
              <p className="text-2xl sm:text-3xl font-black text-slate-900">평균 7.2개월</p>
              <span className="text-[11px] text-blue-600 font-semibold mt-1 inline-block">시중 학원 평균 대비 -11개월</span>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center">
              <span className="text-slate-400 text-xs font-bold block mb-1">인적성/NCS 필기 합격 기준</span>
              <p className="text-2xl sm:text-3xl font-black text-slate-900">상위 4.8% 완료</p>
              <span className="text-[11px] text-indigo-600 font-semibold mt-1 inline-block">정해 시간 풀이 완료율 94%</span>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center">
              <span className="text-slate-400 text-xs font-bold block mb-1">자격증 기사 등 평균 단축</span>
              <p className="text-2xl sm:text-3xl font-black text-slate-900">단 19일 만에 패스</p>
              <span className="text-[11px] text-emerald-600 font-semibold mt-1 inline-block">핵심 기출 평균 점수 82.5점</span>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center">
              <span className="text-slate-400 text-xs font-bold block mb-1">누적 추천 암기 앞축 개수</span>
              <p className="text-2xl sm:text-3xl font-black text-slate-900">890,000개 돌파</p>
              <span className="text-[11px] text-amber-600 font-semibold mt-1 inline-block">수험 구절 연상 자가 도출율 98%</span>
            </div>
          </div>
        </div>
      </section>

      {/* STUDENT TESTIMONIAL CAROUSEL-LIKE GRID */}
      <section className="bg-slate-50 py-20 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold text-blue-600 tracking-widest block uppercase">합격 수기 인증</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              실제 PassAI로 꿈을 이룬 명예의 전당 수험인
            </h2>
            <p className="text-sm sm:text-base text-slate-500 font-medium">
              시행착오 끝에 고효율 공부법을 AI로 장착한 무수한 후배들의 생생한 친필 후기입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl bg-white p-6 sm:p-8 border border-slate-100 shadow-3xs space-y-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium italic">
                “행정법과 행정학은 한자 용어 투성이라 독해 자체가 안 됐는데, PassAI에게 기속과 재량, 처분성 등의 원리를 물어봤다. 초등학교 저학년 비유로 설명받고 앞글자 두문자 공부법을 제안받았는데 머릿속에 그대로 박혔다. 단 6개월 만에 국가직 9급 고득점으로 최종 합격했습니다.”
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">김민</div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">김민철 합격 수여생</h4>
                  <p className="text-[10px] text-slate-400">2025년도 국가직 9급 일반행정 수험생</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 sm:p-8 border border-slate-100 shadow-3xs space-y-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium italic">
                “NCS 수리영역은 시간이 항상 부족해서 소위 '기둥'을 세우는 일이 다반사였어요. AI가 설계해준 시간단축 플래너대로 지문 속 속편비 공안 계산 요령과 함정 속출 선지 패턴을 익히고 나니 의사소통도 직관적으로 풀리더군요. 자산공사 합격 인증샷 남깁니다.”
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">박지</div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">박지혜 합격인</h4>
                  <p className="text-[10px] text-slate-400">한국자산관리공사 NCS 합격생</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 sm:p-8 border border-slate-100 shadow-3xs space-y-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium italic">
                “국가기사 자격증은 과락 40점 방지가 목표라 시간 배정이 관건이었죠. 독학하며 쓸데없이 두꺼운 기출문제집 전체를 풀 뻔했는데, AI가 엄선된 기출 변형 3단 평가법으로 공식만 먼저 외우라고 로드맵을 줬어요. 덕분에 퇴근 후 단 3주 만에 깔끔히 고득점으로 정보처리기사를 쟁취했습니다.”
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs">최성</div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">최성우 엔지니어</h4>
                  <p className="text-[10px] text-slate-400">정보처리기사 및 전기기사 취득</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS (FAQ) DESIGN */}
      <section className="bg-white py-20 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">궁금하신 사실</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              가장 자주 묻는 수험 비법 FAQ
            </h2>
            <p className="text-sm sm:text-base text-slate-500">
              학습 지침서와 AI 기능의 현실적인 운용에 관한 가이드라인
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">Q. 실제 시험 출제기관의 성향이 실시간 반영되나요?</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                네, 그렇습니다. PassAI는 최신년도 인사혁신처 행정고시·9급·7급 기출 선지 분석 데이터 및 큐넷(Q-Net) 국가기술자격검정의 최신 출제기준을 상정하여, 지엽적인 개정 법령 조항까지 실시간 변형 출제하도록 모델이 프로그래밍되어 있습니다.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">Q. 직장인이나 베이스가 없는 생초보도 시작할 수 있나요?</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                오히려 초보자일수록 효과가 뛰어납니다. 무턱대고 1000페이지가 넘는 학원 기본서를 보며 진을 빼는 일 대신, AI가 단원별 수험용 뼈대 위주로 암기 비법과 요약본을 도출해주기 때문에 진도 이탈 없이 회독수를 축적할 수 있습니다.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">Q. AI 합격 비서 서비스를 완전히 무료로 제공하나요?</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                현재 베타 오픈 기념 특별 혜택으로 모든 합격 로드맵 수립 및 일타강사 비결 암기장, 객관식 자가진단 모의고사 시뮬레이션을 요금 결제 없이 무제한으로 체험 가능합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL HIGH CONVERSION ACTION BRAND PANEL */}
      <section className="relative overflow-hidden bg-slate-900 py-16 sm:py-24 text-white">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-3xl animate-pulse" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            합격생의 평균 수험기간 단축 약 4.8개월,<br />
            이제 다음은 당신의 당당한 차례입니다.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
            비효율적인 겉치레 10시간보다, AI 수험 전문가가 엄선한 초고효율 압축 2시간이 무조건 강합니다.
            올해 수험 계획 수립부터 복습 모의고사까지 완벽한 합격 솔루션을 손에 넣을 기회입니다.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={scrollToSimulator}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold text-white px-8 py-4 px-6 text-sm transition-all text-center cursor-pointer shadow-lg shadow-blue-500/25"
            >
              <span>AI 합격 메이커 즉시 탑승하기</span>
              <ArrowRight className="h-4.5 w-4.5" />
            </button>
            <span className="text-slate-400 text-xs sm:text-sm flex items-center justify-center gap-2 font-medium">
              🛡️ 별도 회원가입 없이 즉시 테스트 가능
            </span>
          </div>
        </div>
      </section>

      {/* FOOTER BAR */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-500 text-xs text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold">P</div>
              <span className="text-sm font-black text-white tracking-tight font-display">Pass<span className="text-blue-500">AI</span></span>
            </div>
            <p className="text-[11px] text-slate-500">
              © 2026 PassAI 합격 검정연구실. All Rights Reserved. 본 시뮬레이션 데이터는 생성형 지능형 비서입니다.
            </p>
          </div>
          <div className="border-t border-slate-900 pt-6 flex flex-wrap gap-4 justify-center text-slate-500 font-medium select-none">
            <span className="hover:text-slate-400 cursor-pointer">이용약관</span>
            <span>|</span>
            <span className="hover:text-slate-400 cursor-pointer">개인정보처리방침</span>
            <span>|</span>
            <span className="hover:text-slate-400 cursor-pointer">수험 빅데이터 원천고지</span>
            <span>|</span>
            <span className="hover:text-slate-400 cursor-pointer">고객센터문의</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
