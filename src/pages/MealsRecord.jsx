// import MealTemplateSlider from "../components/MealTemplateSlider";
import MealBuilder from "../components/Meals/MealBuilder";

export default function MealsRecordPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">내 식단 템플릿</h1>
      <MealBuilder />
      {/* <MealTemplateSlider templates={dummyTemplates} onRecord={handleRecord} /> */}
    </div>
  );
}
