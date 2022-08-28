import React from "react";
import { useEffect, useState } from "react";

const PopularProduct = (props) => {
    const [products, setProduct] = useState([]);

    const [voteCounts, setVoteCounts] = useState({});
    //getting post
    const fakePost = async () => {
        //const response = await fetch("https://jsonplaceholder.typicode.com/photos");
        const response = await fetch("https://fakestoreapi.com/products");
        setProduct(await response.json()); // converting into json file
    };

    useEffect(() => {
        fakePost();
    }, []);

    useEffect(() => {
        let _voteCounts = window.localStorage.getItem("voteCounts");
        _voteCounts = JSON.parse(_voteCounts);
        setVoteCounts(_voteCounts);
    }, []);

    // update localStorage
    useEffect(() => {
        window.localStorage.setItem(
            "voteCounts",
            JSON.stringify(voteCounts || "{}")
        );
    }, [voteCounts]);



    const listingproducts = products.slice(0, 6);

    const handleUpvoteClick = (index) => {
        return () => {
            setVoteCounts({
                ...voteCounts,
                [index]: (voteCounts[index] || 0) + 1
            });
        };
    };

    return (
        <>
            {listingproducts.map((product, index) => {
                return (
                    <div className="ui card " key={index}>
                        <div className="ui image" style={{ padding: "30px"}}>
                            <img style={{  height: "300px",objectFit: "contain" }} src={product.image} />
                        </div>
                        <div className="middle aligned content">
                            <h2 className="header" style={{ marginTop: "15px"}}>{product.title}</h2>
                            <div className="description">
                                <p>{product.description}</p>
                            </div>
                        </div>
                        <div className="extra content ">
                            <a href="#" className="left floated">
                                <img className="ui avatar image" src={product.image} />
                                <b>Price: ${product.price} </b>
                            </a>
                            <div className="header right floated">
                                <a onClick={handleUpvoteClick(index)}>
                                    <i className="large caret up icon" />Upvote
                                    <span key={index}>{voteCounts[index]}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};
export default PopularProduct;