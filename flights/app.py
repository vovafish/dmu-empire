from flask import Flask,render_template,request
from utils import *
import datetime
from flask import g  
import joblib as jl
import traceback


app = Flask(__name__)

@app.route('/hello')
def hello_world():
    return 'Hello, my website'

@app.route('/', methods=['GET','POST'])
def index():
    if is_user_already_login()==False:
        email = request.form.get('email_text')
        password = request.form.get('password_text')
    else:
        email,password = get_login_user_info()
    print('email=',email)
    print('password=',password)
    if email!=None and password!=None:
        if is_auth_success(email, password)==True:
            user_login(email,password)
            if is_admin_by_email(email)==True:
                print('admin to main page')
                return render_template('main.html', fadb=True)
            else:
                return render_template('main.html')
        else:
            msgs = "email or password error"
            return render_template('index.html',msg=msgs)
    else:
        msgs = "init"
        return render_template('index.html',msg=msgs)

@app.route('/index', methods=['GET','POST'])
def index2():
    return index()


@app.route('/main', methods=['GET','POST'])
def main():
    return render_template('main.html', fadb=True)


@app.route('/search1', methods=['GET','POST'])
def search1(msg=None):
    email,password = get_login_user_info()
    from_text = request.form.get('from_text')
    to_text = request.form.get('to_text')
    if from_text==None:
        from_text = "None"
    if to_text==None:
        to_text = "None"
    print("from_text: ", from_text)
    print("to_text: ", to_text)
    values_all = get_flights_by_location(fromloc=from_text, endloc=to_text)
    
    ratio = 1
    if is_vip_by_email(email)==True:
        ratio = 0.8
    print("is_vip_by_email(email)=",is_vip_by_email(email))
    values_all_2 = []
    for v in values_all:
        v['price'] = ratio*v['price']
        values_all_2.append(v)
    values_all = values_all_2
    g.values_all = values_all
    jl.dump(values_all, 'values_all.jl')
    if from_text==None:
        from_text = ''
    if to_text==None:
        to_text = ''
    print('search msg=',msg)
    return render_template('search1.html', values=values_all, value_from_text=from_text, value_to_text=to_text, msg=msg)


@app.route('/search', methods=['GET','POST'])
def search():
    #return render_template('searchmenu.html')
    return search1()

@app.route('/Flight_information_modification_deletion', methods=['GET','POST'])
def Flight_information_modification_deletion():
    msg = ''
    try:
        flightnum = request.form.get('flightnumber')
        fromlocation = request.form.get('fromlocation')
        endlocation = request.form.get('endlocation')
        startdate = request.form.get('startdate')
        enddate = request.form.get('enddate')
        price = request.form.get('price')
        seats = request.form.get('seats')
        isdelete = request.form.get('isdelete')

        print("fromlocation = {0}".format(fromlocation))
        print("endlocation = {0}".format(endlocation))
        print("startdate = {0}".format(startdate))
        print("enddate = {0}".format(enddate))
        print("price = {0}".format(price))
        print("seats = {0}".format(seats))  
        print("isdelete = {0}".format(isdelete))  
        if fromlocation!=None and endlocation!=None and startdate!=None and \
            enddate!=None and price!=None and seats!=None and flightnum!=None:
            startdate = datetime.datetime.strptime(startdate, '%Y-%m-%dT%H:%M')
            enddate = datetime.datetime.strptime(enddate, '%Y-%m-%dT%H:%M')
            print("startdate datetime = {0}".format(startdate))
            print("enddate datetime = {0}".format(enddate))
            price = float(price)
            seats = int(seats)
            if enddate<=startdate:
                msg = "ERROR: end date less than start date."
            else:
                if isdelete=='Yes':
                    print('isdelete=',isdelete)
                    delete_flight_info(flightnum,fromlocation,endlocation)
                else:
                    x = update_flight_info(flightnum,fromlocation,endlocation,startdate,enddate,price,seats)
                    if x==1:
                        msg = 'success'
                    else:
                        msg = 'not match'
    except:
        msg = 'invalid input'
    return render_template('Flight_information_modification_deletion.html', msg=msg)






@app.route('/System_operation_status_display', methods=['GET','POST'])
def System_operation_status_display():
    return render_template('System_operation_status_display.html')

@app.route('/Administrator deletes/modifies user information', methods=['GET','POST'])
def Administrator_deletes_modifies_user_information():
    return render_template('Administrator_deletes_modifies_user_information.html')


@app.route('/buy', methods=['GET','POST'])
def buy():
    try:
        email,password = get_login_user_info()
        flightnum = request.form.get('flightnumber')
        print("bbb flightnum=",flightnum)
        option = request.form.getlist('options')
        if option!=[]:
            
            print("option=", option)
            values_all = jl.load('values_all.jl')
            option_n = int( option[0].replace('option','') ) - 1
            print("option_n=", option_n)
            print("values_all[n]=", values_all[option_n])
            jl.dump(values_all[option_n], 'buy.jl')
            # 'flightnum': 'BA00007-FC', 'fromlocation': 'London (LON)', 'endlocation': 'Tokyo (TYO)', 'starttime': datetime.datetime(2023, 5, 31, 9, 30), 'endtime': datetime.datetime(2023, 6, 1, 7, 20), 'price': 11066.0, 'seats': 20, 'num': 4}

            v = values_all[option_n]
            flightnum = v['flightnum']
            fromlocation = v['fromlocation']
            endlocation = v['endlocation']
            starttime = str(v['starttime'])
            endtime = str(v['endtime'])
            price = v['price']
            print("starttime=", starttime)
            print("endtime=", endtime)
            return render_template('buy.html', flightnum=flightnum, fromlocation=fromlocation, 
                                  endlocation=endlocation, starttime=starttime, 
                                   endtime=endtime, price=price, email=email, isp=True)
        else:
            v = jl.load('buy.jl')
            flightnum = v['flightnum']
            fromlocation = v['fromlocation']
            endlocation = v['endlocation']
            starttime = str(v['starttime'])
            endtime = str(v['endtime'])
            price = v['price']
            print("starttime=", starttime)
            print("endtime=", endtime)
            insert_buy_info(flightnum, fromlocation, endlocation, starttime, endtime, price, email)
            return render_template('buy.html', flightnum=flightnum, fromlocation=fromlocation, 
                                  endlocation=endlocation, starttime=starttime, 
                                   endtime=endtime, price=price, email=email,isp=False)
    except Exception as e:
        msg = traceback.format_exc()
        print(msg)
        return search1()

@app.route('/view_tokyo_to_london', methods=['GET','POST'])
def view_tokyo_to_london():
    return render_template('view_tokyo_to_london.html')


@app.route('/view_bangkok_to_paris', methods=['GET','POST'])
def view_bangkok_to_paris():
    return render_template('view_bangkok_to_paris.html')

@app.route('/buy_bangkok_to_paris', methods=['GET','POST'])
def buy_bangkok_to_paris():
    return render_template('buy_bangkok_to_paris.html')


@app.route('/register', methods=['GET','POST'])
def register():
    msgs = "register page"
    
    is_admin = False
    if is_user_already_login()==True:
        email,password = get_login_user_info()
        if is_auth_success(email, password)==True:
            is_admin = True
    usertype=''
    firstname = request.form.get('firstname')
    lastname = request.form.get('lastname')
    if is_admin==True:
        usertype = request.form.get('usertype')
    email = request.form.get('email')
    password = request.form.get('password')
    confirm_password = request.form.get('confirm_password')
    print('register firstname=',firstname)
    print('register usertype=',usertype)
    print('register email=',email)
    print('register password=',password)
    print('register confirm_password=',confirm_password)
    print('register is_admin=',is_admin)

    if firstname==None and email==None and password==None and confirm_password==None:
        msgs = 'init'
    else:
        if password!=confirm_password:
            msgs = 'ERROR: input password is not the same as confirm password '
        else:
            if firstname!=None and email!=None and password!=None and confirm_password!=None:
                if is_email_dup(email)==True:
                    msgs = "ERROR: email duplicated"
                else:
                    insert_user_info(firstname, lastname, email, password, usertype)
                    msgs = "SUCCESS: user info registed success"
            else:
                msgs = "ERROR: some content still None"
    return render_template('register.html', msg=msgs, isad=is_admin)

@app.route('/flightadd', methods=['GET','POST'])
def flightadd():
    flightnum = request.form.get('flightnumber')
    fromlocation = request.form.get('fromlocation')
    endlocation = request.form.get('endlocation')
    startdate = request.form.get('startdate')
    enddate = request.form.get('enddate')
    price = request.form.get('price')
    seats = request.form.get('seats')
    
    print("fromlocation = {0}".format(fromlocation))
    print("endlocation = {0}".format(endlocation))
    print("startdate = {0}".format(startdate))
    print("enddate = {0}".format(enddate))
    print("price = {0}".format(price))
    print("seats = {0}".format(seats))
    
    
    try:
        mg="insert success"
        if fromlocation!=None and endlocation!=None and startdate!=None and \
            enddate!=None and price!=None and seats!=None and flightnum!=None:
            startdate = datetime.datetime.strptime(startdate, '%Y-%m-%dT%H:%M')
            enddate = datetime.datetime.strptime(enddate, '%Y-%m-%dT%H:%M')
            print("startdate datetime = {0}".format(startdate))
            print("enddate datetime = {0}".format(enddate))
            price = float(price)
            seats = int(seats)
            if enddate<=startdate:
                mg = "ERROR: end date less than start date."
            else:
                insert_flight_info(flightnum,fromlocation,endlocation,startdate,enddate,price,seats)
        else:
            mg = "ERROR: all input should not be none"

        return render_template('flightadd.html', msg = mg)

    except Exception as e:
        print(e)
        return render_template('flightadd.html', msg = "exception, input again")


@app.route('/logout', methods=['GET','POST'])
def logout():
    user_logout()
    return index()









if __name__ == '__main__':
    app.run(debug=True)
