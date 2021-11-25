pipeline {
  agent any
  
  stages {
    stage('Front-end') {
      steps {
        sh 'cd client && npm install'
        sh 'cd client && npm run build'
      }
    }
    
    stage('Back-end') {
      steps {
        sh 'cd server && npm install'
        sh 'sudo su root && sudo pm2 restart 4'
        sh 'service nginx reload'
      }
    }
  }
}
