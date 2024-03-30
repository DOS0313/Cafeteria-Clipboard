import dotenv from 'dotenv';
dotenv.config();

export async function fetchMealData() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1); // 내일 날짜로 설정 (인스타 자동화용이라서)

  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const day = String(tomorrow.getDate()).padStart(2, '0');
  const formattedDate = `${year}${month}${day}`;

  // NEIS OPEN API
  const response = await fetch(`
https://open.neis.go.kr/hub/mealServiceDietInfo
?KEY=${process.env.NEIS_API_KEY}
&Type=json
&pIndex=1
&pSize=3
&ATPT_OFCDC_SC_CODE=${process.env.NEIS_ATPT_OFCDC_SC_CODE}
&SD_SCHUL_CODE=${process.env.NEIS_SD_SCHUL_CODE}
&MLSV_YMD=${formattedDate}
`);

  const data = await response.json();

  // 데이터가 있는지 확인
  if (data.mealServiceDietInfo && data.mealServiceDietInfo.length > 0) {
    const rowData = data.mealServiceDietInfo[1].row;
    return rowData;
  } else {
    // 데이터가 없는 경우 처리
    return [];
  }
}