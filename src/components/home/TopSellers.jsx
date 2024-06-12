import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from '../UI/Skeleton'

const TopSellers = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(
        ` https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`
      )
      .then(function (response) {
        setItems(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
      });
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
          {loading ? (
              <>
                <ol className="author_list">
                  {items.map((item, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Skeleton
                          width="60px"
                          height="60px"
                          borderRadius="50px"
                        />
                          <i className="fa fa-check"></i>
                      </div>
                      <div className="author_list_info">
                        <Skeleton 
                        width="100px"
                        height="15px"
                        />
                        <span><Skeleton width="50px" height="15px"/></span>
                      </div>
                    </li>
                  ))}
                </ol>
              </>
            ) : (
              <ol className="author_list">
                {items.map((item, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={item.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${item.authorId}`}>{item.authorName}</Link>
                      <span>{item.price} ETH</span>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
