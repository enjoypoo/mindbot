{\rtf1\ansi\ansicpg949\cocoartf2821
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // pages/api/analyze-gpt.ts\
\
import \{ NextApiRequest, NextApiResponse \} from "next";\
import \{ OpenAI \} from "openai";\
\
const openai = new OpenAI(\{ apiKey: process.env.OPENAI_API_KEY \});\
\
export default async function handler(req: NextApiRequest, res: NextApiResponse) \{\
  if (req.method !== "POST") return res.status(405).end();\
\
  const \{ answers \} = req.body;\
\
  const prompt = `\
\uc0\u45817 \u49888 \u51008  \u51064 \u44036 \u51032  \u44048 \u51221 , \u44032 \u52824 \u44288 , \u51221 \u52404 \u49457 , \u49457 \u51109  \u44221 \u54744  \u46321 \u51012  \u48516 \u49437 \u54616 \u45716  \u51204 \u47928 \u44032 \u51077 \u45768 \u45796 .\
\
\uc0\u45796 \u51020 \u51008  \u54620  \u44060 \u51064 \u51060  \u51088 \u49888 \u51032  \u45236 \u47732 \u50640  \u45824 \u54644  \u45813 \u54620  28\u44060 \u51032  \u51656 \u47928 \u44284  \u44536 \u50640  \u45824 \u54620  \u51025 \u45813 \u51077 \u45768 \u45796 .\
\uc0\u51060  \u51221 \u48372 \u47484  \u48148 \u53461 \u51004 \u47196  \u45796 \u51020 \u51012  \u49688 \u54665 \u54644 \u51452 \u49464 \u50836 :\
\
\uc0\u48516 \u49437  \u44592 \u51456 \u51008  \u45796 \u51020 \u44284  \u44057 \u49845 \u45768 \u45796 :\
\
1. \uc0\u44048 \u51221  \u44592 \u48152  \u48516 \u49437 : \u51088 \u51452  \u46321 \u51109 \u54616 \u45716  \u44048 \u51221 \u44284  \u44536  \u50896 \u51064 \u51012  \u54028 \u50501 \u54644 \u51452 \u49464 \u50836 .  \
2. \uc0\u44032 \u52824  \u51473 \u49900  \u48516 \u49437 : \u51060  \u49324 \u46988 \u51060  \u48152 \u48373 \u51201 \u51004 \u47196  \u51473 \u50836 \u54616 \u44172  \u50668 \u44592 \u45716  \u44032 \u52824 \u45208  \u49888 \u45392 \u51012  \u52286 \u50500 \u51452 \u49464 \u50836 .  \
3. \uc0\u51088 \u44592 \u44060 \u45392  \u44396 \u51312 : \u51060  \u49324 \u46988 \u51060  \u51088 \u44592  \u51088 \u49888 \u51012  \u50612 \u46500  \u51316 \u51116 \u47196  \u45712 \u45180 \u45716 \u51648  \u54028 \u50501 \u54644 \u51452 \u49464 \u50836 .  \
4. \uc0\u49457 \u51109  \u48143  \u44537 \u48373  \u44221 \u54744 : \u46020 \u51204 , \u47336 \u54004 , \u45000 , \u48169 \u54693 \u49457  \u46321 \u51012  \u53685 \u54644  \u49457 \u51109  \u53945 \u51669 \u51012  \u48516 \u49437 \u54644 \u51452 \u49464 \u50836 .  \
5. \uc0\u44288 \u44228 \u49457  \u48516 \u49437 : \u49324 \u46988 \u46308 \u44284 \u51032  \u44288 \u44228 \u45208  \u44592 \u50613 , \u46384 \u46907 \u54620  \u49692 \u44036 \u50640 \u49436  \u46300 \u47084 \u45208 \u45716  \u50672 \u44208 \u44048 \u51012  \u54028 \u50501 \u54644 \u51452 \u49464 \u50836 .\
\
\uc0\u52636 \u47141  \u54805 \u49885 \u51008  \u45796 \u51020 \u44284  \u44057 \u51060  \u44396 \u49457 \u54644 \u51452 \u49464 \u50836 :\
\
1. summary: \uc0\u51060  \u49324 \u46988 \u51032  \u54645 \u49900 \u51201 \u51064  \u53945 \u51669 \u51060 \u45208  \u49457 \u54693 \u51012  20\u51088  \u51060 \u45236 \u51032  \u47928 \u51109 \u51004 \u47196  \u54364 \u54788 \u54644 \u51452 \u49464 \u50836 . \u48708 \u50976 \u45208  \u51008 \u50976  \u44032 \u45733 \
2. tags: \uc0\u51060  \u49324 \u46988 \u51012  \u54364 \u54788 \u54616 \u45716  \u53412 \u50892 \u46300  3~5\u44060  (\u54805 \u50857 \u49324 /\u47749 \u49324 /\u49345 \u51669 )\
3. analysis: \uc0\u50948  \u50836 \u50557 \u44284  \u53468 \u44536 \u44032  \u46020 \u52636 \u46108  \u51060 \u50976 \u47484  5\u44060  \u54637 \u47785 \u51004 \u47196  \u49444 \u47749 \u54644 \u51452 \u49464 \u50836 \
4. narrative: \uc0\u51060  \u49324 \u46988 \u51032  \u49334 \u51032  \u51060 \u50556 \u44592 \u47484  \u44592 -\u49849 -\u51204 -\u44208  \u44396 \u51312 \u47196  4\u47928 \u51109  \u50836 \u50557 \
\
\uc0\u44032 \u45733 \u54616 \u47732  \u44277 \u44048 \u46104 \u44256  \u46384 \u46907 \u54620  \u50612 \u51312 \u47196  \u51089 \u49457 \u54644 \u51452 \u49464 \u50836 .\
\
\uc0\u51656 \u47928  \u48143  \u51025 \u45813 :\
$\{Object.entries(answers).map(([key, value]) => `- $\{key\}: $\{value\}`).join("\\n")\}\
`;\
\
  try \{\
    const chat = await openai.chat.completions.create(\{\
      model: "gpt-4-turbo",\
      messages: [\
        \{\
          role: "system",\
          content: "\uc0\u45320 \u45716  \u49324 \u46988 \u51032  \u45236 \u47732 \u51012  \u48516 \u49437 \u54644 \u51452 \u45716  \u44048 \u49457  \u50836 \u50557 \u44032 \u50556 ."\
        \},\
        \{\
          role: "user",\
          content: prompt\
        \}\
      ],\
      temperature: 0.7\
    \});\
\
    const raw = chat.choices[0].message.content;\
    const parsed = parseGPTResponse(raw);\
\
    res.status(200).json(parsed);\
  \} catch (err) \{\
    console.error(err);\
    res.status(500).json(\{ error: "GPT \uc0\u48516 \u49437  \u49892 \u54056 " \});\
  \}\
\}\
\
function parseGPTResponse(text: string) \{\
  const summary = /summary[:\\-\\s]*[\\"\'93]?(.*?)[\\"\'94]?\\n/i.exec(text)?.[1] || "";\
  const tags = /tags[:\\-\\s]*([#\\w,\\s]+)/i.exec(text)?.[1]?.split(/[#\\s,]+/).filter(Boolean) || [];\
  const analysis = text.match(/analysis[:\\-\\s]*([\\s\\S]*?)\\n\\s*narrative[:\\-]/i)?.[1]?.split(/\\n+/).filter(Boolean) || [];\
  const narrative = /narrative[:\\-\\s]*([\\s\\S]*)/i.exec(text)?.[1]?.split(/\\n+/).filter(Boolean) || [];\
\
  return \{ summary, tags, analysis, narrative \};\
\}\
}