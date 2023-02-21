import { useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Button, ListItem } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StarBorder from "@mui/icons-material/StarBorder";

export const NavItemNested = (props) => {
  const { href, icon, title, nested, ...others } = props;
  const router = useRouter();
  const active = href ? router.pathname === href : false;

  // const [open, setOpen] = useState(true);
  // const handleClick = () => {
  //   console.log(open);
  //   setOpen(!open);
  // };

  return (
    <>
      <NextLink key={title} href={href} passHref>
        <ListItemButton
          sx={{
            // pl: 4,
            backgroundColor: active && "rgba(255,255,255, 0.08)",
            borderRadius: 1,
            color: active ? "secondary.main" : "neutral.300",
            fontWeight: active && "fontWeightBold",
            justifyContent: "flex-start",
            px: 3,
            textAlign: "left",
            textTransform: "none",
            width: "100%",
            "& .MuiButton-startIcon": {
              color: active ? "secondary.main" : "neutral.400",
            },
            "&:hover": {
              backgroundColor: "rgba(255,255,255, 0.08)",
            },
          }}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          {/* <ListItemText primary={title} /> */}
          <Box sx={{ flexGrow: 1 }}>{title}</Box>
        </ListItemButton>
      </NextLink>
    </>
  );
};

NavItemNested.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string,
};
