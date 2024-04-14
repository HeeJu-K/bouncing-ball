import React, { useState, useEffect, useRef } from 'react';
import './App.css';


const BALL_RADIUS = 80;
const VELOCITY_FACTOR = 50;
const BALL_SHRINK_FACTOR = 0.9;

function Ball({ position, color, ballSize }) {
  console.log("see ball size", position, ballSize)
  const style = {
    backgroundColor: color,
    width: `${ballSize}px`,
    height: `${ballSize}px`,
    borderRadius: '50%',
    position: 'absolute',
    left: `${position.x}px`,
    top: `${position.y}px`,
    transition: 'width 0.02s ease, height 0.02s ease'
  };

  return <div style={style} />;
}

function useDraggableBall(initialPosition) {
  const [ballSize, setBallSize] = useState(BALL_RADIUS * 2);
  const [prevPos, setPrevPos] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState(initialPosition);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });

  const [isDragging, setIsDragging] = useState(false);

  const [isHorizontalColliding, setIsHorizontalColliding] = useState(false);
  const [isVerticalColliding, setIsVerticalColliding] = useState(false);

  // refresh ball position depending on current velocity
  useEffect(() => {
    if (!isDragging) {
      const interval = setInterval(() => {
        setPosition((pos) => ({
          x: pos.x + velocity.x,
          y: pos.y + velocity.y,
        }));
      }, 20);

      return () => clearInterval(interval);
    }
    else {
      //update ball size on drag
      setBallSize(BALL_RADIUS * 2 * BALL_SHRINK_FACTOR);
    }
  }, [isDragging, velocity]);

  const handleDrag = (e) => {
    if (isDragging) {
      setPosition({
        // clientX&Y is center value, subtract radius to get top and left values
        x: e.clientX - BALL_RADIUS,
        y: e.clientY - BALL_RADIUS,
      });
    }
  };

  const handleDragEnd = (e) => {
    setIsDragging(false);
    setBallSize(BALL_RADIUS * 2);
    setVelocity({
      x: (e.clientX - prevPos.x - BALL_RADIUS) / VELOCITY_FACTOR,
      y: (e.clientY - prevPos.y - BALL_RADIUS) / VELOCITY_FACTOR
    });
    setPrevPos({
      x: e.clientX - BALL_RADIUS,
      y: e.clientY - BALL_RADIUS,
    });
  };

  function isWallCollision(position) {
    return {
      horizontal: position.x < 0 || position.x + BALL_RADIUS * 2 > window.innerWidth,
      vertical: position.y < 0 || position.y + BALL_RADIUS * 2 > window.innerHeight
    }
  }

  // adjust for wall collision
  useEffect(() => {
    const wallCollision = isWallCollision(position);
    if (!isDragging) { setBallSize(BALL_RADIUS * 2); }
    if (wallCollision.horizontal) {
      if (!isHorizontalColliding) {
        setBallSize(BALL_RADIUS * 2 * BALL_SHRINK_FACTOR);
        setIsHorizontalColliding(true);
        setVelocity({
          x: - (velocity.x * 0.8).toFixed(3),
          y: velocity.y,
        });
      }
    } else {
      setIsHorizontalColliding(false);
    }

    if (wallCollision.vertical) {
      if (!isVerticalColliding) {
        setBallSize(BALL_RADIUS * 2 * BALL_SHRINK_FACTOR);
        setIsVerticalColliding(true);
        setVelocity({
          x: velocity.x,
          y: -(velocity.y * 0.8).toFixed(3),
        });
      }
    }
    else {
      setIsVerticalColliding(false);
    }
  }, [position]);

  return {
    ballSize, setBallSize,
    prevPos, setPrevPos,
    position, setPosition,
    isDragging, setIsDragging,
    velocity, setVelocity,
    handleDrag,
    handleDragEnd
  };
}

function isBallClicked(ball, mouseX, mouseY) {
  // return true if mouse click is within the range of the ball
  return ball.position.x <= mouseX && ball.position.x + BALL_RADIUS * 2 >= mouseX
    && ball.position.y <= mouseY && ball.position.y + BALL_RADIUS * 2 >= mouseY
}

function App() {

  const ballA = useDraggableBall({ x: window.innerWidth / 4 - BALL_RADIUS, y: window.innerHeight / 2 - BALL_RADIUS });
  const ballB = useDraggableBall({ x: window.innerWidth / 4 * 3 - BALL_RADIUS, y: window.innerHeight / 2 - BALL_RADIUS });

  useEffect(() => {

    const handleBallCollision = () => {

      ballA.setBallSize(BALL_RADIUS * 2 * BALL_SHRINK_FACTOR);
      ballB.setBallSize(BALL_RADIUS * 2 * BALL_SHRINK_FACTOR);

      let prevAVelocity = ballA.velocity
      let prevBVelocity = ballB.velocity

      if (!ballA.isDragging) {
        ballA.setVelocity({
          x: prevBVelocity.x,
          y: prevBVelocity.y,
        });
      }
      if (!ballB.isDragging) {
        ballB.setVelocity({
          x: prevAVelocity.x,
          y: prevAVelocity.y,
        });
      }
    };

    const distance = Math.sqrt((ballA.position.x - ballB.position.x) ** 2 + (ballA.position.y - ballB.position.y) ** 2);
    if (distance < BALL_RADIUS * 2) {
      handleBallCollision();
    }

    // update ball position for velocity calculation
    setTimeout(() => {
      ballA.setPrevPos(ballA.position);
      ballB.setPrevPos(ballB.position);
    }, 50);

  }, [ballA.position, ballB.position])


  return (
    <div
      className="App"
      style={{ width: '100vw', height: '100vh' }}

      onMouseDown={(e) => {
        if (isBallClicked(ballA, e.clientX, e.clientY)) { ballA.setIsDragging(true) }
        if (isBallClicked(ballB, e.clientX, e.clientY)) { ballB.setIsDragging(true) }
      }}

      onMouseMove={(e) => {
        if (ballA.isDragging) { ballA.handleDrag(e); };
        if (ballB.isDragging) { ballB.handleDrag(e); };
      }}

      onMouseUp={(e) => {
        if (ballA.isDragging) { ballA.handleDragEnd(e); }
        if (ballB.isDragging) { ballB.handleDragEnd(e); }
      }}
    >
      <Ball color="blue" position={ballA.position} ballSize={ballA.ballSize} />
      <Ball color="red" position={ballB.position} ballSize={ballB.ballSize} />
    </div>
  );
}

export default App;