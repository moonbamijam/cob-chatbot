type ItemsRendererProps<T> = {
  items: T[];
  renderItems: (item: T, ...args: T[]) => React.ReactNode;
};

const ItemsRenderer = <U,>({ items, renderItems }: ItemsRendererProps<U>) => {
  return <>{items?.map((item) => renderItems(item))}</>;
};

export default ItemsRenderer;
