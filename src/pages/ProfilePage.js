import React from 'react';
import styles from "./ProfilePage.module.css"
import ProfileUser from "../components/organisms/profile/ProfileUser";
import PersonInfoForm from "../components/organisms/personInfoForm/PersonInfoForm";
import PasswordForm  from "../components/organisms/passwordForm/PasswordForm";

function ProfilePage(){


    return(
        <div className={styles.profile}>
            <ProfileUser/>
            <PersonInfoForm
                firstName={true}
                lastName={true}
                username={false}
                email={true}
                dateOfBirth={true}/>
            <PasswordForm minLengthPassword={6}/>
        </div>
    );
}


export default ProfilePage;
