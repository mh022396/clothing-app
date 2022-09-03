import SignUpForm from "../../components/sign-up-form/sign-up-form";
import SignInForm from "../../components/sign-in-form/sign-in-form";
import './authentication.styles.scss';

const Authentication = () => {

    return (
        <div>
            <h1>Sign In Page</h1>
            <div className="authentication-container">
                <SignInForm />
                <SignUpForm />
            </div>
        </div>
    );
}

export default Authentication;