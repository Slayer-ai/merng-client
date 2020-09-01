import { makeStyles } from "@material-ui/core/styles";

export const formStyle = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: "0",
        right: "0",
        bottom: "0",
    },
    paper: {
        width: "100%",
        backgroundColor: "#242526",
        maxWidth: "420px",
        borderRadius: "6px",
        overflow: "hidden",
    },
    formHeader: {
        margin: "20px 20px 0 20px",
        textAlign: "center",
    },
    header: {
        margin: "0",
    },
    icon: {
        backgroundColor: "#ff3d00",
        padding: "8px",
        fontSize: "42px",
        borderRadius: "50%",
        marginBottom: "5px",
    },
    form: {
        backgroundColor: "#242526",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "space-between",
        flexDirection: "column",
        padding: "20px",
    },
    field: {
        marginBottom: "20px",
    },
    submitButton: {
        padding: "10px",
        marginBottom: "20px",
        position: "relative",
    },
    link: {
        textAlign: "center",
    },
    spiner: {
        position: "absolute",
    },
    generalError: {
        color: "#ff3d00",
        marginBottom: "20px",
        textAlign: "center",
    },
}));
