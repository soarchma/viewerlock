import { useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ComputerIcon from "@mui/icons-material/Computer"; // SHBAEK
import { ChartBar as ChartBarIcon } from "../icons/chart-bar"; // SHBAEK
import { Cog as CogIcon } from "../icons/cog"; // SHBAEK
import { Lock as LockIcon } from "../icons/lock";
import { Selector as SelectorIcon } from "../icons/selector"; // SHBAEK
import { ShoppingBag as ShoppingBagIcon } from "../icons/shopping-bag";
import { User as UserIcon } from "../icons/user";
import { UserAdd as UserAddIcon } from "../icons/user-add";
import { Users as UsersIcon } from "../icons/users";
import { XCircle as XCircleIcon } from "../icons/x-circle";
import { Logo } from "./logo";
import { NavItem } from "./nav-item";
import { Bell as BellIcon } from "../icons/bell"; // SHBAEK
import { Clock as ClockIcon } from "../icons/clock"; // SHBAEK
import { Download as DownloadIcon } from "../icons/download";
import { Facebook as FacebookIcon } from "../icons/facebook";
import { Google as GooglekIcon } from "../icons/google";
import { Menu as MenuIcon } from "../icons/menu"; // SHBAEK

const items = [
  {
    href: "/",
    icon: <ChartBarIcon fontSize="small" />,
    title: "대시보드",
  },
  {
    href: "/products",
    icon: <ShoppingBagIcon fontSize="small" />,
    title: "생산설비",
    nested: [
      {
        href: "/eqpt-shape",
        icon: null,
        title: "자동성형기",
      },
      {
        href: "/eqpt-leak",
        icon: null,
        title: "리크측정기",
      },
      {
        href: "/eqpt-assemble",
        icon: null,
        title: "자동조립기",
      },
    ],
  },
  {
    href: "/system",
    icon: <ComputerIcon fontSize="small" />,
    title: "시스템 정보",
  },
  // {
  //   href: "/settings",
  //   icon: <CogIcon fontSize="small" />,
  //   title: "Settings",
  // },
  // {
  //   href: "/account",
  //   icon: <UserIcon fontSize="small" />,
  //   title: "Account",
  // },
  // {
  //   href: "/login",
  //   icon: <LockIcon fontSize="small" />,
  //   title: "Login",
  // },
  // {
  //   href: "/register",
  //   icon: <UserAddIcon fontSize="small" />,
  //   title: "Register",
  // },
  // {
  //   href: "/404",
  //   icon: <XCircleIcon fontSize="small" />,
  //   title: "Error",
  // },
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  // console.log("sidebar");

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink href="/" passHref>
              <a>
                {/* <Logo
                  sx={{
                    height: 42,
                    width: 42,
                  }}
                /> */}
                <img src="static/logo.png"></img>
              </a>
            </NextLink>
          </Box>
          <Box sx={{ px: 2 }}>
            {/* <Box
              sx={{
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                px: 3,
                py: "11px",
                borderRadius: 1,
              }}
            >
              <div>
                <Typography color="inherit" variant="subtitle1">
                  Acme Inc
                </Typography>
                <Typography color="neutral.400" variant="body2">
                  Your tier : Premium
                </Typography>
              </div>
              <SelectorIcon
                sx={{
                  color: "neutral.500",
                  width: 14,
                  height: 14,
                }}
              />
            </Box> */}
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
              nested={item.nested}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: "#2D3748" }} />
        <Box
          sx={{
            px: 2,
            py: 3,
          }}
        >
          <Typography color="neutral.400" variant="body2">
            ViewerLock v1.0.1
          </Typography>
          {/* <Typography
            color="neutral.100"
            variant="subtitle2"
          >
            Need more features?
          </Typography>
          <Typography
            color="neutral.500"
            variant="body2"
          >
            Check out our Pro solution template.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              mt: 2,
              mx: 'auto',
              width: '160px',
              '& img': {
                width: '100%'
              }
            }}
          >
            <img
              alt="Go to pro"
              src="/static/images/sidebar_pro.png"
            />
          </Box>
          <NextLink
            href="https://material-kit-pro-react.devias.io/"
            passHref
          >
            <Button
              color="secondary"
              component="a"
              endIcon={(<OpenInNewIcon />)}
              fullWidth
              sx={{ mt: 2 }}
              variant="contained"
            >
              Pro Live Preview
            </Button>
          </NextLink> */}
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
