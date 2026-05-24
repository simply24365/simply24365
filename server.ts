import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  app.use(express.json());

  const PORT = 3000;

  // Lazy initialize Gemini clients or check key on request
  const getGeminiClient = () => {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY가 설정되어 있지 않습니다. AI Studio 비밀번호/Secrets 패널에서 API 키를 추가해주세요.");
    }
    return new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  };

  // API Endpoints
  app.post("/api/generate-plan", async (req, res) => {
    try {
      const { examType, targetGoal, studyPeriod, studyStyle } = req.body;
      const ai = getGeminiClient();

      const prompt = `
        다음 정보를 바탕으로 공무원/공기업/국가자격증 합격을 위한 맞춤형 로드맵을 작성해주세요:
        - 시험 종류: ${examType}
        - 목표: ${targetGoal}
        - 총 준비 기간: ${studyPeriod}
        - 선호 학습 스타일: ${studyStyle}
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "당신은 한국 최고의 수험 컨설턴트이자 학습 플래너입니다. 사용자가 입력한 시험과 개인 조건에 아주 치밀하고 현실적이며 즉시 실천 가능한 전략을 제공해야 합니다. 반드시 한국어로 응답하세요.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              coreSubjects: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "이 시험 합격을 위해 꼭 마스터해야 하는 필수 핵심 과목 리스트 (3-5개)"
              },
              roadmap: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    phase: { type: Type.STRING, description: "예: '1단계(1~2주)', '초기 1개월'" },
                    weeklyAction: { type: Type.STRING, description: "해당 단계에서 중점적으로 수행해야 할 행동 전략 및 공부 요령" },
                    focusGoal: { type: Type.STRING, description: "해당 단계를 마쳤을 때 달달해야 하는 기대 점수 혹은 수준" }
                  },
                  required: ["phase", "weeklyAction", "focusGoal"]
                },
                description: "기간에 부합하는 주차별/월별 합격 행동 가이드라인"
              },
              successTip: {
                type: Type.STRING,
                description: "해당 직렬/시험 수험생들이 가장 많이 범하는 오답 패턴 혹은 시간을 허비하는 잘못된 공부 방식 극복법"
              },
              cheerMessage: {
                type: Type.STRING,
                description: "지쳐 있는 수험생의 열정을 자극할 수 있는 든든하고 전문적인 격려 한마디"
              }
            },
            required: ["coreSubjects", "roadmap", "successTip", "cheerMessage"]
          }
        }
      });

      const data = JSON.parse(response.text || "{}");
      res.json(data);
    } catch (error: any) {
      console.error("Plan Error:", error);
      res.status(500).json({ error: error.message || "서버 내부 오류가 발생했습니다." });
    }
  });

  app.post("/api/generate-summary", async (req, res) => {
    try {
      const { subject, term } = req.body;
      const ai = getGeminiClient();

      const prompt = `
        과목/분야: ${subject}
        개념/용어: ${term}
        이 개념에 대해 수험 공부하는 학생이 한눈에 보고 각인될 수 있도록 풀어서 구조화된 꼼꼼한 요약을 작성해주세요.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "당신은 행정학, 헌법, 경제학, 정보처리, 소방학 등 전분야 최강의 수험 요약 일타강사입니다. 난해하고 마지못해 암기하는 전문 개념을 아주 독특하면서도 소름 돋게 명쾌한 유치원생 눈높이 비유와, 암기 연상 팁(앞글자 두문자 공부법 등)을 동원해 요약해야 합니다. 반드시 한국어로 답변하세요.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              conceptName: { type: Type.STRING, description: "기초 개념 및 핵심 명칭" },
              simpleDefinition: { type: Type.STRING, description: "개념 전체를 한눈에 각인시키는 한줄 압축 선언" },
              analogy: { type: Type.STRING, description: "복잡한 법률구조나 공식을 일상 사물/행동에 빗댄 초간단 비유 설명" },
              keyPoints: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "시험의 주관식/일치불일치 선지에 아주 빈출되는 3대 지엽 함정 또는 필수 정답 키워드"
              },
              secretFormula: { type: Type.STRING, description: "기발하게 외우는 암기법(예: 법정상속순위-직비직존형배, 등기청구권-시취소등 등 앞문자 따기법, 혹은 단기기억 연상 가이드)" }
            },
            required: ["conceptName", "simpleDefinition", "analogy", "keyPoints", "secretFormula"]
          }
        }
      });

      const data = JSON.parse(response.text || "{}");
      res.json(data);
    } catch (error: any) {
      console.error("Summary Error:", error);
      res.status(500).json({ error: error.message || "서버 내부 오류가 발생했습니다." });
    }
  });

  app.post("/api/generate-questions", async (req, res) => {
    try {
      const { examType, subjectKey, level } = req.body;
      const ai = getGeminiClient();

      const prompt = `
        시험 유형: ${examType}
        과목/분야: ${subjectKey}
        난이도: ${level}
        수험 실전에 실제로 나오는 평가원급 엄선 기출 변형형 고농축 4지선다 객관식 3문제를 생성해 주십시오. 과목과 단원의 고유 특징이 디테일하게 살아있는 정교하고 논리적인 질문이어야 합니다.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "당신은 국가공무원시험 출제위원 및 대학 교수 출신의 전문 평가단입니다. 4지선다 선택지와 정밀 정해설을 포함한 최고 품질의 모의고사 3문제를 구성하세요. 주먹구구식 문제 대신 구체적인 사례형, 법조문 판례 일치불일치형, 혹은 공식 응용형 문제로 한국어로 정확하고 엄밀하게 구성해 주세요.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    questionText: { type: Type.STRING, description: "공부한 개념을 묻는 구체적인 객관식 문제 지문" },
                    options: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                      description: "4지선다 선택지 4개"
                    },
                    correctAnswerIdx: { type: Type.INTEGER, description: "정답의 인덱스 (0, 1, 2, 3 중 하나)" },
                    explanation: { type: Type.STRING, description: "정답의 이유와 다른 선지가 함정인 이유를 친절하고 명쾌하게 알려주는 해설" }
                  },
                  required: ["questionText", "options", "correctAnswerIdx", "explanation"]
                },
                description: "엄선 모의고사 3문항"
              }
            },
            required: ["questions"]
          }
        }
      });

      const data = JSON.parse(response.text || "{}");
      res.json(data);
    } catch (error: any) {
      console.error("Questions Error:", error);
      res.status(500).json({ error: error.message || "서버 내부 오류가 발생했습니다." });
    }
  });

  // Vite Integration Middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express Server connected at http://localhost:${PORT}`);
  });
}

startServer();
