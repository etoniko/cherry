(() => {
  var scene = document.getElementById("scene");
  var room = document.getElementById("world");

  var paused = true;

  var accel = 1;
  var maxSpeed = 10;

  var speedX = 0;
  var speedZ = 0;

  var cameraPositionX = 0;
  var cameraPositionY = 0; // Initialize cameraPositionY
  var cameraPositionZ = 400;
  var cameraRotationX = 0;
  var cameraRotationY = 0;

  var upKeyPressed = false;
  var downKeyPressed = false;
  var leftKeyPressed = false;
  var rightKeyPressed = false;

  var isJumping = false;
  var jumpHeight = 15;
  var jumpSpeed = 0;

  const update = () => {
    if (!paused) {
      requestIdleCallback(update);
    }

    if (upKeyPressed) {
      if (speedZ < maxSpeed) {
        speedZ += accel;
      }
    } else if (downKeyPressed) {
      if (speedZ > -maxSpeed) {
        speedZ -= accel;
      }
    } else {
      if (speedZ > accel) {
        speedZ -= accel;
      } else if (speedZ < -accel) {
        speedZ += accel;
      } else {
        speedZ = 0;
      }
    }

    if (leftKeyPressed) {
      if (speedX < maxSpeed) {
        speedX += accel;
      }
    } else if (rightKeyPressed) {
      if (speedX > -maxSpeed) {
        speedX -= accel;
      }
    } else {
      if (speedX > accel) {
        speedX -= accel;
      } else if (speedX < -accel) {
        speedX += accel;
      } else {
        speedX = 0;
      }
    }

     if (isJumping) {
      cameraPositionY += jumpSpeed;
      jumpSpeed -= 0.8; // Decrement jumpSpeed for upward movement

      if (cameraPositionY <= 0) { // Check if back on the ground
        cameraPositionY = 0;
        isJumping = false;
        jumpSpeed = 0;
      }
    }

    cameraRotationX = Math.max(cameraRotationX, -Math.PI / 2);
    cameraRotationX = Math.min(cameraRotationX, Math.PI / 2);

    cameraPositionX -= Math.cos(cameraRotationY) * speedX;
    cameraPositionZ -= Math.sin(cameraRotationY) * speedX;

    cameraPositionX += Math.sin(cameraRotationY) * speedZ;
    cameraPositionZ -= Math.cos(cameraRotationY) * speedZ;

    scene.style.transform =
      "translateZ(701px)" +
      "rotateX(" +
      cameraRotationX.toFixed(6) +
      "rad)" +
      "rotateY(" +
      cameraRotationY.toFixed(6) +
      "rad)";

    room.style.transform =
      "translate3d(" + -cameraPositionX + "px," + +cameraPositionY + "px," + -cameraPositionZ + "px)"; // Added cameraPositionY here
  };

  const keyHandler = e => {
    let keyPressed = e.type === "keydown";
    if (e.code === "KeyW") {
      upKeyPressed = keyPressed;
    } else if (e.code === "KeyS") {
      downKeyPressed = keyPressed;
    } else if (e.code === "KeyA") {
      leftKeyPressed = keyPressed;
    } else if (e.code === "KeyD") {
      rightKeyPressed = keyPressed;
    } else if (e.code === "Space" && !isJumping) {
      isJumping = true;
      jumpSpeed = jumpHeight;
    }
  };

  const mouseHandler = e => {
    cameraRotationY += e.movementX / 150;
    cameraRotationX -= e.movementY / 150;
  };

  const start = () => {
    document.addEventListener("keyup", keyHandler);
    document.addEventListener("keydown", keyHandler);
    document.addEventListener("mousemove", mouseHandler);
    paused = false;
    update();
  };

  const stop = () => {
    document.removeEventListener("keyup", keyHandler);
    document.removeEventListener("keydown", keyHandler);
    document.removeEventListener("mousemove", mouseHandler);
    paused = true;
    upKeyPressed = false;
    downKeyPressed = false;
    leftKeyPressed = false;
    rightKeyPressed = false;
  };

  document.addEventListener("click", () => {
    document.body.requestPointerLock();
  });

  document.addEventListener("pointerlockchange", () => {
    if (document.pointerLockElement) {
      start();
    } else {
      stop();
    }
  });

  update();
})();