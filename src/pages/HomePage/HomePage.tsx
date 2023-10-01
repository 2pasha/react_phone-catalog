import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';
import { useGetProductsQuery } from '../../features/API/apiSlice';
import { calculateDiscount } from '../../helpers/calculateDiscount';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import './HomePage.scss';
import { getProductCount } from '../../helpers/getProductCount';

export const HomePage = () => {
  const { data: products = [], isLoading } = useGetProductsQuery();

  const hotPriceProducts = useMemo(() => {
    return products
      .filter(product => product.discount !== 0)
      .sort((a, b) => calculateDiscount(a) - calculateDiscount(b));
  }, [products]);

  const brandNewProducts = useMemo(() => {
    return products
      .filter(product => !product.discount)
      .sort((a, b) => b.price - a.price);
  }, [products]);

  const phonesCount = useMemo(() => {
    return getProductCount(products, 'phone');
  }, [products]);

  const tabletsCount = useMemo(() => {
    return getProductCount(products, 'tablet');
  }, [products]);

  const accessoriesCount = useMemo(() => {
    return getProductCount(products, 'accessory');
  }, [products]);

  return (
    <div className="HomePage container">
      {isLoading && (
        <div className="HomePage__loader">
          <Loader />
        </div>
      )}

      {!isLoading && (
        <>
          <h1 className="HomePage__carousel-container">
            Home page
          </h1>

          <section className="section">
            <h2 className="section__title">
              Hot prices
            </h2>

            <ProductSlider
              products={hotPriceProducts}
            />
          </section>

          <section className="HomePage__shop-by-category section">
            <h2 className="section__title HomePage__shop-by-category--title">
              Shop by category
            </h2>

            <ul
              className="HomePage__shop-by-category--container"
              data-cy="categoryLinksContainer"
            >
              <li className="HomePage__shop-by-category--category">
                <Link
                  to="/phones"
                  className="HomePage__shop-by-category--link"
                >
                  <div className="HomePage__shop-by-category--photo">
                    <img
                      src="_new/img/category-phones.png"
                      alt="phones category"
                    />
                  </div>
                  <h3>
                    Mobile phones
                  </h3>
                </Link>
                <p>
                  {`${phonesCount} models`}
                </p>
              </li>

              <li className="HomePage__shop-by-category--category">
                <Link to="/tablets">
                  <img
                    src="_new/img/category-tablets.png"
                    alt="tablets category"
                  />
                  <h3>
                    Tablets
                  </h3>
                </Link>
                <p>
                  {`${tabletsCount} models`}
                </p>
              </li>

              <li className="HomePage__shop-by-category--category">
                <Link to="/accessories">
                  <img
                    src="_new/img/category-accessories.png"
                    alt="accessories category"
                  />
                  <h3>
                    Accessories
                  </h3>
                </Link>
                <p>
                  {`${accessoriesCount} models`}
                </p>
              </li>
            </ul>
          </section>

          <section className="section">
            <h2 className="section__title">
              Brand new models
            </h2>

            <ProductSlider
              products={brandNewProducts}
            />
          </section>
        </>
      )}
    </div>
  );
};
