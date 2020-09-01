import React from "react";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: "#44b700",
        color: "#44b700",
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        "&::after": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            animation: "$ripple 1.2s infinite ease-in-out",
            border: "1px solid currentColor",
            content: '""',
        },
    },
    "@keyframes ripple": {
        "0%": {
            transform: "scale(.8)",
            opacity: 1,
        },
        "100%": {
            transform: "scale(2.4)",
            opacity: 0,
        },
    },
}))(Badge);

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        "& > *": {
            margin: theme.spacing(1, 1.5, 1, 0),
        },
    },
}));

const BadgeAvatars = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <StyledBadge
                overlap="circle"
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                variant="dot"
            >
                <Avatar
                    alt="Remy Sharp"
                    src="https://scontent.falg3-1.fna.fbcdn.net/v/t1.0-9/84527914_786980351814087_342786588343795712_o.jpg?_nc_cat=104&_nc_sid=09cbfe&_nc_eui2=AeF0_NbzRphzi2c9emlKP5TygDs1tC393ISAOzW0Lf3chAQN6lnvYCxoevxv0IWZ_V5io3rVxMvdBoTcQR6_Fjfk&_nc_ohc=PPITU6WDz-MAX8A7jQo&_nc_ht=scontent.falg3-1.fna&oh=b0fe36f853a6daaa1c8c61ff0fcdf839&oe=5F70E54F"
                />
            </StyledBadge>
        </div>
    );
};

export default BadgeAvatars;
