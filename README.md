## Requirements

Node version 14.x.x LTS or above.
TypeScript version 4.1.3 or above.
Also, you need to install type definitions for node with: 
`npm i --save-dev @types/node`

## Runing
First, transpile the TypeScript (TS) file with:
`tsc -t es5 .\cinema_booking.ts`

And then running the compiled JavaScript (JS) example file with:
`node .\cinema_booking.js .\booking_requests`
In this case the second argument of the node command is the path of the file to be processed.