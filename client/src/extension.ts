'use strict'

import * as path from 'path'

import { ExtensionContext } from 'vscode'
import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from 'vscode-languageclient'

export function activate (context: ExtensionContext) {

  let serverModule = context.asAbsolutePath(path.join('server', 'server.js'))
  let debugOptions = { execArgv: ['--nolazy', '--debug=6009'] }

  let serverOptions: ServerOptions = {
    run : { module: serverModule, transport: TransportKind.ipc },
    debug: { module: serverModule, transport: TransportKind.ipc, options: debugOptions }
  }

  let clientOptions: LanguageClientOptions = {
    documentSelector: ['aoe2-rms']
  }

  let disposable = new LanguageClient('aoe2-rms', 'AoE2 RMS Language Server', serverOptions, clientOptions).start()

  // Push the disposable to the context's subscriptions so that the client can be deactivated on extension deactivation.
  context.subscriptions.push(disposable)
}
