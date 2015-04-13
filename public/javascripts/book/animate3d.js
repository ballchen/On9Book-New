
var nextPage, backPage;
var threeFunction = function (data)
{
    if(data.images.length>0)
    {
            var bookHalfLength = 16;
            var incre = Math.PI/180;
            //var speedup=1.2;
            //var degree = 0;
            var canvasWidth = window.innerWidth*0.9;
            var canvasHeight = 675;
            var currentPage = 0;
            var pageLock = 0;
            var skip = 0;
            var direct = 1;
            var on9 = 0;
            //var loop;
            //var phase = 1;
            //console.log('data.images\n'+data.images);
            var materialCollection = [];
            for (var i = 0; i < data.images.length; i++) {
                //txrPath.push(THREE.ImageUtils.loadTexture(data.images[i].path));
                materialCollection.push(new THREE.MeshBasicMaterial( { side: 0,
        map: THREE.ImageUtils.loadTexture(data.images[i].path) } ) );
            };
            //var txr_front_cover=1, txr_back_cover=1;
            //console.log('\n\n\n\n\n\n\n');
            //console.log(materialCollection);



            var scene = new THREE.Scene();
            var camera = new THREE.PerspectiveCamera(70, canvasWidth/canvasHeight, 0.1, 1000);
            camera.position.z = 100;
            var renderer = new THREE.WebGLRenderer({antialias:true});
            renderer.setSize(canvasWidth, canvasHeight);
            renderer.setClearColor( 0xffffff, 1);
            var container = document.getElementById('animation');
            container.appendChild(renderer.domElement);


//parents
var leftParent = new THREE.Object3D();
var rightParent = new THREE.Object3D();
var midParent = new THREE.Object3D();
//var frontCoverParent = new THREE.Object3D();
//var backCoverParent = new THREE.Object3D();

//objects
var geometry = new THREE.BoxGeometry( bookHalfLength, 20, 0, 1, 1, 1 );
//var frontCoverMaterial = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: txr_front_cover} );
//var backCoverMaterial = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: txr_back_cover} );
var leftObject = new THREE.Mesh( geometry, materialCollection[ currentPage ] );
var rightObject = new THREE.Mesh( geometry, materialCollection[ currentPage + 1 ] );
var midObject = new THREE.Mesh( geometry, materialCollection[ currentPage + 1 ] );
//var midBackObject = new THREE.Mesh( geometry, materialCollection[2] );
//var frontCoverObject = new THREE.Mesh( geometry, frontCoverMaterial );
//var backCoverObject = new THREE.Mesh( geometry, backCoverMaterial );


//scene add
scene.add( leftParent );
scene.add( rightParent );
scene.add( midParent );
//scene.add( frontCoverParent );
//scene.add( backCoverParent );

//parent->object
leftParent.add( leftObject );
rightParent.add( rightObject );
midParent.add( midObject );
//midParent.add( midBackObject );
//frontCoverParent.add( frontCoverObject );
//backCoverParent.add( backCoverObject );


leftObject.rotation.y = -incre*180;
rightObject.rotation.y = -incre*180;
midObject.rotation.y = -incre*180;



//offset
leftObject.position.x=-bookHalfLength/2;
rightObject.position.x=bookHalfLength/2;
midObject.position.x=bookHalfLength/2;
//midBackObject.position.x=bookHalfLength/2;
//frontCoverObject.position.x=-bookHalfLength/2;
//backCoverObject.position.x=bookHalfLength/2;


//camera<-->parent position
leftParent.position.z=80;
rightParent.position.z=80;
midParent.position.z=80;
//frontCoverParent.position.z=80;
//backCoverParent.position.z=80;

    //camera.position.z-=1;
    //camera.rotation.y = incre*180;

//frontCoverObject.position.z=-1;
//backCoverObject.position.z=-1;

//midBackObject.position.z = 0;



var on9geometry = new THREE.TextGeometry("ON9", {size:5, height:3});
var on9material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide} );
var on9mesh = new THREE.Mesh( on9geometry, on9material);
on9mesh.position.x = -5;
on9mesh.position.z = 80;

console.log(on9mesh.position);





nextPage = function(){
    console.log('nextPage')

    if(pageLock == 0 && currentPage+2<=materialCollection.length-1)//等號->奇數; 小於->偶數
    {
        //init
        skip = 0;
        direct = 1;
        midParent.rotation.y = 0;
        midObject.material = materialCollection[currentPage+1]
        pageLock = 1;
        currentPage += 2;
    }
    else if(pageLock==1 && skip == 0)//skip only once
    {
        skip = 1;
        midParent.rotation.y = -incre*(90+direct*80);
        /*
        leftObject.material = materialCollection[currentPage];
        midObject.material = materialCollection[currentPage+1];
        rightObject.material = materialCollection[currentPage+1];
        pageLock = 0;
        */
        console.log('skip nextPage');
    }

    //last page
    if( currentPage+2 > materialCollection.length-1 )
    {
        if(on9 == 0)
        {
            on9 = 1;
            scene.add( on9mesh );
        }
        console.log('no next');
    }
}


backPage = function(){
    console.log('backPage')

    if(pageLock == 0 && currentPage-2>=0)//等號->奇數; 小於->偶數
    {
        //init
        skip = 0;
        direct = -1;
        midParent.rotation.y = -incre*180;
        midObject.material = materialCollection[currentPage]
        pageLock = 1;
        currentPage -= 2;
    }
    else if(pageLock==1 && skip == 0)//skip only once
    {
        skip = 1;
        midParent.rotation.y = -incre*(90+direct*80);
        /*
        leftObject.material = materialCollection[currentPage];
        midObject.material = materialCollection[currentPage+1];
        rightObject.material = materialCollection[currentPage+1];
        pageLock = 0;
        */
        console.log('skip backPage');
    }

    //last page
    if( currentPage-2 < 0 )
    {
        console.log('no back');
    }
}




            var render = function () {
                loop = requestAnimationFrame(render);

                on9mesh.rotation.x+=0.03;
                on9mesh.rotation.y+=0.03;
                on9mesh.rotation.z+=0.03;
                renderer.render(scene, camera);






if(pageLock==1 && direct ==1)
{
if( midParent.rotation.y >= -incre*89 )
{
    midParent.rotation.y -=incre*direct;
    rightObject.material = materialCollection[currentPage+1];
}
else if( midParent.rotation.y >= -incre*175 )
{
    midParent.rotation.y -=incre*direct;
    midObject.material = materialCollection[currentPage];
}
else if( midParent.rotation.y >= -incre*179 )
{
    midParent.rotation.y -=incre*direct;
    leftObject.material = materialCollection[currentPage];
}
else
{
    midParent.rotation.y = -incre*180;
    pageLock = 0;
    skip = 0;
}

}//end if


if(pageLock==1 && direct ==-1)
{
    console.log(midParent.rotation.y);
if( midParent.rotation.y <= -incre*89 )
{
    midParent.rotation.y +=incre;
    leftObject.material = materialCollection[currentPage];
}
else if( midParent.rotation.y <= -incre*5 )
{
    midParent.rotation.y +=incre;
    midObject.material = materialCollection[currentPage+1];
}
else if( midParent.rotation.y <= -incre*1 )
{
    midParent.rotation.y +=incre;
    //midObject.material = materialCollection[currentPage+1];
    rightObject.material = materialCollection[currentPage+1];
}
else
{
    midParent.rotation.y = incre;
    pageLock = 0;
    skip = 0;
}

}//end if
            };//end render



            render();
//eeeeee
    }//end if data length
};

