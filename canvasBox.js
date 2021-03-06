const canvas = document.getElementById('canvasBox')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const particlesArray = []
let hue = 0
// ctx.globalCompositeOperation = 'destination-over'

window.addEventListener('resize', e => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

const mouse = {
    x: undefined,
    y: undefined,
}

canvas.addEventListener('click', (e) => {
    mouse.x = e.x
    mouse.y = e.y
    for(let i = 0; i < 15; i++){
        particlesArray.push(new Particle())
    }
})

canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.x
    mouse.y = e.y
    for(let i = 0; i < 2; i++){
        particlesArray.push(new Particle())
    }
})


class Particle {
    constructor(){
        this.x = mouse.x
        this.y = mouse.y
        this.size = Math.random() * 20.168 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
        this.color = 'hsl(' + hue + ', 100%, 50%)'
        this.particleFill = 'hsl(' + hue + ', 50%, 50%)'
    }
    update(){
        this.x += this.speedX
        this.y += this.speedY
        if(this.size > 0.2) this.size -= 0.1
    }
    draw(){
        //ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'
        //ctx.fillStyle = this.particleFill
        ctx.strokeStyle = this.color 
        ctx.lineWidth = 1.168
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        //ctx.fill()
        ctx.stroke()
    }
}


function handleParticles(){
    
    for(let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update()
        particlesArray[i].draw()
        
        for (let j = i; j < particlesArray.length; j++) {
           const dx = particlesArray[i].x - particlesArray[j].x
           const dy = particlesArray[i].y - particlesArray[j].y
           const distance = Math.sqrt(dx*dx + dy*dy)
           if(distance < 100){
               ctx.beginPath()
               ctx.strokeStyle = particlesArray[i].color
               ctx.lineWidth = 0.268
            //    ctx.lineWidth = particlesArray[i].size/25
               ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
               ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
               ctx.stroke()
           }
        }
        if (particlesArray[i].size <= 0.3) {
            particlesArray.splice(i, 1)
            i--
        }
    }
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.01)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    handleParticles()
    hue += 6
    requestAnimationFrame(animate)
}
animate()





