import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useLocation, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";

const ItemDetails = () => {
  const { nftId } = useParams(); //<<<<<<<<<< issue with this line. (There are two different nftIds)
  const location = useLocation();
  //const item = location.state?.item;
  const author = location.state?.author;
  const [itemDetails, setItemDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );
        if (isMounted) {
          setItemDetails(response.data);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setError(error);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [nftId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading item details.</div>;
  }

  if (!itemDetails) {
    return <div>No item details available.</div>;
  }
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={itemDetails.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{itemDetails.title} #{itemDetails.tag}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {itemDetails.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {itemDetails.likes}
                    </div>
                  </div>
                  <p>
                    {itemDetails.description}                  
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${itemDetails.authorId}`}>
                            <img className="lazy" src={itemDetails.ownerImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${itemDetails.authorId}`}>{itemDetails.ownerName}</Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${itemDetails.authorId}`}>
                            <img className="lazy" src={itemDetails.authorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${itemDetails.authorId}`}>{itemDetails.authorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{itemDetails.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
