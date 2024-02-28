import { Carousel } from "antd";

const _Carousel = ({ foto, width, contentStyle, height }) => {
  return (
    <Carousel
      autoplay
      foto={foto}
      style={{ width: width, height: height, marginBottom: "20px" }}
    >
      <div>
        <h3 style={contentStyle}>
          <img src={foto[0]} style={{ width: width }} />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          {" "}
          <img src={foto[1]} style={{ width: width }} />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          {" "}
          <img src={foto[2]} style={{ width: width }} />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          {" "}
          <img src={foto[3]} style={{ width: width }} />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          {" "}
          <img src={foto[4]} style={{ width: width }} />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          {" "}
          <img src={foto[5]} style={{ width: width }} />
        </h3>
      </div>
    </Carousel>
  );
};
export default _Carousel;
