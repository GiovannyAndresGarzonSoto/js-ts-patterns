import * as fs from 'fs'
import * as path from 'path'

class Logger {
  private static instance: Logger
  private logs: string[] = []
  private logFilePath: string

  private constructor() {
    this.logFilePath = path.join(__dirname, 'app.log')
  }

  // Método estático para obtener la instancia única (Singleton)
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger()
    }
    return Logger.instance
  }

  // Método para agregar logs
  public log(message: string): void {
    const timestamp: string = new Date().toISOString()
    const logMessage: string = `${timestamp} - ${message}`

    this.logs.push(logMessage)
    console.log(logMessage) // Imprime el log en la consola

    // Guardar el log en un archivo
    fs.appendFileSync(this.logFilePath, logMessage + '\n', 'utf8')
  }

  // Método para imprimir el número de logs
  public printLogCount(): void {
    console.log(`${this.logs.length} logs have been recorded.`)
  }

  // Método para leer los logs desde el archivo
  public readLogsFromFile(): void {
    const logsFromFile: string = fs.readFileSync(this.logFilePath, 'utf8')
    console.log(logsFromFile)
  }
}

// Uso del Singleton Logger
const logger1 = Logger.getInstance()
logger1.log("First log entry")

const logger2 = Logger.getInstance()
logger2.log("Second log entry")

// Verificamos que ambas instancias son la misma
console.log(logger1 === logger2) // true

// Imprimimos el número de logs registrados
logger1.printLogCount() // 2 logs have been recorded

// Leer logs desde el archivo
logger1.readLogsFromFile()
