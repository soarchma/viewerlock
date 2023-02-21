import { useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { NavItemNested } from "./nav-item-nested";
import { Box, Button, ListItem } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StarBorder from "@mui/icons-material/StarBorder";

export const NavItem = (props) => {
  const { href, icon, title, nested, ...others } = props;
  const router = useRouter();
  const active = href ? router.pathname === href : false;

  const [open, setOpen] = useState(true);
  const handleClick = () => {
    // console.log(open);
    setOpen(!open);
  };

  if (nested) {
    return (
      <>
        <ListItem
          disableGutters
          sx={{
            display: "flex",
            mb: 0.5,
            py: 0,
            px: 2,
          }}
          {...others}
        >
          {/* <NextLink href={href} passHref> */}
          <Button
            component="a"
            startIcon={icon}
            disableRipple
            sx={{
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
            onClick={handleClick}
          >
            <Box sx={{ flexGrow: 1 }}>{title}</Box>
            {open ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
          </Button>
          {/* </NextLink> */}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {nested.map((item) => (
              <NavItemNested
                key={item.title}
                icon={item.icon}
                href={item.href}
                title={item.title}
              />
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <>
      <ListItem
        disableGutters
        sx={{
          display: "flex",
          mb: 0.5,
          py: 0,
          px: 2,
        }}
        {...others}
      >
        <NextLink href={href} passHref>
          <Button
            component="a"
            startIcon={icon}
            disableRipple
            sx={{
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
            <Box sx={{ flexGrow: 1 }}>{title}</Box>
          </Button>
        </NextLink>
      </ListItem>
    </>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string,
};
