import React, { forwardRef } from "react";
import { MealData } from "../../_types/types";
import Skeleton from "../Skeleton/Skeleton";

interface MealInfoProps {
  isDownloading: boolean;
  mealData: MealData[];
  formattedDate: string;
  isLoading: boolean;
}

const MealInfo = forwardRef<HTMLDivElement, MealInfoProps>(
  ({ isDownloading, mealData, formattedDate, isLoading }, ref) => {
    const displayDate = () => {
      const date = new Date(
        parseInt(formattedDate.slice(0, 4)),
        parseInt(formattedDate.slice(4, 6)) - 1,
        parseInt(formattedDate.slice(6, 8))
      );
      return `${date.getMonth() + 1}/${date.getDate()}`;
    };

    const getMealEmoji = (mealType: string) => {
      switch (mealType.replace(/[\[\]]/g, "").trim()) {
        case "조식":
          return "☀️";
        case "중식":
          return "🌞";
        case "석식":
          return "🌙";
        default:
          return "";
      }
    };

    return (
      <div
        ref={ref}
        className={`w-full ${
          isDownloading ? "h-full" : "max-h-[calc(100vh-8rem)]"
        } overflow-y-auto mb-2 border-solid border border-gray-300 p-4 bg-white rounded-lg flex flex-col`}
        style={
          isDownloading ? { minHeight: "600px", aspectRatio: "9 / 16" } : {}
        }
      >
        <p className="font-bold text-xl mb-4">{displayDate()} 급식 🍚</p>
        {isLoading ? (
          <Skeleton />
        ) : mealData.length > 0 ? (
          <div className="flex-grow flex flex-col justify-start">
            {mealData.map((meal, index) => (
              <div key={index} className="mb-6">
                <strong className="text-lg block mb-2">
                  {getMealEmoji(meal.MMEAL_SC_NM)}{" "}
                  {meal.MMEAL_SC_NM.replace(/[\[\]]/g, "")}
                </strong>
                <p className="whitespace-pre-line">
                  {meal.DDISH_NM.split("<br/>").join("\n")}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>급식 데이터가 없습니다.</p>
        )}
      </div>
    );
  }
);

MealInfo.displayName = "MealInfo";

export default MealInfo;
