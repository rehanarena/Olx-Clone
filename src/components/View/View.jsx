import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../store/firebaseContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './View.css';
import { PostContext } from '../../store/PostContext';

function View() {
  const [userDetails, setUserDetails] = useState();
  const { postDetails } = useContext(PostContext);
  const { db } = useContext(FirebaseContext);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const { userId } = postDetails;
        if (!userId) {
          console.error('No userId found in postDetails');
          return;
        }

        const usersCollection = collection(db, 'users');
        const q = query(usersCollection, where('id', '==', userId));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          setUserDetails(doc.data());
        });
      } catch (error) {
        console.error('Error fetching user details: ', error);
      }
    };

    if (postDetails && postDetails.userId) {
      fetchUserDetails();
    }
  }, [postDetails, db]);

  // Extract details from postDetails
  const url = postDetails?.imageUrl;
  const name = postDetails?.name;
  const price = postDetails?.price;
  const category = postDetails?.category;
  const createdAt = postDetails?.createdAt;

  // Debugging logs
  console.log('Post Details:', postDetails);
  console.log('Image URL:', url);
  console.log('Product Name:', name);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        {url ? (
          <img src={url} alt={name || 'Product Image'} />
        ) : (
          <p>Image not available</p>
        )}
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {price || 'N/A'} </p>
          <span>{name || 'N/A'}</span>
          <p>{category || 'N/A'}</p>
          <span>{createdAt || 'N/A'}</span>
        </div>
        {userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username || 'N/A'}</p>
            <p>{userDetails.phone || 'N/A'}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default View;
