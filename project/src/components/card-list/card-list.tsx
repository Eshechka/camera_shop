import { Product } from '../../types/product';
import CardItem from '../card-item/card-item';

type CardListProps = {
  classname?: string;
  products: Product[];
  activeIds?: number[];
}

function CardList({
  classname,
  products,
  activeIds,
}: CardListProps): JSX.Element {
  return (
    <div className={classname}>
      {products.map((product) => (
        <CardItem
          key={product.id}
          id={product.id}
          name={product.name}
          rating={product.rating}
          reviewCount={product.reviewCount}
          price={product.price}
          previewImg={product.previewImg}
          previewImg2x={product.previewImg2x}
          previewImgWebp={product.previewImgWebp}
          previewImgWebp2x={product.previewImgWebp2x}
          classname={activeIds && activeIds.includes(product.id) ? 'is-active' : ''}
        />))}

    </div>
  );
}

export default CardList;
