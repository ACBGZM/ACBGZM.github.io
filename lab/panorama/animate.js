var lon = 0,
    lat = 0; //经纬度
var fov = 75; //焦距
var onPointerDownLat = 0,
    onPointerDownLon = 0, //临时经纬度
    onPointerDownPointerX = 0,
    onPointerDownPointerY = 0; //临时XY
var pRadius = 1000; //球半径


function animate() {
    //lon += 0.05;
    requestAnimationFrame(animate);
    render();
}

function render() {
    camera.lookAt(position2world(lon, lat));
    renderer.clear();


    if(changetime){
        if(changetime<100){
            camera.fov -= 0.3;
            camera.updateProjectionMatrix();
            changetime++;
            for(var i = 0;i<allsprite.length; i++){
                allsprite[i].visible = false;
            }
        }else if(changetime >= 100){
            changetime = 0;
            camera.fov = 75;
            camera.updateProjectionMatrix();
            
            mesh.material = new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load(places[place])
            });

            showSprites(place);
        }
    }
    


    renderer.render(scene, camera);
}

function position2world(lon, lat) {
    lat = Math.max(-85, Math.min(85, lat)); //纬度限制在-85---85度之间
    var phi = THREE.Math.degToRad(90 - lat); //角度转为弧度制
    var theta = THREE.Math.degToRad(lon);
    //在球坐标系中算出相机的聚焦点的坐标
    var result = {
        x: pRadius * Math.sin(phi) * Math.cos(theta),
        y: pRadius * Math.cos(phi),
        z: pRadius * Math.sin(phi) * Math.sin(theta),
    };
    return new THREE.Vector3(result.x, result.y, result.z);
}
