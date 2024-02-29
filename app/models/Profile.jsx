import { createRealmContext } from "@realm/react";
import Realm from "realm";

export class Profile extends Realm.Object {
    static schema = {
        name: "Profile",
        properties: {
            _id: "objectId",
            firstName: "string?",
            lastName: "string?",
            dateOfBirth: "date?",
            gender: "int?",
            image: "string?",
            password: "string",
            email: { type: "string", indexed: "full-text" },
            accessToken: "string",
            refreshToken: "string",
        },
        primaryKey: "_id",
    };
}

const config = {
    schema: [Profile],
    // Increment the 'schemaVersion', since 'lastName' has been removed from the schema.
    // The initial schemaVersion is 0.
    schemaVersion: 2,
};
// pass the configuration object with the updated 'schemaVersion' to createRealmContext()
const { RealmProvider } = createRealmContext(config);

// Realm.open({ schema: [Profile], deleteRealmIfMigrationNeeded: true });
