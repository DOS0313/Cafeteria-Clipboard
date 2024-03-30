'use client';

import { MealData } from '../types';

interface ClickableDivProps {
  children: React.ReactNode;
  mealData: MealData[];
}

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Copied to clipboard");
  } catch (error) {
    console.error("Failed to copy: ", error);
  }
};

const ClickableDiv: React.FC<ClickableDivProps> = ({ children, mealData }) => {
  const handleClick = () => {
    const textToCopy = mealData
      .map(meal => {
        const dishName = meal.DDISH_NM.replace(/<br\/>/g, '\n');
        return `[${meal.MMEAL_SC_NM}]\n${dishName}`;
      })
      .join('\n\n');
    copyToClipboard(textToCopy);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Copied to clipboard');
    } catch (error) {
      console.error('Failed to copy: ', error);
    }
  };

  return (
    <div className="border-solid border-2 border-white rounded-lg p-8" onClick={handleClick}>
      {children}
    </div>
  );
};

export default ClickableDiv;