"use client";

import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

import Button from "../_components/Button/Button";

export default function Renew() {
  const mealInfoRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (mealInfoRef.current) {
      setIsDownloading(true);
      try {
        const element = mealInfoRef.current;
        const originalStyle = element.style.cssText;
        
        // 스크롤 제거 및 전체 내용 표시
        element.style.cssText = `
          ${originalStyle}
          max-height: none !important;
          overflow: visible !important;
        `;

        const canvas = await html2canvas(element, { 
          scale: 3,
          windowWidth: element.scrollWidth,
          windowHeight: element.scrollHeight,
        });

        // 원래 스타일로 복원
        element.style.cssText = originalStyle;

        const image = canvas.toDataURL("image/png", 1.0);
        const link = document.createElement('a');
        link.download = '급식정보.png';
        link.href = image;
        link.click();
      } catch (error) {
        console.error("이미지 생성 중 오류 발생:", error);
        alert("이미지 생성 중 오류가 발생했습니다.");
      } finally {
        setIsDownloading(false);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <main className="flex-col justify-center items-center gap-2.5 inline-flex w-full max-w-md">
        <div 
          ref={mealInfoRef} 
          className={`w-full overflow-y-auto ${isDownloading ? '' : 'max-h-[calc(100vh-8rem)]'} mb-2 border-solid border border-gray-300 p-4 bg-white rounded-lg`}>
          <p className="font-bold text-xl mb-4">7/18 급식 🍚</p>
          <p className="whitespace-pre-line leading-5 mb-4">
            <strong>☀️ [조식]<br /></strong>
            흰밥(자율)<br />
            한우떡국 (16)<br />
            숙주나물<br />
            고추잡채 (5.6.10.12.13.18)<br />
            비엔나소시지야채볶음 (2.5.6.10.15.16)<br />
            배추김치 (9)<br />
            바나나<br />
            <br />
            <strong>🍱 [중식]<br /></strong>
            혼합잡곡밥 (5)<br />
            아욱된장국 (5.6)<br />
            오리고추장주물럭 (5.6.13)<br />
            애호박나물 (5)<br />
            조기구이 (5.6)<br />
            배추김치 (9)<br />
            광양유기농매실차<br />
            <br />
            <strong>🌃 [석식]<br /></strong>
            혼합잡곡밥 (5)<br />
            나가사키짬뽕국 (5.6.9.13.17.18)<br />
            시금치나물 (5.6)<br />
            한식잡채 (5.6.10.13.18)<br />
            닭볶음탕 (5.6.15)<br />
            배추김치 (9)<br />
            버터쿠키 (1.2.5.6)
          </p>
        </div>
        <div className="w-full space-y-2">
          <Button text="이미지 다운로드" type="solid" onClick={handleDownload} />
          <Button text="클립보드에 저장" type="stroke" />
        </div>
      </main>
    </div>
  );
}