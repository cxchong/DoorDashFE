import { Button, Drawer, List, message, Typography } from "antd";
import { useEffect, useState } from "react";
import { checkout, getCart } from "../utils";

const { Text } = Typography;

const MyCart = () => {
  const [cartVisible, setCartVisible] = useState(false);
  const [cartData, setCartData] = useState();
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);


  useEffect(() => {
    // side effect都放到useEffect里
    if (!cartVisible) {
      return;
    }

    // 加载的转圈
    setLoading(true);
    // API call；每个API call基本都这个套路
    getCart()
      .then((data) => {
        // 成功 -> 调整真正要调整的data
        setCartData(data);
      })
      .catch((err) => {
        // 失败 -> err message
        message.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [cartVisible]);
  const onCheckOut = () => {
    setChecking(true);
    checkout()
      .then(() => {
        message.success("Successfully checkout");
        setCartVisible(false);
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setChecking(false);
      });
  };

  const onCloseDrawer = () => {
    setCartVisible(false);
  };

  const onOpenDrawer = () => {
    setCartVisible(true);
  };
  return (
    <>
      <Button type="primary" shape="round" onClick={onOpenDrawer}>
        Cart
      </Button>
      <Drawer
        title="My Shopping Cart"
        onClose={onCloseDrawer}
        visible={cartVisible}
        width={520}
        footer={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Text strong={true}>{`Total price: $${cartData?.totalPrice}`}</Text>
            <div>
              <Button onClick={onCloseDrawer} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button
                onClick={onCheckOut}
                type="primary"
                loading={checking}
                disabled={loading || cartData?.orderItemList.length === 0}
              >
                Checkout
              </Button>
            </div>
          </div>
        }
      >
        <List
          loading={loading}
          itemLayout="horizontal"
          dataSource={cartData?.orderItemList}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.menuItem.name}
                description={`$${item.price}`}
              />
            </List.Item>
          )}
        />
      </Drawer>
    </>
  );
};

export default MyCart;




