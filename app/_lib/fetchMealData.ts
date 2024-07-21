export async function fetchMealData(formattedDate: string) {
  try {
    const response = await fetch(`/api/mealData?date=${formattedDate}`);

    if (!response.ok) {
      console.error("API 응답 에러:", response.status, response.statusText);
      const text = await response.text();
      console.error("응답 내용:", text);
      throw new Error("API 요청 실패");
    }

    const data = await response.json();

    if (data && data.length > 0) {
      return data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("데이터 페칭 중 에러 발생:", error);
    return [];
  }
}
