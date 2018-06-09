/* =========================================================================

    extension.ts
    Copyright(c) R-Koubou

   ======================================================================== */

'use strict';

import * as vscode from 'vscode';

export function activate( context: vscode.ExtensionContext ): void
{
    vscode.commands.registerCommand( 'text2mkdir.run', () => {

        // All editor is closed
        if( !vscode.window.activeTextEditor )
        {
            return;
        }

        const editor   = vscode.window.activeTextEditor;
        const document = vscode.window.activeTextEditor.document;
        if( !editor || !document )
        {
            return;
        }

        editor.edit( (eb: vscode.TextEditorEdit) => {
            for( let i = 0; i < document.lineCount; i++ )
            {
                const line = document.lineAt( i );
                let text   = line.text.trim();
                if( line.isEmptyOrWhitespace )
                {
                    continue;
                }
                text = "mkdir " + "\"" + text + "\"";
                eb.replace(
                    new vscode.Range( new vscode.Position( i, 0 ), new vscode.Position( i, Number.MAX_VALUE ) ),
                    text
                );
            }
        });
    });
}
