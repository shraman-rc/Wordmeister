# Wordmeister

A small web app automatically spell checks and grades correctness of students' writing while they type.

## How to Run Locally:
- Make sure you are connected to the internet
- If you are using Chrome, you most likely need to start a local HTTP server for JSXTransformer to work. If you have Python, open your terminal and ```cd``` into the "Wordmeister" folder and run this command in the terminal/shell:
```sh
$ python -m SimpleHTTPServer
```
In your browser, navigate to ```localhost:8000``` (or whichever port your server is running on) and click on ```wordmeister.html``` in the list of files served
- If you are using Firefox (or any other browser), simply open the wordmeister.html file. However, the site looks best on Chrome.

### Citations:
- The underlying spell-check library is *not* my work. I use a simple, open source spell-check singleton known as "BJSpell," found on Google Code: https://code.google.com/p/bjspell/
- Real time updating and JSX compilation enabled by Facebook's React.js library (http://facebook.github.io/react/)
- Font "Libre Baskerville" provided by Google Fonts.

###### Submitted for the Amplify 2-hour Coding Project
