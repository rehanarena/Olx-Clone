import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { FirebaseContext } from '../../store/firebaseContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useNavigate } from "react-router-dom";

const Create = () => {
  const { auth, storage } = useContext(FirebaseContext);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const date = new Date();
  const user = auth.currentUser;
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (image) {
      try {
        // Initialize storage
        const storage = getStorage();
        const imageRef = ref(storage, `/images/${image.name}`);
        
        // Upload image
        await uploadBytes(imageRef, image);
        const url = await getDownloadURL(imageRef);

        // Save data to Firestore
        await addDoc(collection(db, 'products'), {
          name,
          category,
          price,
          imageUrl: url,
          userId: user.uid,
          createdAt: date.toDateString()
        });
        navigate('/');

        console.log('Product added successfully!');
      } catch (error) {
        console.error('Error uploading image or saving to Firestore: ', error);
      }
    }
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="fname"
            name="Name"
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id="fname"
            name="category"
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            id="fname"
            name="Price"
          />
          <br />
          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ""}
          />
          <br />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">Upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
