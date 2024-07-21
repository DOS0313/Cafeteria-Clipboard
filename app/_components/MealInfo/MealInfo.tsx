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

    return (
      <div
        ref={ref}
        className={`w-full overflow-y-auto ${
          isDownloading ? "" : "max-h-[calc(100vh-8rem)]"
        } mb-2 border-solid border border-gray-300 p-4 bg-white rounded-lg`}
      >
        <p className="font-bold text-xl mb-4">{displayDate()} 급식 🍚</p>
        {isLoading ? (
          <Skeleton />
        ) : mealData.length > 0 ? (
          <p className="whitespace-pre-line leading-5 mb-4">
            {mealData.map((meal, index) => (
              <React.Fragment key={index}>
                <strong>
                  {meal.MMEAL_SC_NM}
                  <br />
                </strong>
                {meal.DDISH_NM.split("<br/>").join("\n")}
                {index < mealData.length - 1 && <br />}
                <br />
              </React.Fragment>
            ))}
          </p>
        ) : (
          <p>급식 데이터가 없습니다.</p>
        )}
      </div>
    );
  }
);

MealInfo.displayName = "MealInfo";

export default MealInfo;
