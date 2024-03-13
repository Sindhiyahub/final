import React from "react";
import { useNavigate } from "react-router-dom";
import MainShop from "./MainShop";
import img1 from "../../assets/pothys.jpeg";
import "./MainShops.css";
import { apiActions } from "../../store/productApiSlice";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/uiSlice";

//const APIKEY = process.env.REACT_APP_API_KEY;

const APIKEY = "8306786361msh7fe50ad85dff67bp111da0jsn9304d1b13e73";

const MainShops = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productListHandler = async (productCategory) => {
    dispatch(uiActions.openSpinner());
    try {
      const response = await fetch(
        `https://kohls.p.rapidapi.com/products/list?limit=24&offset=1&keyword=${productCategory}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "kohls.p.rapidapi.com",
            "x-rapidapi-key": APIKEY,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Fetching data failed!");
      }

      const data = await response.json();
      const formedData = data.payload.products || [];
      const apiDataObj = formedData.map((data, index) => {
        return {
          id: index,
          title: data.productTitle,
          image: data.image.url,
          price: data.prices[0].regularPrice.minPrice,
          webID: data.webID,
          rating: data.rating.avgRating,
        };
      });

      dispatch(
        apiActions.apiData({
          items: apiDataObj,
        })
      );
      dispatch(uiActions.closeSpinner());
      navigate(`/${productCategory}`);
    } catch (error) {
      alert(error);
    }
  };

  const productListOne = () => {
    productListHandler("Women cloth");
  };

  const productListTwo = () => {
    productListHandler("men cloth");
  };

  const productListThree = () => {
    productListHandler("family cloth");
  };

  const productListFour = () => {
    productListHandler("boutique");
  };

  return (
    <div className="mainShops">
      <div className="mainShops__container">
      <div className="card">
        <MainShop
          mainTitle="Women"
          image="https://www.hayclothing.in/cdn/shop/files/STA05936.webp?v=1707829366&width=360"
          onListHandler={productListOne}
        />
       
        </div>
         <div className="card">
        <MainShop
          mainTitle="Men"
          image="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          onListHandler={productListTwo}
        /></div>
        <div className="card">
        <MainShop
          mainTitle="Family"
          image="https://img.freepik.com/free-photo/mother-with-her-children-backyard_1303-22039.jpg?w=360&t=st=1709467523~exp=1709468123~hmac=a1da121c53a667171ecc9ec477b5f7e039371b7b9c15907ef21837de09f35c06"
          onListHandler={productListThree}
        />
        <div className=" logo">
        <img src= {img1} alt="img1" />
        </div>
        </div>
         <div className="card">
        <MainShop
          mainTitle="Boutique"
          image="https://images.unsplash.com/photo-1555529771-122e5d9f2341?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          onListHandler={productListFour}
        />
       </div> 
      </div>
    </div>
  );
};

export default MainShops;
