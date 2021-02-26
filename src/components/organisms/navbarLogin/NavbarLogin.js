import React from "react";
import "../navbarLogin/NavbarLogin.css"
import { useAuthState } from "../../../context/authContext/AuthContext";
import { NavigationBar } from "../../atoms/navigationBar/NavigationBar";
import { PageNavLink } from "../../molecules/pageNavLink/PageNavLink";

function NavbarLogin() {

    // const history = useHistory();
    const { isAuthenticated , logout} = useAuthState();

    console.log(isAuthenticated);
    return (
        <NavigationBar class="nb">
            <PageNavLink exact link="/">Home</PageNavLink>
            {isAuthenticated && (
                <>
                    <PageNavLink exact link="/logout"
                                 onClick={logout}>
                                Logout
                    </PageNavLink>
                </>
            )}
            {!isAuthenticated && (
                <>
                <PageNavLink exact link="/login">Login</PageNavLink>
                <PageNavLink exact link="/signup">Signup</PageNavLink>
                </>
            )}
        </NavigationBar>
    );
}

export default NavbarLogin;
