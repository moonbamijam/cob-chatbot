const ItemsRenderer = ({ items, renderItems }) => {
  return <>{items?.map((item, i) => renderItems(item, i))}</>;
};

export default ItemsRenderer;
