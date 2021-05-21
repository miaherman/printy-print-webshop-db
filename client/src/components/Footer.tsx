import IconButton from "@material-ui/core/IconButton";
import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div>
            <Link style={{ color: "inherit" }} to="/admin">
            <IconButton aria-label="" color="inherit">
                Admin
            </IconButton>
          </Link>
        </div>
    );
};

export default Footer;