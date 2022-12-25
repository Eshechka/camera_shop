import { Product } from '../../types/product';
import CardItem from '../card-item/card-item';

type cardListProps = {
  classname?: string;
  products: Product[];
  activeIds?: number[];
  onClickBuy?: (id: number) => void;
}

function CardList({
  classname,
  products,
  activeIds,
  onClickBuy,
}: cardListProps): JSX.Element {
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
          inBasket={product.inBasket !== undefined ? product.inBasket : false}
          classname={activeIds && activeIds.includes(product.id) ? 'is-active' : ''}
          onClickBuy={onClickBuy ? onClickBuy : undefined}
        />))}

    </div>
  );
}

export default CardList;
