from flask import Flask, request, render_template, redirect, url_for

app = Flask(__name__)

# Simulated user database
database = {'wuj2264831': '9360832153', 'wuj2156832': '8248901129', 'wuz1507012': '9363085830'}

@app.route('/')
def hello_world():
    return render_template("login.html")

@app.route('/form_login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        name1 = request.form.get('username')
        pwd = request.form.get('password')

        # Check if username or password is empty
        if not name1 or not pwd:
            return render_template('login.html', info='Please enter both username and password')

        # User validation
        if name1 not in database:
            return render_template('login.html', info='Invalid Username')
        elif database[name1] != pwd:
            return render_template('login.html', info='Invalid Password')
        else:
            return render_template('home.html', name=name1)

    # If the request method is GET, redirect to the login page
    return redirect(url_for('hello_world'))

if __name__ == '__main__':
    app.run(debug=True,port=5001)
