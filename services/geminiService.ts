import { GoogleGenAI, Type } from "@google/genai";
import { Prediction } from '../types';

// FIX: Initialize GoogleGenAI directly with process.env.API_KEY as per guidelines.
// Assume API_KEY is always available in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const predictionSchema = {
  type: Type.OBJECT,
  properties: {
    winner: {
      type: Type.STRING,
      description: "예측된 승리 팀의 이름입니다."
    },
    confidence: {
      type: Type.NUMBER,
      description: "0.5(예측 어려움)에서 1.0(매우 확신) 사이의 신뢰도 점수입니다."
    }
  },
  required: ['winner', 'confidence']
};

export const getMatchPrediction = async (teamA: string, teamB: string, game: string): Promise<Prediction | null> => {
    const prompt = `
당신은 ${game} 전문가 E스포츠 분석가입니다.
두 팀이 주어지면, 가상 강점, 최근 성적, 팀 구성을 분석하여 승자를 예측하십시오.
예측 결과를 승자 팀 이름과 0.5에서 1.0 사이의 신뢰도 점수를 포함하는 JSON 형식으로 제공해주세요.
신뢰도 점수가 1.0에 가까울수록 예측이 더 확실하다는 의미입니다.
0.5에 가까울수록 예측이 어렵다는 의미입니다.

팀:
팀 A: ${teamA}
팀 B: ${teamB}

JSON 객체로만 응답해주세요.
`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: predictionSchema,
            },
        });
        
        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);

        const confidence = Math.max(0.5, Math.min(1.0, result.confidence)); // Clamp confidence
        const winner = result.winner;

        let oddsA, oddsB;
        if (winner === teamA) {
            oddsA = 1 / confidence;
            oddsB = 1 / (1 - confidence);
        } else {
            oddsB = 1 / confidence;
            oddsA = 1 / (1 - confidence);
        }

        return {
            winner,
            confidence,
            oddsA: parseFloat(oddsA.toFixed(2)),
            oddsB: parseFloat(oddsB.toFixed(2))
        };
    } catch (error) {
        console.error("Error fetching prediction from Gemini API:", error);
        // Fallback to a random prediction on error
        const randomWinner = Math.random() > 0.5 ? teamA : teamB;
        const randomConfidence = 0.5 + Math.random() * 0.2; // 0.5 to 0.7
        let oddsA, oddsB;
        if (randomWinner === teamA) {
            oddsA = 1 / randomConfidence;
            oddsB = 1 / (1 - randomConfidence);
        } else {
            oddsB = 1 / randomConfidence;
            oddsA = 1 / (1 - randomConfidence);
        }
        return {
            winner: randomWinner,
            confidence: randomConfidence,
            oddsA: parseFloat(oddsA.toFixed(2)),
            oddsB: parseFloat(oddsB.toFixed(2)),
        };
    }
};