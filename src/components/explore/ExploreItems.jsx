import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import Countdown from "../UI/Countdown";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(8);

  useEffect(() => {
    axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`)
    .then(function (response) {
      setItems(response.data)
      setLoading(false)
    })
    .catch(function (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    })
  }, []);

  const loadMoreItems = () => {
    const nextVisibleItems = visibleItems + 4;
    setVisibleItems(nextVisibleItems);

    if (nextVisibleItems >= items.length) {
      document.getElementById("loadmore").style.display = "none";
    }
  };

  const handleFilterChange = (event) => {
    const filterValue = event.target.value;
    let filterUrl =
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
    if (filterValue) {
      filterUrl += `?filter=${filterValue}`;
    }
    axios.get(filterUrl)
      .then(function (response) {
        setItems(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={handleFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading ? (
        <>
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="col-md-3"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                    <Skeleton width="60px" height="60px" borderRadius="50px" />
                    <i className="fa fa-check"></i>
                </div>
                <Skeleton className="lazy img-fluid" width="100%" height="300px" />
                <div>
                  <Link to="/item-details">
                    <img src={nftImage} className="lazy nft__item_preview" alt="" />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Skeleton width="160px" height="15px" />
                  <div className="nft__item_price">
                    <Skeleton width="60px" height="15px" /> 
                  </div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>
                      <Skeleton width="30px" height="15px" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
        {items.slice(0, visibleItems).map((item, index) => (
          <div
            key={item.id}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to={`/author/${item.authorId}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <img className="lazy" src={item.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              <div className="de_countdown"><Countdown item={item}/></div>

              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>
                    <div className="nft__item_share">
                      <h4>Share</h4>
                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-facebook fa-lg"></i>
                      </a>
                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-twitter fa-lg"></i>
                      </a>
                      <a href="">
                        <i className="fa fa-envelope fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <Link to={`/item-details/${item.nftId}`}>
                  <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
                </Link>
              </div>
              <div className="nft__item_info">
                <Link to={`/item-details/${item.nftId}`}>
                  <h4>{item.title}</h4>
                </Link>
                <div className="nft__item_price">{item.price} ETH</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{item.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        </>
      )}

      <div className="col-md-12 text-center">
          {visibleItems < items.length && (
            <Link to="" id="loadmore" className="btn-main lead" onClick={loadMoreItems}>
            Load more
          </Link>
          )}
      </div>
    </>
  );
};

export default ExploreItems;