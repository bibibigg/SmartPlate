// /components/MealTemplateSlider.jsx

export default function MealTemplateSlider({ templates, onRecord }) {
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-4 px-2 py-4 snap-x snap-mandatory scroll-smooth overflow-x-auto">
        {templates.map((template, index) => (
          <div
            key={template.id}
            className="min-w-64 w-64 min-h-48 bg-white border rounded p-4 snap-center flex-shrink-0 shadow"
          >
            <h2 className="font-semibold mb-2">식단 {index + 1}</h2>
            <ul className="text-sm text-gray-700">
              {template.items.map((item, idx) => (
                <li key={idx}>
                  {item.name} {item.amount}g
                </li>
              ))}
            </ul>
            <button
              className="mt-4 px-3 py-1 bg-blue-500 text-white text-sm rounded"
              onClick={() => onRecord(template)}
            >
              섭취 기록
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
