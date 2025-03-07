import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

const App = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default App;
