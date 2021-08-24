* Notes:
	1. In the RaspberryPi machine, you may run commands with `sudu` privillage

* In order to create package-lock.json:
	1. Run `npm i` in the RaspberryPI platform
	2. By that a file named `package-lock.josn` will be created
	2. Push to repository
	3. Pull to the local PC from the repository

* If you need to add a new package:
	1. Run `npm i` to add needed packages to `package-lock.json`
	2. Made your changes on code
	3. Push to the repository
	4. Go to RaspberryPI platform then do pull from repository
	5. Run `npm ci` to install the missed pacakges

* How to run the project:
	1. npm run build
	2. start using:
		- npm run start -- --command=cooler --args=periodically
		- npm run start -- --command=cooler --args=set-on
		- npm run start -- --command=cooler --args=set-off<br/>
		
		- npm run start -- --command=rig --args=group-a,reset
		- npm run start -- --command=rig --args=group-b,reset
		- npm run start -- --command=rig --args=group-a,set-on
		- npm run start -- --command=rig --args=group-b,set-on
		- npm run start -- --command=rig --args=group-a,set-off
		- npm run start -- --command=rig --args=group-b,set-off
		

		- npm run start -- --command=board --args=reset


		- npm run start -- --command=internet --args=none


		- npm run start -- --command=motion --args=none
