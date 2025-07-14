import { Discount, HorizontalScroller } from "../index";

const DiscountSection = ({ discountData }) => (
  <HorizontalScroller title="Deals for you">
    {discountData.map((data, i) => (
      <Discount key={i} data={data} />
    ))}
  </HorizontalScroller>
);

export default DiscountSection;
