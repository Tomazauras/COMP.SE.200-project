# COMP.SE.200-project

Repository for a uni assignment

Tests are done using mocha and chai packages
To run tests locally follow these steps:

1. clone the repository to your local environment

2. feel free to use your favorite IDE, project tested on visual studio code version 1.85.0

3. open the integrated shell and run the command `npm install` to intall all project dependencies

4. after the dependencies have been installed you can run the tests by running the command `npm run test`

To get tests coverage follow further steps:

5. after running the tests you can run the command `npm run coverage`, which will generate test reports using mochawesome in html and json formats.
   You can find these reports in the newly created directory mochawesome-report

6. now open the html version of the report using a browser to view test reults
   WARNING! Don't move the html file out of the folder as it uses app.js script in the ./assets subdirectory to show the html file. Otherwise the page will be blank.
