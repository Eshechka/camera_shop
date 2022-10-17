import { Product } from '../../types/product';
import CardItem from '../card-item/card-item';

type CardListProps = {
  products: Product[];
}

function CardList({
  products
}: CardListProps): JSX.Element {
  return (
    <div className="cards catalog__cards">
      {products.map((product) => (
        <CardItem
          key={product.id}
          name={product.name}
          rating={product.rating}
          reviewCount={product.reviewCount}
          price={product.price}
          previewImg={product.previewImg}
          previewImg2x={product.previewImg2x}
          previewImgWebp={product.previewImgWebp}
          previewImgWebp2x={product.previewImgWebp2x}
        />))}
    </div>
  );
}

export default CardList;
