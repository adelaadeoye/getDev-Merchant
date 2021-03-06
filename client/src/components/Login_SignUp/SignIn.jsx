import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { connect } from "react-redux";
import {loginUser } from "../../redux/actions/SignInActions";

const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));


export const SignIn=props=> {
  const classes = useStyles();
  const initials={
    merch_email:"",
    merch_password:""
  }
  const [values,setValues] =useState({
    merch_email:"",
    merch_password:""
  })
 
  const handleChanges=e=>{
    e.preventDefault();
    setValues({...values,[e.target.name]:e.target.value})
  }
console.log(" I ma cus",props)

  const submit=(e)=>{
    
    e.preventDefault();
    console.log(values)
    props.loginUser(values,props.history,props.userType)
    setValues(initials)
    props.handleClose()

    }
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="email"
                label="Email Address"
                name="merch_email"
                autoComplete="email"
                value={values.merch_email}
                onChange={handleChanges}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="merch_password"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={values.merch_password}
                onChange={handleChanges}
              />

              <Grid container></Grid>
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submit}
          >
            Sign In
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    isFetching: state.signInReducer.isFetching,
    error: state.signInReducer.error
  };
}

export default connect(mapStateToProps, { loginUser })(SignIn);
