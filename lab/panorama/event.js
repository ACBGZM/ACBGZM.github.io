var isUserInteracting = false;
var isUserInteracting_phone = false;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var intersections;
var changetime = 0;

document.addEventListener('mousedown', onDocumentMouseDown, false);
document.addEventListener('mousemove', onDocumentMouseMove, false);
document.addEventListener('mouseup', onDocumentMouseUp, false);
window.addEventListener('resize', onWindowResize, false);
document.addEventListener('click', onDocumentMouseClick, false);
document.addEventListener('touchstart', onDocumentTouchDown, false);
document.addEventListener('touchmove', onDocumentTouchMove, false);

function onDocumentMouseDown(event) {
    event.preventDefault();
    isUserInteracting = true;
    //记录此时鼠标的屏幕坐标和初始经纬度
    onPointerDownPointerX = event.clientX;
    onPointerDownPointerY = event.clientY;
    onPointerDownLon = lon;
    onPointerDownLat = lat;
}

function onDocumentMouseMove(event) {
    if (isUserInteracting) {
        lon = (onPointerDownPointerX - event.clientX) * 0.1 + onPointerDownLon;
        lat = (event.clientY - onPointerDownPointerY) * 0.1 + onPointerDownLat;
    }
}

function onDocumentMouseUp(event) {
    isUserInteracting = false;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    // camera.projectionMatrix.makePerspective(fov, camera.aspect, 1, 1100);
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    intersections = raycaster.intersectObjects(scene.children);
    //console.log(mouse);
    console.log(intersections[0].point);
    console.log(intersections[0].object.name);
    if (intersections[0].object.name) {
        changeScene(intersections[0].object.name);
    }
}

function changeScene(nextplace) {
    changetime = 1;
    place = nextplace;
}

function onDocumentTouchMove(event) {
    console.log(isUserInteracting_phone);
    if (isUserInteracting_phone == true) {
        lon = (onPointerDownPointerX - event.touches[0].pageX) * 0.1 + onPointerDownLon;
        lat = (event.touches[0].pageY - onPointerDownPointerY) * 0.1 + onPointerDownLat;
    }
}
function onDocumentTouchDown(event) {
    event.preventDefault();

    isUserInteracting_phone = true;
    onPointerDownPointerX = event.touches[ 0 ].pageX ;
    onPointerDownPointerY = event.touches[ 0 ].pageY;


    onPointerDownLon = lon;
    onPointerDownLat = lat;
}
