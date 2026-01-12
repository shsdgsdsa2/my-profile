/* === FIREWALL & SECURITY === */
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
    if(e.keyCode == 123) return false;
    if(e.ctrlKey && (e.key === 'I' || e.key === 'C' || e.key === 'J' || e.key === 'U' || e.key === 'S')) return false;
});

/* === LOADER FIXED LOGIC === */
// Đảm bảo script chạy sau khi DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById('loader-screen');
    const percent = document.getElementById('percent');
    const barFill = document.getElementById('progress-bar-fill');
    const accessBtn = document.getElementById('access-btn');
    const loadingBox = document.getElementById('loading-box');
    const hiddenElements = document.querySelectorAll('.hidden-element');

    let prog = 0;
    // Chạy thanh load từ 0-100% trong 2.5s (25ms * 100)
    const loadTimer = setInterval(() => {
        prog++;
        percent.innerText = prog + '%';
        barFill.style.width = prog + '%';
        
        if(prog >= 100) {
            clearInterval(loadTimer);
            // Ẩn box loading chữ, hiện nút ngay lập tức
            loadingBox.style.display = 'none'; 
            accessBtn.style.display = 'block'; 
        }
    }, 25);

    // Xử lý nút bấm truy cập
    accessBtn.addEventListener('click', () => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            // Hiệu ứng Fade In cho nội dung chính
            hiddenElements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('animate-active');
                }, index * 200);
            });
        }, 500);
    });
});

/* === CONTACT FORM (MAILTO) === */
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('c-name').value;
    const email = document.getElementById('c-email').value;
    const phone = document.getElementById('c-phone').value;
    const subject = document.getElementById('c-subject').value;
    const msg = document.getElementById('c-msg').value;

    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0APhone: ${phone}%0D%0A%0D%0AMessage:%0D%0A${msg}`;
    window.location.href = `mailto:khoatran3102011@gmail.com?subject=${subject}&body=${body}`;
});

/* === MOUSE TRAIL === */
const cvs = document.getElementById('neon-trail');
if(window.matchMedia("(hover: hover)").matches) {
    const ctx = cvs.getContext('2d');
    cvs.width = window.innerWidth; cvs.height = window.innerHeight;
    let trail = [];
    window.addEventListener('mousemove', e => trail.push({x: e.clientX, y: e.clientY, age: 0}));
    function anim() {
        ctx.clearRect(0,0,cvs.width,cvs.height);
        ctx.lineCap='round'; ctx.lineJoin='round';
        if(trail.length > 1) {
            ctx.beginPath(); ctx.moveTo(trail[0].x, trail[0].y);
            for(let i=1; i<trail.length; i++) { ctx.lineTo(trail[i].x, trail[i].y); trail[i].age++; }
            ctx.shadowBlur=15; ctx.shadowColor='#0ef'; ctx.strokeStyle='#0ef'; ctx.lineWidth=4; ctx.stroke();
        }
        if(trail.length > 20) trail.shift();
        if(trail.length > 0) { trail[0].age++; if(trail[0].age > 2) trail.shift(); }
        requestAnimationFrame(anim);
    }
    anim();
    window.addEventListener('resize', () => { cvs.width=window.innerWidth; cvs.height=window.innerHeight; });
}

/* === TYPING === */
new Typed('.typing-text', { strings: ['Bot Developer', 'Website Creator'], typeSpeed: 100, backSpeed: 60, backDelay: 1000, loop: true });

/* === MOBILE MENU === */
const menu = document.querySelector('#menu-icon'), nav = document.querySelector('.navbar');
menu.onclick = () => { menu.classList.toggle('bx-x'); nav.classList.toggle('active'); };
window.onscroll = () => { menu.classList.remove('bx-x'); nav.classList.remove('active'); };

/* === WIDGET DOCK === */
let dockOpen = false;
function toggleDock() {
    dockOpen = !dockOpen;
    const m = document.getElementById('dock-menu'), t = document.querySelector('.dock-toggle');
    if(dockOpen) { m.classList.add('show'); t.classList.add('active'); }
    else { m.classList.remove('show'); t.classList.remove('active'); closeWidgets(); }
}
function closeWidgets() { document.querySelectorAll('.widget-box').forEach(w => w.classList.remove('open')); }
function openWidget(id) { closeWidgets(); document.getElementById('wid-'+id).classList.add('open'); if(window.innerWidth<768) document.getElementById('dock-menu').classList.remove('show'); }

/* === CALCULATOR === */
const calc = {
    e: '', s: document.getElementById('calc-screen'),
    add: v => { calc.e+=v; calc.s.innerText=calc.e; },
    clear: () => { calc.e=''; calc.s.innerText='0'; },
    del: () => { calc.e=calc.e.slice(0,-1); calc.s.innerText=calc.e||'0'; },
    solve: () => { try { calc.s.innerText=eval(calc.e); calc.e=calc.s.innerText; } catch { calc.s.innerText='Err'; calc.e=''; } }
};

/* === SNAKE GAME === */
const snakeGame = {
    c: document.getElementById('snake-game'), get ctx() { return this.c.getContext('2d'); },
    box: 20, snake: [], food: {}, dir: null, loop: null, sc: 0,
    init: function() {
        clearInterval(this.loop); this.snake=[{x:5*20,y:5*20}]; this.sc=0; this.dir='RIGHT'; this.spawn();
        document.getElementById('score').innerText="Score: 0";
        this.loop=setInterval(()=>this.draw(),120); this.c.focus();
    },
    input: function(d) {
        if(d=='LEFT'&&this.dir!='RIGHT')this.dir='LEFT'; if(d=='UP'&&this.dir!='DOWN')this.dir='UP';
        if(d=='RIGHT'&&this.dir!='LEFT')this.dir='RIGHT'; if(d=='DOWN'&&this.dir!='UP')this.dir='DOWN';
    },
    spawn: function() { this.food={x:Math.floor(Math.random()*(280/20))*20,y:Math.floor(Math.random()*(280/20))*20}; },
    draw: function() {
        this.ctx.fillStyle='#000'; this.ctx.fillRect(0,0,280,280);
        for(let i=0;i<this.snake.length;i++) {
            this.ctx.fillStyle=(i==0)?'#0ef':'#fff'; this.ctx.fillRect(this.snake[i].x,this.snake[i].y,20,20);
        }
        this.ctx.fillStyle='#bc13fe'; this.ctx.fillRect(this.food.x,this.food.y,20,20);
        let x=this.snake[0].x, y=this.snake[0].y;
        if(this.dir=='LEFT')x-=20; if(this.dir=='UP')y-=20; if(this.dir=='RIGHT')x+=20; if(this.dir=='DOWN')y+=20;
        if(x<0)x=260; if(x>260)x=0; if(y<0)y=260; if(y>260)y=0;
        if(x==this.food.x && y==this.food.y) { this.sc++; document.getElementById('score').innerText="Score: "+this.sc; this.spawn(); } else this.snake.pop();
        let newH={x:x,y:y};
        for(let i=0;i<this.snake.length;i++) if(newH.x==this.snake[i].x && newH.y==this.snake[i].y) clearInterval(this.loop);
        this.snake.unshift(newH);
    }
};
window.addEventListener('keydown', e => {
    if(e.key=="ArrowLeft") snakeGame.input('LEFT'); if(e.key=="ArrowUp") snakeGame.input('UP');
    if(e.key=="ArrowRight") snakeGame.input('RIGHT'); if(e.key=="ArrowDown") snakeGame.input('DOWN');
});

/* === 3D TILT === */
document.querySelectorAll('.tilt-card').forEach(c => {
    c.addEventListener('mousemove', e => {
        if(window.innerWidth<991) return;
        const r=c.getBoundingClientRect(), x=e.clientX-r.left, y=e.clientY-r.top;
        c.style.transform=`perspective(1000px) rotateX(${((y-r.height/2)/(r.height/2))*-10}deg) rotateY(${((x-r.width/2)/(r.width/2))*10}deg) scale(1.02)`;
    });
    c.addEventListener('mouseleave', () => c.style.transform='perspective(1000px) rotateX(0) rotateY(0) scale(1)');
});