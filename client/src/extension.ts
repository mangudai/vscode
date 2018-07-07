import { join } from 'path'
import { ExtensionContext } from 'vscode'
import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from 'vscode-languageclient'

let client: LanguageClient

export function activate (context: ExtensionContext) {

  let serverModule = context.asAbsolutePath(join('server', 'out', 'server.js'))

  let serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: { module: serverModule, transport: TransportKind.ipc, options: { execArgv: ['--nolazy', '--inspect=6009'] } }
  }

  let clientOptions: LanguageClientOptions = {
    documentSelector: ['aoe2-rms']
  }

  client = new LanguageClient('aoe2-rms', 'AoE2 RMS Language Server', serverOptions, clientOptions)
  client.start()
}

export async function deactivate () {
  return client ? client.stop() : undefined
}
