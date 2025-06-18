export const calculateTotalPrice = (items) =>
  items.reduce((acc, item) => acc + (item.price || item.defaultPrice) / 100, 0);
