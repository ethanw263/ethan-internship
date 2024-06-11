import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from '../UI/Skeleton'

const HotCollections = () => {
    const [collections, setCollections] = useState([]);
    const owlCarouselRef = useRef(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(
                ` https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
            )
            .then(function (response) {
                setCollections(response.data);
                setLoading(false);
                initializeOwlCarousel(); // Call the function to initialize Owl Carousel after fetching data
            })
            .catch(function (error) {
                setLoading(false);
            });
    }, []);

    const initializeOwlCarousel = () => {
        if (owlCarouselRef.current && collections.length > 0) {
            $(owlCarouselRef.current).owlCarousel({});
        }
    };

    return (
        <section id="section-collections" className="no-bottom">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="text-center">
                            <h2>Hot Collections</h2>
                            <div className="small-border bg-color-2"></div>
                        </div>
                    </div>

                    {loading ? (
                      <>
                        <OwlCarousel
                            className="owl-carousel"
                            ref={owlCarouselRef}
                            margin={10}
                            loop
                            items={4}
                            dots={false}
                            lazyLoad
                            nav
                            responsiveClass={true}
                            responsive={{
                                0: {
                                    items: 1,
                                },
                                740: {
                                    items: 2,
                                },
                                1000: {
                                    items: 3,
                                },
                                1400: {
                                    items: 4,
                                },
                            }}
                        >
                            {[...Array(4)].map((_, index) => (
                                <div
                                    key={index}
                                >
                                    <div className="nft_coll">
                                        <div className="nft_wrap">
                                            <Skeleton className="lazy img-fluid" width="300px" height="300px"/>
                                        </div>
                                        <div className="nft_coll_pp">
                                            <Skeleton width="60px" height="60px" borderRadius="50%"/>
                                            <i className="fa fa-check"></i>
                                        </div>
                                        <div className="nft_coll_info">
                                          <Skeleton width="160px" height="15px" />
                                        </div>
                                        <div>
                                          <Skeleton width="160px" height="15px" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </OwlCarousel>
                      </>
                    ) : (
                        <OwlCarousel
                            className="owl-carousel"
                            ref={owlCarouselRef}
                            margin={10}
                            loop
                            items={4}
                            dots={false}
                            lazyLoad
                            nav
                            responsiveClass={true}
                            responsive={{
                                0: {
                                    items: 1,
                                },
                                740: {
                                    items: 2,
                                },
                                1000: {
                                    items: 3,
                                },
                                1400: {
                                    items: 4,
                                },
                            }}
                        >
                            {collections.map((collection, index) => (
                                <div
                                    key={index}
                                >
                                    <div className="nft_coll">
                                        <div className="nft_wrap">
                                            <Link to="/item-details">
                                                <img
                                                    src={collection.nftImage}
                                                    className="lazy img-fluid"
                                                    alt=""
                                                />
                                            </Link>
                                        </div>
                                        <div className="nft_coll_pp">
                                            <Link to="/author">
                                                <img
                                                    className="lazy pp-coll"
                                                    src={collection.authorImage}
                                                    alt=""
                                                />
                                            </Link>
                                            <i className="fa fa-check"></i>
                                        </div>
                                        <div className="nft_coll_info">
                                            <Link to="/explore">
                                                <h4>{collection.title}</h4>
                                            </Link>
                                            <span>ERC-{collection.code}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </OwlCarousel>
                    )}
                </div>
            </div>
        </section>
    );
};

export default HotCollections;
