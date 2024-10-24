type ItemsRendererProps<T> = {
  items: T[];
  renderItems: (item: T, id?: number) => React.ReactNode;
};

const ItemsRenderer = <U,>({ items, renderItems }: ItemsRendererProps<U>) => {
  return <>{items?.map((item, id) => renderItems(item, id))}</>;
};

export default ItemsRenderer;
