# Authentiction 🔐

My Stack is using [KeyCloak](https://www.keycloak.org/) for identy and access management.

## Exporting Users

If you have created new users and you want them imported on startup of the my-stack-auth container follow the subsequent
description.

1. Connect to the docker container by executing `docker exec -it [CONTAINER] /bin/bash``
2. Navigate to the KeyCloak installation directory `cd /opt/keycloak``
3. Run the following command `sh ./bin/kc.sh export --users realm_file --dir ./data/import/`
