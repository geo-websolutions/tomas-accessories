// components/FilterSidePanel.js
'use client';

export default function FilterSidePanel({
  categories,
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange
}) {
  const toggleCategory = (category) => {
    setSelectedCategories(
      selectedCategories.includes(category)
        ? selectedCategories.filter(c => c !== category)
        : [...selectedCategories, category]
    );
  };

  return (
    <div className="space-y-8">
      {/* Categories Filter */}
      <div>
        <h4 className="text-lg font-semibold mb-4 text-gray-200">الفئات</h4>
        <div className="space-y-2">
          {categories.map(category => (
            <label key={category} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-yellow-500 focus:ring-yellow-500"
              />
              <span className="text-gray-300">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h4 className="text-lg font-semibold mb-4 text-gray-200">نطاق السعر</h4>
        <div className="px-2">
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between mt-2 text-gray-300">
            <span>{priceRange[0]} ج.م</span>
            <span>{priceRange[1]} ج.م</span>
          </div>
        </div>
      </div>

      {/* Discount Filter */}
      <div>
        <h4 className="text-lg font-semibold mb-4 text-gray-200">العروض</h4>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-yellow-500 focus:ring-yellow-500"
          />
          <span className="text-gray-300">المنتجات المخفضة فقط</span>
        </label>
      </div>
    </div>
  );
}