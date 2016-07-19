--Google Extension readme--
1. Open the "manifest.json" file and change url to match your own url (Make sure it leads exactly to paGO (ex: index.php?option=com_pago) )

2. Open the "script.js" file and change the values of "joomlaAdminUser" and "joomlaAdminPsw" variables to be equivalent to the correct credentials to login

3. Start up Cypress, run a project, run Cypress's Chrome, go to the extensions page in chrome, activate developer mode, click on "Load unpacked Extension..." and load the "paGO auto-login extension". 

4. Everything should be fine after that.

--Runing the CI (MUST BE DONE IN TERMINAL)--
1. Go to the project directory that you want to run.

2. Once you are there you can start up the test with: "cypress run"

--Running Headless (MUST BE DONE IN TERMINAL)--
1. If you wanna run completely headless go into the current project directory

2. Type: "cypress get:key"

3. Copy the key that it outputs.

4. Then type: "cypress ci [whatever-the-key-you-recieved-was]"
