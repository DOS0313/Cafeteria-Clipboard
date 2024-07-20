export default function Button({ text, type, onClick }: { text: string; type?: 'solid' | 'stroke'; onClick?: () => void }) {
  const buttonClass = type === 'stroke'
    ? "border border-gray-950 text-gray-950 rounded-full text-base font-bold py-4 w-full"
    : "bg-gray-950 text-white rounded-full text-base font-bold py-4 w-full";

  return (
    <button className={buttonClass} onClick={onClick}>
      {text}
    </button>
  );
}