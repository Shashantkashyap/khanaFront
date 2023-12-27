import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatchCart, useCart } from "./ContextReducer";

function Card(props) {

  let dispatch = useDispatchCart();
  let data = useCart()

  let options = props.options;
  let priceOptions = Object.keys(options);
 

  const [qty,setQty]=useState(1);
  const [size, setSize]= useState("")

  const priceRef = useRef();


  let foodItem = props.item

  const handleQty = (e) => {
    setQty(e.target.value);
  }
  const handleOptions = (e) => {
    setSize(e.target.value);
  }
 
 
    const addToCart = async()=>{
/*
      let food=[];
      for(const item of data){
        if (item.id === props.foodItem.id){
          food = item;
          break;
        }
      }

      if (food.length !== 0) {
        if (food.size === size) {
          await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
          return
        }
        else if (food.size !== size) {
          await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
          console.log("Size different so simply ADD one more to the list")
          return
        }
        return
      }*/


      await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log(data)
    }

    let finalPrice = qty * parseInt(options[size])
    useEffect(()=>{
      setSize(priceRef.current.value)
    },[])
  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img src={props.ImgSrc} alt="" className="card-img-top" style={{height:"150px", objectFit:"fill"}} />
         <div className="card-body">
          <h5 className="card-title">{props.foodName}</h5>
          <p className="card-text">{}</p>
          <div className="container w-100">
            <select className="m-2 h-100  bg-success rounded" name="" id="" onChange={handleQty}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>

            <select className="m-2 h-100  bg-success rounded" ref={priceRef} name="" id="" onChange={handleOptions}>
              {
                priceOptions.map((data)=>{
                  return(
                    <option key={data} value={data}>{data}</option>
                  )
                })
              }
            </select>

            <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
          </div>
          <hr />
          <button button className="btn bg-success text-black "  onClick={addToCart}>
                  Cart
                </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
