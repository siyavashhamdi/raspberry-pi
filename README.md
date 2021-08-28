* Notes:
	1. In the RaspberryPi machine, you may run commands with `sudo` privillage

* How to run the project:
	1. git clone ...
	2. go to the cloned directory
	3. run command `npm i -f`
	4. npm run build
	5. start using one of the following:
		- npm run start -- --command=os --args=none <br/><br/>

		- npm run start -- --command=cooler --args=periodically
		- npm run start -- --command=cooler --args=set-on
		- npm run start -- --command=cooler --args=set-off <br/><br/>
		
		- npm run start -- --command=rig --args=group-a,reset
		- npm run start -- --command=rig --args=group-b,reset
		- npm run start -- --command=rig --args=group-a,set-on
		- npm run start -- --command=rig --args=group-b,set-on
		- npm run start -- --command=rig --args=group-a,set-off
		- npm run start -- --command=rig --args=group-b,set-off <br/><br/>
		
		- npm run start -- --command=board --args=reset <br/><br/>
		
		- npm run start -- --command=internet --args=none <br/><br/>
		
		- npm run start -- --command=motion --args=none <br/><br/>

* TODO:
	- Change `raspberry.ts` to `io.ts`
	- Convert `UtilsconsoleLog` to a class named `logger`
	- consoleLog must accept object. in order to show stringify of that object
	- Add section to run raspberry only on raspbian linux
