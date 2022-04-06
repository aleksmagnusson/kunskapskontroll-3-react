import React from "react";
import { authState } from "../stores/authorization/atom";
import productState from "../stores/products/atom";
import { userState } from "../stores/users/atom";
import { Box, Image, Text, Grid, Button, Heading } from "@chakra-ui/react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { Link } from "react-router-dom";

function Admin() {
  // Hämta users och produkter.
  const products = useRecoilValue(productState);
  const users = useRecoilValue(userState);
  const { user } = useRecoilValue(authState);
  const reset = useResetRecoilState(authState);

  if (!user) {
    return (
      <Text align="center" fontSize="large" fontWeight="black">
        {" "}
        ⚠️ Admin need to log in to see data. ⚠️
      </Text>
    );
  }

  if (user.role === "user") {
    return (
      <Text marginTop="10px" align="center" fontSize="large" fontWeight="black">
        {" "}
        ⚠️ You do not have access to this data. ⚠️ <br /> Please contact Admin
      </Text>
    );
  }

  return (
    <Box border="1px">
      <Heading align="center"> Overview of products and users </Heading>
      <Button size="sm" _hover="primary" onClick={reset} as={Link} to="/">
        Log out
      </Button>
      {products.map((product) => {
        return (
          <Grid margin={4} xs={8} sm={4} md={2}>
            <Box border="1px" key={product.id} to={`/product/${product.id}`}>
              <Image width="15%" src={product.image} />
              <Text>{product.title}</Text>
              <Text>{product.price}</Text>
            </Box>
          </Grid>
        );
      })}

      {users.map((user) => {
        return (
          <Box>
            <Grid margin={4}>
              <Box key={users}>
                <Text>{user.email}</Text>
                <Text>{user.username}</Text>
                <Text>{user.password}</Text>
                <Text>{user.name.firstname}</Text>
                <Text>{user.name.lastname}</Text>
                <Text>{user.address.city}</Text>
                <Text>{user.address.street}</Text>
                <Text>{user.address.zipcode}</Text>
                <Text>{user.address.number}</Text>
                <Text>{user.phone}</Text>
              </Box>
            </Grid>
          </Box>
        );
      })}
    </Box>
  );
}

export default Admin;
