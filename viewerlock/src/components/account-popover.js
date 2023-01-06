import { useContext } from "react";
import Router from "next/router";
import Link from "next/link";
import PropTypes from "prop-types";
import { Box, MenuItem, MenuList, Popover, Typography } from "@mui/material";
import { AuthContext } from "../contexts/auth-context";
import axios from "axios";
// import { useCookies } from "react-cookie";
// import { auth, ENABLE_AUTH } from "../lib/auth";

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open, user, ...other } = props;
  const authContext = useContext(AuthContext);
  // const [cookies, setCookie, removeCookie] = useCookies(["apiToken"]);

  const handleSignOut = async () => {
    onClose?.();

    // Check if authentication with Zalter is enabled
    // If not enabled, then redirect is not required
    // if (!ENABLE_AUTH) {
    //   return;
    // }

    // Check if auth has been skipped
    // From sign-in page we may have set "skip-auth" to "true"
    // If this has been skipped, then redirect to "sign-in" directly
    const authSkipped = globalThis.sessionStorage.getItem("skip-auth") === "true";

    if (authSkipped) {
      // Cleanup the skip auth state
      globalThis.sessionStorage.removeItem("skip-auth");

      // console.log("쿠키삭제", authContext.user);
      // removeCookie("apiToken");
      const response = await axios
        .post("./api/logout")
        .then((response) => {
          // Redirect to sign-in page
          // Router
          // .push("/sign-in")
          // .push("/login")
          // .catch(console.error);
          // return;
          return response;
        })
        .catch((err) => {
          if (err.response) {
            return err.response;
          } else if (err.request) {
            console.error("postCredential() - request:", err.request);
            return null;
          } else {
            console.error("postCredential() - message:", err.message);
          }
          console.error("postCredential() - config:", err.config);
          return null;
        });
    }

    try {
      // This can be call inside AuthProvider component, but we do it here for simplicity
      // await auth.signOut();
      // console.log("쿠키삭제");
      // removeCookie("apiToken");

      // Update Auth Context state
      authContext.signOut();

      // Redirect to sign-in page
      Router
        // .push("/sign-in")
        .push("/login")
        .catch(console.error);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { width: "300px" },
      }}
      {...other}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">Account</Typography>
        <Typography color="text.secondary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="text.secondary" variant="body1">
          <a target="_blank" rel="noopener noreferrer" href={"https://myaccount.google.com/"}>
            {user.email}
          </a>
        </Typography>
      </Box>
      <MenuList
        disablePadding
        sx={{
          "& > *": {
            "&:first-of-type": {
              borderTopColor: "divider",
              borderTopStyle: "solid",
              borderTopWidth: "1px",
            },
            padding: "12px 16px",
          },
        }}
      >
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};
