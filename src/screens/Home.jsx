import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";

export default function Home() {
  const [search, setSearch] = useState('');

  const [foodCategory, setFoodCategory] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const URI = import.meta.env.VITE_APP_URL;


  const loadData = async () => {
    const res = await fetch(URI+"/food", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data[0], data[1]);

    setFoodItem(data[0]);
    setFoodCategory(data[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      

      <div id="carouselExampleFade" className="carousel  slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
  <div className="carousel-inner" id='carousel'>
    <div className="carousel-caption" style={{zIndex: "10"}}>
    <div className="d-flex justify-content-center">
    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>[setSearch(e.target.value)]}/>
    {/*<button className="btn btn-outline-success my-2 my-sm-0 m-2 text-white" type="submit">Search</button>*/}
  </div>
    </div>
    <div className="carousel-item active ">
      <img src="https://source.unsplash.com/random/500×200/?burger" style={{filter: "brightness(30%)", height:"700px"   }} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/500×200/?pasta" style={{filter: "brightness(30%)", height:"700px"}} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/500×200/?barbeque" style={{filter: "brightness(30%)", height:"700px"}} className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>




      <div className=" container m-3 ml-3">
        {setFoodCategory
          ? foodCategory.map((data) => {
              return (
                <div className="row mb-3">
                  <div key={data._id} className="fs-3 m-3 ">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem
                    .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))) 
                    .map((filterItems) =>  <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>
                    
                    <Card foodName={filterItems.name} item={filterItems} options={filterItems.options[0]} ImgSrc={filterItems.img} ></Card>
                  </div>)}
                </div>
              );
            })
          : ""}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
