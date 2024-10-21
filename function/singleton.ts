const fs = require('fs')
const path = require('path')

const createLogger = () => {
  const logs = []
  const logFilePath = path.join(__dirname, 'app.log')

  const log = (message: string) => {
    const timestamp = new Date().toISOString()
    const logMessage = `${timestamp} - ${message}`
    
    logs.push(logMessage)
    console.log(logMessage) 
    
    fs.appendFileSync(logFilePath, logMessage + '\n', 'utf8')
  }

  const printLogCount = () => {
    console.log(`${logs.length} logs have been recorded.`)
  }

  const readLogsFromFile = () => {
    const logsFromFile = fs.readFileSync(logFilePath, 'utf8')
    console.log(logsFromFile)
  }

  return {
    log,
    printLogCount,
    readLogsFromFile
  }
}

const logger = createLogger()

logger.log("First log entry")
logger.log("Second log entry")
logger.printLogCount()
logger.readLogsFromFile()