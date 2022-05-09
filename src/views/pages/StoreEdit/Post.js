import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";

const Post = (props) => {
  const address = props.address;
  const setAddress = props.setAddress;

  const onCompletePost = (data) => {
    setAddress(data.address);
  };

  const postCodeStyle = {
    display: "block",
    margin: "0px 0px 0px 105px",
    position: "fixed",
    top: "30%",
    border: "1px solid grey",
    width: "400px",
    height: "400px",
    zIndex: 100, 
  };

  return (
    <>
    
        <DaumPostcode
          style={postCodeStyle}
          autoClose
          onComplete={onCompletePost}

        />
     
    </>
  );
};

export default Post;