pipeline {
  agent any
  
  stages {
    stage('Front-end') {
      steps {
        sh 'cd /client'
        sh 'npm i'
        sh 'npm run build'
      }
    }
    
    stage('Back-end') {
      steps {
        sh 'cd /server'
        sh 'npm i'
        sh 'pm2 restart 4'
        sh 'service nginx reload'
      }
    }
  }
}
