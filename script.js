let goalPostTop = 210;
let reverseDirection = false;
let isGoalPostMoving = false;
let isBallGrabbed = false;
let goalPostSpeed = 1;
let currentMouse;
let ballTop = 0;
let ballLeft = 0;
let goalPostInterval;


function initializeGame() {
    isGoalPostMoving = true;
    document.getElementById('game-container').style.display = 'flex';
    goalPostInterval = setInterval(moveGoalPost, 2);
}

function moveGoalPost() {
    let goalPost = document.getElementById('goal-post');
    if (goalPostTop <= 50) {
        reverseDirection = true;
    } else if (goalPostTop >= 400) {
        reverseDirection = false;
    }
    reverseDirection ? goalPostTop += goalPostSpeed : goalPostTop -= goalPostSpeed;
    goalPost.style.marginTop = goalPostTop + 'px';
}

function grabBall() {
    isBallGrabbed = true;
}

function releaseBall() {
    isBallGrabbed = false;
    let ball = document.getElementById('img-ball');
    let rightField = document.getElementById('field-right');
    if (ball.offsetLeft > rightField.offsetLeft) {
        ballLeft = rightField.offsetLeft;
        ball.style.left = ballLeft + 'px';
    }
    const ballInterval = setInterval(function () {
        let goalPost = document.getElementById('goal-post');
        ball.style.left = ballLeft + 'px';
        if (ball.offsetLeft > goalPost.offsetLeft && ball.offsetTop > goalPost.offsetTop && ball.offsetTop < goalPost.offsetTop + 150 && ball.offsetLeft < goalPost.offsetLeft + 50) {
            clearInterval(ballInterval);
            clearInterval(goalPostInterval);
            alert('Goal! Well done.');
        }
        if (ball.offsetLeft > goalPost.offsetLeft + 100) {
            clearInterval(ballInterval);
            clearInterval(goalPostInterval);
            alert('Missed! Try again.');
            window.location.reload();
        }
        ballLeft++;
    }, 1);
}

document.addEventListener('mousemove', function (e) {
    currentMouse = e;
    if (isBallGrabbed) {
        ballTop = currentMouse.clientY - 20;
        ballLeft = currentMouse.clientX - 20;
        let ball = document.getElementById('img-ball');
        let rightField = document.getElementById('field-right');
        if (ball.offsetLeft < rightField.offsetLeft) {
            ball.style.top = ballTop + 'px';
            ball.style.left = ballLeft + 'px';
        } else {
            ballLeft = rightField.offsetLeft - 1;
            ball.style.left = ballLeft + 'px';
        }
    }
});

document.addEventListener('mouseup', function () {
    isBallGrabbed = false;
});
