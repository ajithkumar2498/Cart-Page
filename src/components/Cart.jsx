import React, { useContext, useState, useEffect } from "react";
import { Price } from "../util/Context.jsx";

function Cart() {
  let [total, setTotal] = useState(0);
  let price = useContext(Price);

  let handlePrice = () => {
    let ans = 0;
    price.priceDetails.products.map((i) => {
      ans += i.item * i.price;
    });
    setTotal(ans);
  };
  useEffect(() => {
    handlePrice();
  });

  let handleChange = (i, d) => {
    const newArray = structuredClone(price.priceDetails);
    if (newArray.products[i].item < newArray.products[i].stock) {
      newArray.products[i].item = d;
      console.log(newArray);
      price.setPriceDetails(newArray);
    } else {
      alert("There is no stock left");
      window.location.reload();
    }
  };

  let handleDelete = (i) => {
    let newCard = structuredClone(price.priceDetails);
    console.log(newCard);
    newCard.products.splice(i, 1);
    price.setPriceDetails(newCard);
  };
  return (
    <>
      <h1>CART PAGE</h1>
      <div className="container mt-10 p-3 rounded cart">
        <div className="row no-gutters">
          <div className="col-md-9">
            <div className="product-details mr-2">
              <div className="d-flex flex-row align-items-center">
                <i className="fa fa-long-arrow-left"></i>
                <span className="ml-2">Continue Shopping</span>
              </div>
              <hr />
              <h6 className="mb-0">Shopping cart</h6>
              <div className="d-flex justify-content-between">
                <span>Cart Items</span>
                <div className="d-flex flex-row align-items-center">
                  <span className="text-black-50">Sort by:</span>
                  <div className="price ml-2">
                    <span className="mr-1">price</span>
                    <i className="fa fa-angle-down"></i>
                  </div>
                </div>
              </div>
              {price.priceDetails.products.map((e, i) => {
                return (
                  <div
                    className="d-flex justify-content-between align-items-center mt-3 p-5 items rounded"
                    key={e.id}
                  >
                    <div className="d-flex flex-row">
                      <img
                        className="rounded justify-content-center"
                        src={e.thumbnail}
                        width="80"
                        height="100"
                      />
                      <div className="ml-3">
                        <span className="font-weight-bold d-block">
                          {e.title}
                        </span>{" "}
                        <span className="spec">{e.description}</span>
                        <br />
                        <span>{`Hurry up only ${e.stock} stocks left`}</span>
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center">
                      <i
                        className="fa fa-minus m-2 text-red-35 btn-dec "
                        onClick={() => {
                          handleChange(i, e.item - 1);
                        }}
                      ></i>
                      <span className="d-block font-weight-bold">{e.item}</span>
                      <i
                        className="btn-inc fa fa-plus m-3 text-green-35"
                        onClick={() => {
                          handleChange(i, e.item + 1);
                        }}
                      ></i>
                      <span className="d-block ml-5 font-weight-bold">
                        {`$ ${e.price * e.item}`}{" "}
                      </span>{" "}
                      <i
                        onClick={(i) => {
                          handleDelete(i);
                        }}
                        className="fa fa-trash-o ml-3 text-black-50 trash"
                      ></i>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-md-3">
            <div className="payment-info">
              <hr className="line" />
              <div className="d-flex justify-content-between information">
                <span>Subtotal</span>
                <span>{`$${total}`}</span>
              </div>
              <div className="d-flex justify-content-between information">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="d-flex justify-content-between information">
                <span>Total(Incl. taxes)</span>
                <span>{`$${total}`}</span>
              </div>
              <button
                className="btn btn-primary btn-block d-flex justify-content-between mt-3"
                type="button"
              >
                <span>{`$${total}`}</span>
                <span>
                  Checkout<i className="fa fa-long-arrow-right ml-1"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
