import classes from "./SignIn.module.css";

function SignIn(props) {
  return (
    <div>
      <div className={classes.header}>
        <h1 className={classes.logo}>Retail Management</h1>
        <h2 className={classes.name}>Administrator Log In</h2>
      </div>
      <div className={classes.login_register_container}>
        {props.isRegistering ? (
          <>
            <input
              type="email"
              placeholder="Email"
              value={props.registerInformation.email}
              onChange={(e) =>
                props.setRegisterInformation({
                  ...props.registerInformation,
                  email: e.target.value,
                })
              }
            />
            <input
              type="email"
              placeholder="Confirm Email"
              value={props.registerInformation.confirmEmail}
              onChange={(e) =>
                props.setRegisterInformation({
                  ...props.registerInformation,
                  confirmEmail: e.target.value,
                })
              }
            />
            <input
              type="password"
              placeholder="Password"
              value={props.registerInformation.password}
              onChange={(e) =>
                props.setRegisterInformation({
                  ...props.registerInformation,
                  password: e.target.value,
                })
              }
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={props.registerInformation.confirmPassword}
              onChange={(e) =>
                props.setRegisterInformation({
                  ...props.registerInformation,
                  confirmPassword: e.target.value,
                })
              }
            />
            <button
              className={classes.sign_in_register_button}
              onClick={props.handleRegister}
            >
              Register
            </button>
            <button
              className={classes.create_account_button}
              onClick={() => props.setIsRegistering(false)}
            >
              Go back
            </button>
          </>
        ) : (
          <>
            <input
              type="email"
              placeholder="Email"
              onChange={props.handleEmailChange}
              value={props.email}
            />
            <input
              type="password"
              onChange={props.handlePasswordChange}
              value={props.password}
              placeholder="Password"
            />
            <button
              className={classes.sign_in_register_button}
              onClick={props.handleSignIn}
            >
              Sign In
            </button>
            <button
              className={classes.create_account_button}
              onClick={() => props.setIsRegistering(true)}
            >
              Create an account
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default SignIn;
