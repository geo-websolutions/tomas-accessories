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

  const handleMinPriceChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setPriceRange([Math.min(value, priceRange[1]), priceRange[1]]);
  };

  const handleMaxPriceChange = (e) => {
    const value = parseInt(e.target.value) || 2000;
    setPriceRange([priceRange[0], Math.max(value, priceRange[0])]);
  };

  const handleRangeChange = (e) => {
    setPriceRange([priceRange[0], parseInt(e.target.value)]);
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
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-400 mb-1">الحد الأدنى</label>
            <input
              type="number"
              min="0"
              max={priceRange[1]}
              value={priceRange[0]}
              onChange={handleMinPriceChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200 focus:outline-none focus:ring-1 focus:ring-yellow-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-400 mb-1">الحد الأقصى</label>
            <input
              type="number"
              min={priceRange[0]}
              max="1000"
              value={priceRange[1]}
              onChange={handleMaxPriceChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200 focus:outline-none focus:ring-1 focus:ring-yellow-500"
            />
          </div>
        </div>
        <div className="px-2">
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={handleRangeChange}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-yellow-500"
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