var container;
var camera, scene, renderer;
var geometry, material;
var mesh;
var places = [],
    place = 1;
var sprites = [
        [],
        [
            [10, -10, 10, '2'],
            [1, -5, 15, '3'],
        ],
        [
            [10, -2, 10, '1'],
            [1, 13, 13, '4'],
        ],
        [
            [1, 3, 10, '1'],
        ],
        [
            [1, -2, 8, '2'],
        ],
    ],
    sprite,
    allsprite = [];

function initThree() {

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
    camera.target = new THREE.Vector3(0, 0, 0);

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;

    container = document.getElementById('container');
    container.appendChild(renderer.domElement);

    geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);
    material = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(places[place])
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    showSprites(place);



}

function showSprites(nowplace) {
    for (var i = 0; i < sprites[nowplace].length; i++) {
        var material = new THREE.SpriteMaterial({
            map: new THREE.TextureLoader().load('image/arrow.jpg')
        });

        sprite = new THREE.Sprite(material);
        sprite.name = sprites[nowplace][i][3];
        sprite.position.set(sprites[nowplace][i][0], sprites[nowplace][i][1], sprites[nowplace][i][2]);
        //sprite.scale.set(0.5, 0.5, 1);
        allsprite.push(sprite)
        scene.add(sprite);
    }
}

function initPlaces() {
    places.push('');
    places.push('image/1.jpg');
    places.push('image/2.jpg');
    places.push('image/3.jpg');
    places.push('image/4.jpg');
}