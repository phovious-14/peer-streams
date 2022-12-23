import { Button, Modal } from "antd";
import React, { useState, useEffect } from "react";
import "./cardStyle.css";
import AOS from "aos";

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
  });

  return (
    <div className="container2">
          <div className="wrapper" data-aos="flip-down" data-aos-delay="200">
            <div className="card">
              <img src="https://wallpaper.dog/large/20542267.jpg" alt="" />

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

          <div className="wrapper" data-aos="flip-down" data-aos-delay="200">
            <div className="card">
              <img src="https://wallpaper.dog/large/20542287.png" alt="" />

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
                        <br />{" "}
                        <span>
                          <img
                            src="https://www.pngall.com/wp-content/uploads/10/Ethereum-Logo-PNG-HD-Image.png"
                            alt=""
                            className="eth-img"
                          />{" "}
                          &nbsp; <p>1 ETH</p>
                        </span>
                        <br />
                        <button>Report</button>
                      </div>
                    </div>
                  </Modal>
                </p>
              </div>
            </div>
          </div>

          <div className="wrapper" data-aos="flip-down" data-aos-delay="200">
            <div className="card">
              <img src="https://wallpaperaccess.com/full/8054247.jpg" alt="" />

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
                        <br />{" "}
                        <span>
                          <img
                            src="https://www.pngall.com/wp-content/uploads/10/Ethereum-Logo-PNG-HD-Image.png"
                            alt=""
                            className="eth-img"
                          />{" "}
                          &nbsp; <p>1 ETH</p>
                        </span>
                        <br />
                        <button>Report</button>
                      </div>
                    </div>
                  </Modal>
                </p>
              </div>
            </div>
          </div>

          <div className="wrapper" data-aos="flip-down" data-aos-delay="200">
            <div className="card">
              <img src="https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/news/2022/01_27_space/space_cover.jpg" alt="" />

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
                        <br />{" "}
                        <span>
                          <img
                            src="https://www.pngall.com/wp-content/uploads/10/Ethereum-Logo-PNG-HD-Image.png"
                            alt=""
                            className="eth-img"
                          />{" "}
                          &nbsp; <p>1 ETH</p>
                        </span>
                        <br />
                        <button>Report</button>
                      </div>
                    </div>
                  </Modal>
                </p>
              </div>
            </div>
          </div>

          <div className="wrapper" data-aos="flip-down" data-aos-delay="200">
            <div className="card">
              <img src="https://www.fastcompanyme.com/wp-content/uploads/2022/05/890286E3-3845-4515-BFBD-290AABF1BA30.jpeg" alt="" />

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
                        <br />{" "}
                        <span>
                          <img
                            src="https://www.pngall.com/wp-content/uploads/10/Ethereum-Logo-PNG-HD-Image.png"
                            alt=""
                            className="eth-img"
                          />{" "}
                          &nbsp; <p>1 ETH</p>
                        </span>
                        <br />
                        <button>Report</button>
                      </div>
                    </div>
                  </Modal>
                </p>
              </div>
            </div>
          </div>
    </div>
  );
};

export default Card;
