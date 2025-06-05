import TopPicks from "./TopPicks";
import MenuCard from "./MenuCard";

const MenuSection = ({ topPicksData, menuData, resInfo }) => (
  <>
    <h2 className="text-center mt-5 leading-5">MENU</h2>
    <div className="w-full mt-5 relative cursor-pointer">
      <div className="w-full p-3 rounded-xl font-semibold text-lg bg-slate-200 text-center">
        Search for dishes
      </div>
      <i className="fi fi-rr-search absolute top-3 right-4"></i>
    </div>
    {topPicksData && <TopPicks topPicksData={topPicksData} />}
    <div>
      {menuData.map(({ card: { card } }, i) => (
        <MenuCard card={card} key={i} resInfo={resInfo} />
      ))}
    </div>
  </>
);

export default MenuSection;
