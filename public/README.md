# Markdown renderer/evaluator for fun.ts

This project contains a Markdown renderer capable of identifying code blocks in a file and execute them, capturing the output and displaying it next to the code that was executed.

## Plan

* Extend a basic markdown renderer (eg. showdown)
* Provide a plug-in for handling code blocks that does the following:
  * Captures the code of a given block
  * Does the required plumbing for capturing the console output
  * Passes the captured code to the TypeScript compiler (if the code is TypeScript)
  * Execute the captured code (JS) or compiled code (output from the compilation step, if TS)
  * Renders the output of the execution next to the code block

