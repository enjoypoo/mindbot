// pages/api/analyze-gpt.ts
//import { NextApiRequest, NextApiResponse } from "next";
//import { OpenAI } from "openai";
//const { OpenAI } = require("openai");

//const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

//export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//module.exports = async function handler(req, res) {
//  if (req.method !== "POST") return res.status(405).end();

// pages/api/analyze-gpt.ts
import type { NextApiRequest, NextApiResponse } from "next";
const { OpenAI } = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

module.exports = async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  
  const { answers } = req.body;

  const prompt = `
당신은 인간의 감정, 가치관, 정체성, 성장 경험 등을 분석하는 전문가입니다.

다음은 한 개인이 자신의 내면에 대해 답한 28개의 질문과 그에 대한 응답입니다.
이 정보를 바탕으로 다음을 수행해주세요:

분석 기준은 다음과 같습니다:

1. 감정 기반 분석: 자주 등장하는 감정과 그 원인을 파악해주세요.  
2. 가치 중심 분석: 이 사람이 반복적으로 중요하게 여기는 가치나 신념을 찾아주세요.  
3. 자기개념 구조: 이 사람이 자기 자신을 어떤 존재로 느끼는지 파악해주세요.  
4. 성장 및 극복 경험: 도전, 루틴, 꿈, 방향성 등을 통해 성장 특징을 분석해주세요.  
5. 관계성 분석: 사람들과의 관계나 기억, 따뜻한 순간에서 드러나는 연결감을 파악해주세요.

출력 형식은 다음과 같이 구성해주세요:

1. summary: 이 사람의 핵심적인 특징이나 성향을 20자 이내의 문장으로 표현해주세요. 비유나 은유 가능
2. tags: 이 사람을 표현하는 키워드 3~5개 (형용사/명사/상징)
3. analysis: 위 요약과 태그가 도출된 이유를 5개 항목으로 설명해주세요
4. narrative: 이 사람의 삶의 이야기를 기-승-전-결 구조로 4문장 요약

가능하면 공감되고 따뜻한 어조로 작성해주세요.

질문 및 응답:
${Object.entries(answers).map(([key, value]) => `- ${key}: ${value}`).join("\n")}
`;

  try {
    const chat = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: "너는 감정과 자기성찰 데이터를 분석하는 전문가야."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7
    });

    //const raw = chat.choices[0].message.content || "";
    //const parsed = parseGPTResponse(raw);

    const raw = chat.choices[0].message.content || "";
    console.log("GPT 응답:", raw);

    // GPT 응답을 단순한 파싱 (예시: summary: ..., tags: [...], analysis: [...])
    const summaryMatch = raw.match(/summary\s*[:：]\s*(.+)/i);
    const tagsMatch = raw.match(/tags\s*[:：]\s*(.+)/i);
    const analysisMatches = raw.match(/analysis\s*[:：]([\s\S]*)/i);

    const summary = summaryMatch ? summaryMatch[1].trim() : "";
    const tags = tagsMatch ? tagsMatch[1].split(/[#,\s]+/).filter(Boolean) : [];
    const analysis = analysisMatches ? analysisMatches[1].trim().split(/\n|\r/).filter(Boolean).slice(0, 5) : [];

    
    res.status(200).json({ summary, tags, analysis });
    //res.status(200).json(parsed);
  } catch (err: any) {
    console.error("GPT 분석 실패:", err.message);
    res.status(500).json({ error: "GPT 분석 중 오류 발생: " + err.message });
    //catch (err) {
    //console.error(err);
    //res.status(500).json({ error: "GPT 분석 실패" });
  }
}


//function parseGPTResponse(text: string) {
//  const summary = /summary[:\-\s]*[\"“]?(.*?)[\"”]?\n/i.exec(text)?.[1] || "";
//  const tags = /tags[:\-\s]*([#\w,\s]+)/i.exec(text)?.[1]?.split(/[#\s,]+/).filter(Boolean) || [];
//  const analysis = text.match(/analysis[:\-\s]*([\s\S]*?)\n\s*narrative[:\-]/i)?.[1]?.split(/\n+/).filter(Boolean) || [];
//  const narrative = /narrative[:\-\s]*([\s\S]*)/i.exec(text)?.[1]?.split(/\n+/).filter(Boolean) || [];

//  return { summary, tags, analysis, narrative };
//}
