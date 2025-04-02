// pages/api/analyze-gpt.ts
import { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { qa, email } = req.body;

  const prompt = `다음은 사용자의 자기 탐색 질문과 응답입니다. 이 데이터를 바탕으로 다음을 생성하세요:

1. summary: 이 사람을 20자 이내로 표현한 한 문장
2. tags: 이 사람의 성향, 감정, 가치관, 정체성을 나타내는 키워드 3~5개 (형용사/명사/상징)
3. analysis: 이 결과가 도출된 이유 5가지
4. narrative: 이 사람을 서사적으로 요약한 문장

공감되고 따뜻한 어조로 작성해주세요.

질문과 답변:
${qa.map((item: { question: string; answer: string }) => `Q: ${item.question}\nA: ${item.answer}`).join("\n")}`;

  try {
    const chat = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "당신은 인간의 감정과 자기성찰 데이터를 분석하는 심리 기반 자기서사 코치야." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    });

    const raw = chat.choices[0].message.content || "";
    console.log("GPT 응답:", raw);

    const summaryMatch = raw.match(/summary\s*[:：]\s*(.+)/i);
    const tagsMatch = raw.match(/tags\s*[:：]\s*(.+)/i);
    const analysisMatches = raw.match(/analysis\s*[:：]([\s\S]*?)narrative/i);
    const narrativeMatch = raw.match(/narrative\s*[:：]\s*(.+)/i);

    const summary = summaryMatch ? summaryMatch[1].trim() : "";
    const tags = tagsMatch ? tagsMatch[1].split(/[#,\s]+/).filter(Boolean) : [];
    const analysis = analysisMatches ? analysisMatches[1].trim().split(/\n|\r/).filter(Boolean).slice(0, 5) : [];
    const narrative = narrativeMatch ? narrativeMatch[1].trim() : "";

    res.status(200).json({ summary, tags, analysis, narrative });
  } catch (err: any) {
    console.error("GPT 분석 실패:", err.message);
    res.status(500).json({ error: "GPT 분석 중 오류 발생: " + err.message });
  }
}
