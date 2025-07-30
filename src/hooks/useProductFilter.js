import { useMemo } from 'react';

export function useProductFilters(products, selectedCategories, priceRange) {
  return useMemo(() => {
    return products.filter(product => {
 
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }
      
      const priceToCheck = product.hasDiscount ? product.discountPrice : product.price;
      if (priceToCheck < priceRange[0] || priceToCheck > priceRange[1]) {
        return false;
      }
      
      return true;
    });
  }, [products, selectedCategories, priceRange]);
}