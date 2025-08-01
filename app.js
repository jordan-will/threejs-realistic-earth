const scene = new THREE.Scene()
const loader = new THREE.TextureLoader()
loader.load('./assets/textures/universe.jpg', (texture) => {
  scene.background = texture
})

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.z = 2

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2); 
directionalLight.position.set(-5, 1, 5); 
scene.add(directionalLight);

// const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2);
// scene.add(lightHelper);


const renderer = new THREE.WebGLRenderer({ antalias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new THREE.OrbitControls(camera, renderer.domElement)


const earthGeo = new THREE.SphereGeometry(1, 64, 64)
const normalMap = loader.load('./assets/textures/earth_normal_map.png')
const specularMap = loader.load('./assets/textures/earth_specular_map.png')
const earthTexture = loader.load('./assets/textures/earth.jpg')
const cloudTexture = loader.load('./assets/textures/earth_clouds.jpg')

const earthMaterial = new THREE.MeshPhongMaterial({
  map: earthTexture,
  normalMap: normalMap,
  specularMap: specularMap,
  specular: new THREE.Color('gray'),
  shininess: 5
})

const earthMesh = new THREE.Mesh(earthGeo, earthMaterial)
scene.add(earthMesh)

const cloudGeometry = new THREE.SphereGeometry(1.005, 64, 64)
const cloudMaterial = new THREE.MeshLambertMaterial({
  map: cloudTexture,
  transparent: true,
  opacity: 0.4
})

const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial)
scene.add(cloudMesh)

const updateWindow = () =>{
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth/window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
}

const animate = () => {
  requestAnimationFrame(animate)
  controls.update()
  earthMesh.rotation.y += 0.001;
  cloudMesh.rotation.y += 0.0019
  renderer.render(scene, camera)
}

updateWindow()
animate()
