import React, { useContext, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useFirebase } from '../../store/firebaseContext';
import { PostContext } from '../../store/PostContext';
import Heart from '../../assets/Heart';
import './Post.css';
import { useNavigate } from 'react-router-dom';

function Posts() {
  const { db } = useFirebase();
  const [products, setProducts] = useState([]);
  const { setPostDetails } = useContext(PostContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, "products");
        const productsSnapshot = await getDocs(productsCollection);
        const allProducts = productsSnapshot.docs.map(doc => {
          const data = doc.data();
          const createdAt = data.createdAt;

          let formattedDate = 'N/A';

          if (createdAt instanceof Date) {
            formattedDate = createdAt.toDateString();
          } else if (createdAt && typeof createdAt.toDate === 'function') {
            formattedDate = createdAt.toDate().toDateString();
          } else if (typeof createdAt === 'string') {
            formattedDate = new Date(createdAt).toDateString();
          } else {
            console.warn('Unexpected data type for createdAt:', createdAt);
          }

          return {
            ...data,
            id: doc.id,
            createdAt: formattedDate,
          };
        });
        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, [db]);

  const handleCardClick = (product) => {
    setPostDetails(product); // Set specific product details
    navigate('/view');
  };

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product) => (
            <div
              className="card"
              key={product.id}
              onClick={() => handleCardClick(product)} // Handle click for specific product
            >
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.imageUrl || '/default-image.jpg'} alt={product.name} />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {/* Recommendations content goes here */}
        </div>
      </div>
    </div>
  );
}

export default Posts;
