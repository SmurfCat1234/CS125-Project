"# CS125-Project" 

to run it: 
download the zip,



cd into the sleeptracker directory


run:

npm install

npm install -g @ionic/cli
npm install sklearn

Make sure you have Node.js and Python 3 installed and in your PATH.

    node >= 14
    python >= 3.7

In python land, install numpy and scikit-learn either globally via pip or via your favorite virtualenv manager. The shell running your Node.js program will need access to these python modules, so if you're using a virtualenv, make sure it's activated.

If you're not sure what this means, it's okay. First install python, which will also install pip, python's package manager. Then run:

pip install numpy scikit-learn



when everything in the dependency is successfully installed, run this to start it:

ionic serve


the default port it uses is 8100, so the app will run at: 

localhost:8100


