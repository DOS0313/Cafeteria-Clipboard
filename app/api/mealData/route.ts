import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    const apiUrl = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${process.env.NEIS_API_KEY}&Type=json&pIndex=1&pSize=3&ATPT_OFCDC_SC_CODE=${process.env.NEIS_ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${process.env.NEIS_SD_SCHUL_CODE}&MLSV_YMD=${date}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      console.error(
        "NEIS API 응답 에러:",
        response.status,
        response.statusText
      );
      const text = await response.text();
      console.error("NEIS API 응답 내용:", text);
      return NextResponse.json(
        { error: "API 요청 실패" },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (data.mealServiceDietInfo && data.mealServiceDietInfo.length > 0) {
      return NextResponse.json(data.mealServiceDietInfo[1].row);
    } else {
      return NextResponse.json([]);
    }
  } catch (error) {
    console.error("서버 에러:", error);
    return NextResponse.json({ error: "서버 에러 발생" }, { status: 500 });
  }
}
