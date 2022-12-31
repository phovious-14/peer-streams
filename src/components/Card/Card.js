import { Button, Modal } from "antd";
import React, { useState, useEffect, useContext } from "react";
import "./cardStyle.css";
import AOS from "aos";
import Auth from "../../context/Auth";

const btnStyle = {
  border: "1px solid #B100FF",
  cursor: "pointer",
  fontSize: "12px",
  marginBottom:"20px",
  background:"#B100FF",
  padding: " 0 20px",
  color:"white"

};

const Card = () => {

  const {nftsList} = useContext(Auth)

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (i) => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  

  useEffect(() => {
    AOS.init();
    console.log(nftsList);
  }, [nftsList]);

  return (
    <div className="container2">
    {nftsList.length !== 0 ? (
      nftsList.map((item) => (
          <div className="wrapper" data-aos="flip-down" data-aos-delay="200">
            <div className="card">
            <iframe src={item.image_l} title="log"></iframe>

              <div className="price">
                <p>
                  <Button style={btnStyle} onClick={showModal}>
                    Watch
                  </Button>
                  <Modal
                    title="name"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    style={{ width: "90vw" }}
                    width={1200}
                  >
                    <div className="modal-style">
                      <img src="" className="nft-img" alt="" />
                      <div>
                        description <br />
                        <br />
                        <button>Report</button>
                      </div>
                    </div>
                  </Modal>
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <iframe src="https://embed.lottiefiles.com/animation/54026" title='j'></iframe>
      )}
    </div>
  );
};

export default Card;
