# Bouncing Ball Project

This is a simple project built with [React](https://react.dev/) that uses mouse drag and release to throw balls.


## Demo Video

[![Ball Bounce Demo](http://img.youtube.com/vi/jw5GPUy_MyI/0.jpg)](https://youtu.be/jw5GPUy_MyI)


## Features
1. Drag and release to throw a ball, the cursor speed will determine the initial speed of the ball.
2. There are two balls by default, when a ball collides another, the two balls makes inelastic collision.
3. When a ball collide with the wall, inelastic collision happens and the speed of the ball decreases.


### Other Possible Features

* Provide the selection of ball masses
* Change number of balls
* Select type of collision (elastic / inelastic)
* Add "friction" when sliding, make speed reduce even without collision
* Add ball bounce while being dragged
* Add more UI

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

