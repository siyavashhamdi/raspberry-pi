In order to create package-lock.json:
    1. Run `npm i` in the RaspberryPI platform
    2. By that a file named `package-lock.josn` will be created
    2. Push to repository
    3. Pull to the local PC from the repository

If you need to add a new package:
    1. Run `npm i` to add needed packages to `package-lock.json`
    2. Made your changes on code
    3. Push to the repository
    4. Go to RaspberryPI platform then do pull from repository
    5. Run `npm ci` to install the missed pacakges
