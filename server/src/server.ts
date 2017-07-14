'use strict'

import { IPCMessageReader, IPCMessageWriter, createConnection, IConnection,
  TextDocuments, TextDocument, Diagnostic, DiagnosticSeverity, InitializeResult } from 'vscode-languageserver'
import { parse, lint, TextSpanError } from 'mangudai'

// Create a connection for the server. The connection uses Node's IPC as a transport
let connection: IConnection = createConnection(new IPCMessageReader(process), new IPCMessageWriter(process))

// Create a simple text document manager. The text document manager
// supports full document sync only
let documents: TextDocuments = new TextDocuments()
// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection)

// After the server has started the client sends an initialize request. The server receives
// in the passed params the rootPath of the workspace plus the client capabilities.
connection.onInitialize((): InitializeResult => {
  return {
    capabilities: {
      // Tell the client that the server works in FULL text document sync mode
      textDocumentSync: documents.syncKind,
      // Tell the client that the server support code complete
      completionProvider: {
        resolveProvider: true
      }
    }
  }
})

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent((change) => {
  validateTextDocument(change.document)
})

function validateTextDocument (textDocument: TextDocument): void {
  let { ast, errors } = parse(textDocument.getText())
  let diagnostics: Diagnostic[] = []

  diagnostics.push(...errors.map(errorToDiagnostic))
  if (diagnostics.length === 0) diagnostics.push(...lint(ast).map(errorToDiagnostic))

  connection.sendDiagnostics({ uri: textDocument.uri, diagnostics })
}

function errorToDiagnostic (error: TextSpanError): Diagnostic {
  return {
    severity: DiagnosticSeverity.Error,
    range: {
      start: { line: error.boundaries.start.line - 1, character: error.boundaries.start.col },
      end: { line: error.boundaries.end.line - 1, character: error.boundaries.end.col }
    },
    message: error.message,
    source: error.name === 'LintError' ? 'rms-lint' : 'rms'
  }
}

connection.listen()
