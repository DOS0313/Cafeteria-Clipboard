"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import Link from "next/link";

import { fetchMealData } from "@/app/_lib/fetchMealData";
import Button from "./_components/Button/Button";
import MealInfo from "./_components/MealInfo/MealInfo";
import { MealData } from "./_types/types";

export default function Renew() {
  const mealInfoRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const day = String(tomorrow.getDate()).padStart(2, "0");
  const formattedDate = `${year}${month}${day}`;

  const [mealData, setMealData] = useState<MealData[]>([]);

  useState(() => {
    fetchMealData(formattedDate).then(setMealData);
  });

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
        const link = document.createElement("a");
        link.download = "급식정보.png";
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

  const handleCopy = () => {
    if (mealData.length > 0) {
      const textToCopy = mealData
        .map(
          (meal) =>
            `[${meal.MMEAL_SC_NM}]\n${meal.DDISH_NM.replace(/<br\/>/g, "\n")}`
        )
        .join("\n\n");

      navigator.clipboard
        .writeText(textToCopy)
        .then(() => alert("클립보드에 복사되었습니다."))
        .catch((err) => {
          console.error("클립보드 복사 중 오류 발생:", err);
          alert("클립보드 복사 중 오류가 발생했습니다.");
        });
    } else {
      alert("복사할 급식 데이터가 없습니다.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <main className="flex-col justify-center items-center gap-2.5 inline-flex w-full max-w-md">
        <MealInfo
          ref={mealInfoRef}
          isDownloading={isDownloading}
          mealData={mealData}
          formattedDate={formattedDate}
        />
        <div className="w-full space-y-2">
          <Button
            text="이미지 다운로드"
            type="solid"
            onClick={handleDownload}
          />
          <Button text="클립보드에 저장" type="stroke" onClick={handleCopy} />
        </div>
        <Link
          href="https://github.com/DOS0313"
          target="_blank"
          className="text-gray-500 mt-8"
        >
          Developed by DOS0313
        </Link>
      </main>
    </div>
  );
}
