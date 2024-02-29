import Realm from "realm";
import { useQuery, useRealm } from "@realm/react";
import { Profile } from "../models/Profile";

export const addProfile = (firstName, lastName, dateOfBirth, gender, image, password, email, accessToken, refreshToken) => {
    const realm = useRealm();

    realm.write(() => {
        realm.create(Profile, {
            _id: new BSON.ObjectId(),
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
            gender: gender,
            image: image,
            password: password,
            email: email,
            accessToken: accessToken,
            refreshToken: refreshToken,
        });
    });
};

export const deleteProfile = (profileToDelete) => {
    const realm = useRealm();
    
    const toDelete = realm.objects(Profile).filtered("email == $0", profileToDelete);
    realm.write(() => {
        realm.delete(toDelete);
    });
};

export const getProfile = () => {
    return useQuery(Profile);
};
