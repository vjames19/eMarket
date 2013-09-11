# eMarket

DataBase Class Project.

## Docs
Links to docs go here.

## Prerequisites
* Node.js - Download and Install [Node.js](http://www.nodejs.org/download/). You can also follow [this gist](https://gist.github.com/isaacs/579814) for a quick and easy way to install Node.js and npm
* Bower - [bower](https://github.com/bower/bower)
* Grunt - [grunt-cli](http://gruntjs.com/getting-started)
* nodemon - [nodemon](https://github.com/remy/nodemon)
* Make sure you install bower, grunt-cli and nodemon globally using `npm install -g bower grunt-cli nodemon`.

## Quick Install

 The quickest way to get started with eMarket is to utilize it like this:

  Clone & Run:

    git clone https://github.com/vjames19/eMarket.git
    cd eMarket
    npm install
    bower install
    grunt

  We recommend using [Grunt](https://github.com/gruntjs/grunt-cli) to start the server:

    grunt

  Then open a browser and go to:

    http://localhost:9000

## Configuration
All configuration is specified in the [config](config/) folder, particularly the [config.js] 
(config/config.js) file.

### Environmental Settings
To run with a different environment, just specify NODE_ENV as you call grunt:

  $ NODE_ENV=test grunt

## Code Style
`indent_style = space`

`indent_size = 2`

`continuation_indent_size = 4`

`end_of_line = lf`

`charset = utf-8`

`trim_trailing_whitespace = true`

`insert_final_newline = true`

Javascript style guide - [style guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)

## Contributing
TODO: Specify commiting rules and format.
