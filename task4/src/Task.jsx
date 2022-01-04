import React, { useState } from "react";
import "./task.css";
import loanProducts from "./loanProducts.json";

export const Task = () => {
  const JSONproducts = JSON.stringify(loanProducts);
  const products = JSON.parse(JSONproducts);

  const [activeProduct, setActiveProduct] = useState(products[0]);
  const [currentProducts, setCurrentProducts] = useState(products);

  const onSaveHandler = () => {
    let activeProductIndex = currentProducts.findIndex((item) =>
      item.id === activeProduct.id ? item : false
    );
    currentProducts.splice(activeProductIndex, 1, activeProduct);
    setCurrentProducts([...currentProducts]);
  };

  const changeActiveProductFieldValue = (event, key) => {
    setActiveProduct({ ...activeProduct, ...{ [key]: event.target.value } });
  };

  const createNewProduct = () => {
    let randomId;
    const generateRandomId = () => {
      randomId = Math.floor(Math.random() * (10000 - 1000) + 1000).toString();
      if (currentProducts.find((item) => item.id === randomId)) {
        generateRandomId();
      }
    };
    generateRandomId();
    currentProducts.push({
      productName: "",
      date: `${new Date().toLocaleDateString()}`,
      minAmount: "",
      maxAmount: "",
      minTerm: "",
      maxTerm: "",
      annualRate: "",
      id: `${randomId}`,
    });
    setCurrentProducts([...currentProducts]);
    setActiveProduct(currentProducts[currentProducts.length - 1]);
  };

  return (
    <>
      <div className="header">
        Super<b>Bank</b>
      </div>
      <div className="main">
        <div className="menu-list">
          <div
            className="create-product-button"
            onClick={() => createNewProduct()}
          >
            Создать продукт
          </div>
          <div className="product-list">
            {currentProducts.map((item) => (
              <div
                className={
                  item.id === activeProduct.id
                    ? "product-item active"
                    : "product-item"
                }
                onClick={() => setActiveProduct(item)}
                key={item.id}
              >
                <div className="product-name">{item.productName}</div>
                <div className="product-date">{item.date}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="edit-block">
          <div className="edit-title">
            Редактирование: {activeProduct.productName}
          </div>
          <div>
            <div className="product-name-text">
              <label htmlFor="input-product-name">Product Name</label>
            </div>
            <input
              id="input-product-name"
              type="text"
              placeholder="Placeholder"
              className="edit-product-name-input"
              value={activeProduct.productName}
              onChange={(event) =>
                changeActiveProductFieldValue(event, "productName")
              }
            />
          </div>
          <div className="edit-block-inputs">
            <div className="amount-input-wrapper">
              <div className="input-form first-list-input">
                <label htmlFor="input-min-amount">Min Amount</label>
                <input
                  id="input-min-amount"
                  type="number"
                  placeholder="Placeholder"
                  className="min-amount input first-list-input"
                  value={activeProduct.minAmount}
                  onChange={(event) =>
                    changeActiveProductFieldValue(event, "minAmount")
                  }
                />
              </div>
              <div className="input-form">
                <label htmlFor="input-max-amount">Max Amount</label>
                <input
                  id="input-max-amount"
                  type="number"
                  placeholder="Placeholder"
                  className="max-amount input"
                  value={activeProduct.maxAmount}
                  onChange={(event) =>
                    changeActiveProductFieldValue(event, "maxAmount")
                  }
                />
              </div>
            </div>
            <div className="term-input-wrapper">
              <div className="input-form first-list-input">
                <label htmlFor="input-min-term">Min Term</label>
                <input
                  id="input-min-term"
                  type="number"
                  placeholder="Placeholder"
                  className="min-term input first-list-input"
                  value={activeProduct.minTerm}
                  onChange={(event) =>
                    changeActiveProductFieldValue(event, "minTerm")
                  }
                />
              </div>
              <div className="input-form">
                <label htmlFor="input-max-term">Max Term</label>
                <input
                  id="input-max-term"
                  type="number"
                  placeholder="Placeholder"
                  className="max-term input"
                  value={activeProduct.maxTerm}
                  onChange={(event) =>
                    changeActiveProductFieldValue(event, "maxTerm")
                  }
                />
              </div>
            </div>
            <div>
              <div className="input-form first-list-input">
                <label htmlFor="input-annual-rate">Annual Interest Rate</label>
                <input
                  id="input-annual-rate"
                  type="number"
                  placeholder="Placeholder"
                  className="annual-rate input"
                  value={activeProduct.annualRate}
                  onChange={(event) =>
                    changeActiveProductFieldValue(event, "annualRate")
                  }
                />
              </div>
            </div>
            <div className="save-button" onClick={() => onSaveHandler()}>
              Сохранить
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
