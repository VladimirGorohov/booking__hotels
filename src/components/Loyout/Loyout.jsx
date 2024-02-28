import _Header from "../Header/Header";
import _Footer from "../Footer/Footer";
import _Content from "../Content/Content";
import { Layout } from "antd";

const Loyout = () => {
  return (
    <Layout style={{ maxWidth: "1560px", margin: "0 auto" }}>
      <_Header />
      <Layout>
        <_Content />
      </Layout>
      <_Footer />
    </Layout>
  );
};

export default Loyout;
