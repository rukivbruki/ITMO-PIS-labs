1. Install docker 
2. Install jdk
3. Go to https://www.jenkins.io/doc/book/installing/docker/#setup-wizard and follow initial steps
   ### Important -- initial jenkins password is not located in docker logs. It can be found at $JENKINS_HOME/secrets/initialAdminPassword
   ### To proceed, execute -- docker exec -it <container_id> /bin/bash and cat the forementioned file.
4. setup Jenkins via browser interface
   ### NOTE: Jenkinsfile at root of this directory was used to setup the job.

 # Task: 
 ## the tests are run after all the initial setup for project:
1. Docker is run
2. All the dependencies loaded
3. Test run
4. Test result can be obtained by checking output console