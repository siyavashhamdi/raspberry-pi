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

		- npm run start -- --command=sms --args=none <br/><br/>

* Set-up startup:
	1. Run command `npm i pm2 -g`
	2. Run `pm2 startup` then execute the result of the command (something like `sudo env PATH...`)
	3. Go to the project directory
	4. Run the following commands of node in order to add to pm2
		- pm2 start --name os_boot "npm run start -- --command=os --args=none"
		- pm2 start --name cooler_periodically "npm run start -- --command=cooler --args=periodically"
		- pm2 start --name internet_check "npm run start -- --command=internet --args=none"
		- pm2 start --name motion_check "npm run start -- --command=motion --args=none"
	5. Run `pm2 save -- force`
	6. You may use `pm2 monit` or `pm2 list` to see what is running in pm2
	7. You may use `pm2 delete N` or `pm2 delete all` to delete application(s) from pm2
	8. You may use `pm2 stop N` or `pm2 stop all` to stop application(s) from pm2

* TODO:
	- Convert `Utils.consoleLog` to a class named `logger`
	- Add section to run raspberry only on raspbian linux
