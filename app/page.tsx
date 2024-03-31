import Link from 'next/link';

import { fetchMealData } from "@/lib/fetchMealData";
import ClickableDiv from './ClickableDiv';
import { MealData } from './types';

export default async function Home() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1); // 내일 날짜로 설정 (인스타 자동화용이라서)

  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const day = String(tomorrow.getDate()).padStart(2, '0');
  const formattedDate = `${year}${month}${day}`;

  const mealData: MealData[] = await fetchMealData(formattedDate);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="mt-10 text-4xl font-bold">내일의 급식</div>
      <div>데이터 기준 : {formattedDate}</div>
      {mealData.length > 0 ? (
        <>
          <ClickableDiv mealData={mealData}>
            {mealData.map((meal, index) => (
              <div key={index}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `[${meal.MMEAL_SC_NM}]`.replace(/\s/g, "&nbsp;"),
                  }}
                />
                <div
                  dangerouslySetInnerHTML={{
                    __html: meal.DDISH_NM.replace(/\s/g, "&nbsp;"),
                  }}
                />
                {index < mealData.length - 1 && (
                  <div dangerouslySetInnerHTML={{ __html: "&nbsp;<br/>" }} />
                )}
              </div>
            ))}
          </ClickableDiv>
        </>
      ) : (
        <div>급식 데이터가 없습니다.</div>
      )}
      <Link href="https://github.com/DOS0313" target='_blank' className='text-slate-500'>
        Developed by DOS0313
      </Link>
      <div className='text-sm text-slate-500'>해당 사이트는 광양고등학교 학생회 Instagram 스토리 업로드 자동화를 도우기 위해 제작되었습니다.</div>
    </div>
  );
}