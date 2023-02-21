import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { AuthGuard } from "./auth-guard";
import { DashboardNavbar } from "./dashboard-navbar";
import { DashboardSidebar } from "./dashboard-sidebar";

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 280,
  },
}));

export const DashboardLayout = (props) => {
  const { children } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  // const [ws, setWs] = useState(null);
  // console.log("========> layout:", children.props);

  // useEffect(() => {
  //   // children.props.test2 = "12345";  // readonly error
  //   let ws = new WebSocket("ws://host.docker.internal:8070");
  //   setWs(ws);
  //   // console.log(ws);
  //   ws.onclose = (ev) => {
  //     console.log("onclose", ev);
  //   };
  //   ws.onerror = (ev) => {
  //     console.log("onerror", ev);
  //   };
  //   ws.onmessage = (ev) => {
  //     console.log("onmessage", ev);
  //   };
  //   ws.onopen = (ev) => {
  //     console.log("onopen", ev);
  //   };
  // }, []);

  // useEffect;

  return (
    <AuthGuard>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} user={children.props.user} />
      <DashboardSidebar onClose={() => setSidebarOpen(false)} open={isSidebarOpen} />
    </AuthGuard>
  );
};
