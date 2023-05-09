import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Drawer from '@mui/material/Drawer';
import styles from './Dropdown.module.css'
import { ListItem, ListItemButton, Divider } from '@mui/material';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid success`,
        padding: '0 4px',
    },
}));

const divStyle = {
    "height": "12vh"
}

export default function Navbar() {

    const [isCookie, setCookie] = useState(false)
    const [Isdrawer, setdrawer] = useState(false)
    let navigate = useNavigate();

    useEffect(() => {
        checkcookie()
    }, [isCookie])

    function checkcookie() {
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            if (c.substring(0, 5) === "token") {
                setCookie(true)
                return
            }
        }
        setCookie(false)
    }

    function getcartproducts() {
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            if (c.substring(1, 5) === "cart") {
                return (JSON.parse(c.substring(6))).length
            }
        }
        return 0
    }

    function handlelogout() {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "cart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        checkcookie()
        navigate("../")
    }

    function handleDrawer() {
        Isdrawer ? setdrawer(false) : setdrawer(true)
    }

    function handlecourses() {
        navigate("../mycourses")
    }

    return (
        <div className="navbar-area">
            {/* <!-- navbar top start --> */}
            <div className="navbar-top">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 text-md-left text-center">
                            <ul>
                                {/* <!-- <li><p><i className="fa fa-map-marker"></i> 2072 Pinnickinick Street, WA 98370</p></li> --> */}
                                <li><p><i className="fa fa-envelope-o"></i>admin@bigbuddy.in</p></li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <ul className="topbar-right text-md-right text-center">
                                <li className="social-area">
                                    <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                                    <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                                    <a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                                    <a href="#"><i className="fa fa-pinterest" aria-hidden="true"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <nav className="navbar navbar-area-1 navbar-area navbar-expand-lg" style={divStyle}>
                <div className="container nav-container">
                    <div className="responsive-mobile-menu">
                        <button className="menu toggle-btn d-block d-lg-none" data-target="#edumint_main_menu"
                            aria-expanded="false" aria-label="Toggle navigation" onClick={handleDrawer}>
                            <span className="icon-left"></span>
                            <span className="icon-right"></span>
                        </button>
                    </div>
                    <div className="logo">
                        <Link to="../"><img src={require("../assets/img/header-logo.png")} width="250.75rem" alt="img" /></Link>
                    </div>
                    {/* <div className="nav-right-part nav-right-part-mobile">
                        <a className="signin-btn" href="signin">Sign In</a>
                        <a className="btn btn-base" href="signup">Sign Up</a>
                    </div> */}
                    <div className="collapse navbar-collapse" id="edumint_main_menu">
                        <ul className="navbar-nav menu-open">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="../course">Course</Link>
                                {/* <ul className="sub-menu">
                                    <li><a href="course">Course</a></li>
                                </ul> */}
                            </li>
                            {/* <li className="menu-item-has-children">
                                <a href="#">Pages</a>
                                <ul className="sub-menu">
                                    <li><Link to="../about">About Us</Link></li>
                                    <li><Link to="#">Event</Link></li>
                                    <li><Link to="#">Event Details</Link></li>
                                    <li><Link to="../team">Team</Link></li>
                                    <li><Link to="../team-details">Team Details</Link></li>
                                    <li><Link to="../pricing">Pricing</Link></li>
                                    <li><Link to="../gallery">Gallery</Link></li>
                                </ul>
                            </li> */}
                            {/* <li><Link to="../team">Team</Link></li> */}
                            <li><Link to="../about">About us</Link></li>
                            <li><Link to="../contact">Contact Us</Link></li>
                            <li><Link to="../applynow" >Apply Now</Link></li>
                        </ul>
                    </div>
                    <div className="nav-right-part nav-right-part-desktop">

                        {isCookie
                            ?
                            <div className={styles.dropdown}>
                                <a className={styles.dropbtn}>
                                    <IconButton>
                                        <AccountCircleIcon />
                                    </IconButton>
                                </a>
                                <div className={styles.dropdown_content}>
                                    <div onClick={handlelogout}>Logout</div>
                                    <div onClick={handlecourses}>My courses</div>
                                </div>
                            </div>
                            : <>
                                <Link className="signin-btn" to="../signin">Sign In</Link>
                                <Link className="btn btn-base" to="../signup">Sign Up</Link>
                            </>
                        }


                        <IconButton aria-label="cart" href={isCookie ? "../cart" : "../signin"}>
                            <StyledBadge badgeContent={getcartproducts()} color="success">
                                <ShoppingCartIcon />
                            </StyledBadge>
                        </IconButton>
                    </div>
                </div>
            </nav>
            <Drawer
                sx={{
                    width: "30vh",
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: "30vh",
                        boxSizing: 'border-box',
                    },
                }}
                anchor='right'
                open={Isdrawer}
                onClose={handleDrawer}
            >
                <>
                    <ListItem disablePadding>
                        <ListItemButton><Link to="/">Home</Link></ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton><Link to="../course">Course</Link></ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton><Link to="../about">About us</Link></ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton><Link to="../contact">Contact Us</Link></ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton><Link to="../applynow" >Apply Now</Link></ListItemButton>
                    </ListItem>
                    <Divider />
                    {isCookie
                        ?
                        <>
                            <ListItem disablePadding>
                                <ListItemButton><div onClick={handlelogout}>Logout</div></ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton><div onClick={handlecourses}>My courses</div></ListItemButton>
                            </ListItem>
                        </>
                        :
                        <>
                            <ListItem disablePadding>
                                <ListItemButton><Link to="../signin">Sign In</Link></ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton><Link to="../signup">Sign Up</Link></ListItemButton>
                            </ListItem>
                        </>
                    }
                    <ListItem disablePadding>
                        <ListItemButton><Link to={isCookie ? "../cart" : "../signin"}>Cart</Link></ListItemButton>
                    </ListItem>
                </>
            </Drawer>
        </div >
    )

}