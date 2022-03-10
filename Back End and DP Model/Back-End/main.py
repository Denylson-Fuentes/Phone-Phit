from flask import (
    Flask,
    redirect,
    url_for,
    render_template,
    request,
    session,
    flash,
    jsonify,
)
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, GRU
from tensorflow.keras.callbacks import TensorBoard
from tensorflow.keras.losses import CategoricalCrossentropy
from tensorflow.keras.optimizers import Adam
import numpy as np
import cv2
import mediapipe as mp
import sqlite3
from sqlite3 import Error
import os

model = Sequential()
model.add(GRU(32, return_sequences = True, activation = 'relu', input_shape = (120, 132)))
model.add(GRU(64, return_sequences = True, activation = 'relu'))
model.add(GRU(128, return_sequences = False, activation = 'relu'))
model.add(Dense(128, activation = 'relu'))
model.add(Dense(64, activation = 'relu'))
model.add(Dense(4, activation = 'softmax'))


currentDirectory = os.path.dirname(os.path.abspath(__file__))
DATABASE = currentDirectory + '/User_database.db'


app = Flask(__name__)
CORS(app)

@ app.route("/")
def hello_world():
    return "<p> Hello, Worlds!<p>"


mp_holistic = mp.solutions.holistic
mp_drawing = mp.solutions.drawing_utils

def mediapipe_detection(image, model):
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image.flags.writeable = False
    results = model.process(image)
    image.flags.writeable = True
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    return image, results

def draw_landmarks(image, results):
    mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_holistic.POSE_CONNECTIONS)

def extract_keypoints(results):
    pose = np.array([[res.x, res.y, res.z, res.visibility] for res in results.pose_landmarks.landmark]).flatten() if results.pose_landmarks else np.zeros(33*4)
    return pose

@ app.route("/predict", methods=["GET", "POST"])
def prediction():
    response = ""
    if request.method == "POST":
        video = request.get_data()

        with open('video.mp4', 'wb') as out:
            out.write(video)

        cap = cv2.VideoCapture('./video.mp4')
        sequences = []

        with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
            while cap.isOpened():
                ret, frame = cap.read()
                if ret == False:
                    break
                frame = cv2.resize(frame, (630, 540))

                image, results = mediapipe_detection(frame, holistic)
                draw_landmarks(image, results)

                pose = extract_keypoints(results)
                sequences.append(pose)

                cv2.imshow('Open CV Feed', image)

                if cv2.waitKey(10) & 0xFF == ord('q'):
                    break
            cap.release()
            cv2.destroyAllWindows()

        body_activations = np.array(['Total Body', 'Lower Body', 'Upper Body', 'Core'])

        model.load_weights('../Model/actions.h5')
        sequences = sequences[-120:]
        sequences = np.array(sequences)
        sequences = sequences.reshape((1, 120, 132))
        probabilites = model.predict(sequences)
        prediction = body_activations[np.argmax(probabilites[0])]
        print(prediction)
        return jsonify({"message": prediction})
    else:
        response = jsonify({'message': "GET request"})

    
    
    # model.load_weights('../Model/actions.h5')
    # predictions = model.predict()
    return response

@ app.route("/signup", methods=["POST"])
def signup():


    data = request.get_json()
    username = data['username']
    password = data['password']
    height_feet = data['height_feet']
    height_inches = data['height_inches']
    weight = data['weight']
    sign = data['sign']
    bench = data['bench_personal']
    squat = data['squat_personal']
    curl = data['curl_personal']
    mile_min = data['mile_minute']
    mile_sec = data['mile_seconds']
    workout_hrs = data['workout_total_hours']
    workout_min = data['workout_total_minutes']
    calories = data['calories_taken']
    last_meal = data['last_meal']
    last_fruit = data['last_fruit']
    last_vegetable = data['last_vegetable']
    print(data)
    user = (username, password)
    details = (username, height_feet, height_inches, weight, sign, bench, squat, curl, mile_min, mile_sec, workout_hrs, workout_min, calories, last_meal, last_fruit, last_vegetable)
    print(user, details)

    try:
        connection = sqlite3.connect('./Databases/Users_data.db')
        cur = connection.cursor()
        sql = """
              INSERT INTO Users
              VALUES ( ?, ? )
                """
        cur.execute(sql, user)

        sql = """
                INSERT INTO User_Details
                VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) 
                """

        cur.execute(sql, details)

        connection.commit()

        response = {'message': 'Signed Up'}
    except:
        response = {'message' : 'Error Has Occurred'}

    return jsonify(response)


@ app.route("/login", methods = ["GET"])
def login():
    username = request.args.get('username')
    print(username)
    password = request.args.get('password')
    print(password)

    # print(user)
    # print(DATABASE)
    try:
        connection = sqlite3.connect('./Databases/Users_data.db')
        cur = connection.cursor()

        sql = """
                SELECT * 
                FROM Users
                WHERE username = '{}' AND password = '{}'
                """.format(username, password)

        result = cur.execute(sql)
        result = result.fetchall()
        # print(result)

        if result:
            response = {'message' : 'Valid'}
        else:
            response = {'message' : 'Not Valid'}
    except:
        response = {'message' : 'Error has occurred!'}

    return response

@ app.route("/details", methods = ["GET"])
def getdetails():
    username = request.args.get('user')
    print("FROM DETAILS: {}".format(username))

    try:
        connection = sqlite3.connect('./Databases/Users_data.db')
        cur = connection.cursor()

        sql = """
                SELECT * 
                FROM User_Details
                WHERE username = '{}'
                """.format(username)

        result = cur.execute(sql)
        result = result.fetchall()

        if result:
            details = {'height_feet': result[0][1],
                       'height_inches': result[0][2],
                       'weight': result[0][3],
                       'sign': result[0][4],
                       'bench_personal': result[0][5],
                       'squat_personal': result[0][6],
                       'curl_personal' : result[0][7],
                       'mile_minutes': result[0][8],
                       'mile_seconds': result[0][9],
                       'workout_hours': result[0][10],
                       'workout_minutes': result[0][11],
                       'calories': result[0][12],
                       'last_meal': result[0][13],
                       'last_fruit': result[0][14],
                       'last_vegetable': result[0][15]
                       }
            response = {'message': "Details fetched", 'details' : details}
        else:
            response = {'message' : 'Details fetched', 'details' : 'Empty details'}
    except:
        response = {'message' : 'Error Occurred', 'details' : 'No details fetched'}

    return response

@ app.route('/friends', methods = ['GET'])
def friends():
    username = request.args.get('user')
    print(username)

    connection = sqlite3.connect('./Databases/Users_data.db')
    cur = connection.cursor()

    sql = """
            SELECT username, workout_total_hours, workout_total_minutes, calories_taken
            FROM User_Details, User_Friends
            WHERE user = '{}' AND friend = username
            """.format(username)

    result = cur.execute(sql)
    result = result.fetchall()

    friend_details = []
    for friend in result:
        friend_details.append({'Name': friend[0], 'Total_Hours': friend[1], 'Total_Minutes': friend[2], 'Calories': friend[3]})
        # print(friend)


    print(friend_details)

    response = {'message' : 'Successfully fetched friends', 'friend_details' : friend_details}

    return response



if __name__ == '__main__':
    app.run(debug=True, host = '192.168.1.111', port = 5000)