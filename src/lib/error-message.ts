export function getErrorMessage(error: unknown, fallback = "Unknown error") {
  if (!(error instanceof Error)) {
    return fallback
  }

  const fatalLine = error.message
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line.startsWith("Error querying the database:"))

  if (fatalLine) {
    return fatalLine
  }

  return error.message.split("\n").map((line) => line.trim()).find(Boolean) ?? error.name
}

const warningCache = new Set<string>()

export function warnOnce(message: string) {
  if (warningCache.has(message)) return

  warningCache.add(message)
  console.warn(message)
}
