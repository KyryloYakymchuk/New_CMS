pipeline {
  agent any
  
  stages {
    stage('Front-end') {
      steps {
        sh 'cd /var/lib/jenkins/workspace/New_CMS/client'
        sh 'ls -a'
        sh 'npm install'
        sh 'npm run build'
      }
    }
    
    stage('Back-end') {
      steps {
        sh 'cd /var/lib/jenkins/workspace/New_CMS/server'
        sh 'npm i'
        sh 'pm2 restart 4'
        sh 'service nginx reload'
      }
    }
  }
}
