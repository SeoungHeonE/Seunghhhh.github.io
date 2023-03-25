{   
    // 배열을 무작위로 섞는 함수
    const shuffleArray = arr => arr.sort(() => Math.random() - 0.5);
    // 두 점을 지나는 직선의 방정식을 계산하는 함수
    const lineEq = (y2, y1, x2, x1, currentVal) => {
        let m = (y2 - y1) / (x2 - x1); 
        let b = y1 - m * x1;
        return m * currentVal + b;
    };
    // 두 값을 비례적으로 보간하는 함수
    const lerp = (a, b, n) => (1 - n) * a + n * b;
    // 문서의 body 요소와 배경색을 가져오는 함수
    const body = document.body;
    const bodyColor = getComputedStyle(body).getPropertyValue('--color-bg').trim() || 'white';
// 마우스 위치를 가져오는 함수
const getMousePos = (e) => {
    let posx = 0;
    let posy = 0;
    if (!e) e = window.event;
    if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
    }
    else if (e.clientX || e.clientY) 	{
        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    return { x : posx, y : posy }
}
    

    // 창의 크기를 계산하는 함수
    let winsize;
    const calcWinsize = () => winsize = {width: window.innerWidth, height: window.innerHeight};
    calcWinsize();

    window.addEventListener('resize', calcWinsize);


    // 커서 효과를 담당하는 클래스
    class CursorFx {
        constructor(el) {
            this.DOM = {el: el};
            this.DOM.dot = this.DOM.el.querySelector('.cursor__inner--dot');
            this.DOM.circle = this.DOM.el.querySelector('.cursor__inner--circle');
            this.bounds = {dot: this.DOM.dot.getBoundingClientRect(), circle: this.DOM.circle.getBoundingClientRect()};
            this.scale = 1;
            this.opacity = 1;
            this.mousePos = {x:0, y:0};
            this.lastMousePos = {dot: {x:0, y:0}, circle: {x:0, y:0}};
            this.lastScale = 1;
            this.lastOpacity = 1;
            
            this.initEvents();
            requestAnimationFrame(() => this.render());
        }
        // 마우스 이벤트를 초기화하는 함수
        initEvents() {
            window.addEventListener('mousemove', ev => this.mousePos = getMousePos(ev));
        }
        // render() 메서드는 requestAnimationFrame()을 이용하여 매 프레임마다 업데이트됨
        render() {
            // lerp() 함수를 이용하여 현재 위치와 마우스 포인터 위치를 부드럽게 연결함
            this.lastMousePos.dot.x = lerp(this.lastMousePos.dot.x, this.mousePos.x - this.bounds.dot.width/2, 1);
            this.lastMousePos.dot.y = lerp(this.lastMousePos.dot.y, this.mousePos.y - this.bounds.dot.height/2, 1);
            this.lastMousePos.circle.x = lerp(this.lastMousePos.circle.x, this.mousePos.x - this.bounds.circle.width/2, 0.15);
            this.lastMousePos.circle.y = lerp(this.lastMousePos.circle.y, this.mousePos.y - this.bounds.circle.height/2, 0.15);
            this.lastScale = lerp(this.lastScale, this.scale, 0.15);
            this.lastOpacity = lerp(this.lastOpacity, this.opacity, 0.1);
            
            // 각 요소의 위치, 크기, 투명도 등을 업데이트함
            this.DOM.dot.style.transform = `translateX(${(this.lastMousePos.dot.x)}px) translateY(${this.lastMousePos.dot.y}px)`;
            this.DOM.circle.style.transform = `translateX(${(this.lastMousePos.circle.x)}px) translateY(${this.lastMousePos.circle.y}px) scale(${this.lastScale})`;
            this.DOM.circle.style.opacity = this.lastOpacity
            // 다음 프레임에서 다시 render() 메서드를 호출하기 위해 requestAnimationFrame() 사용
            requestAnimationFrame(() => this.render());
        }
    }
    // '.cursor' 클래스를 가진 엘리먼트를 찾아 CursorFx 클래스의 인스턴스를 생성한다.
    const cursor = new CursorFx(document.querySelector('.cursor'));

    // '[data-hover]' 속성을 가진 모든 엘리먼트에 대해 다음을 수행한다.
    [...document.querySelectorAll('[data-hover]')].forEach((link) => {
        // 해당 엘리먼트에 마우스가 들어갈 때 CursorFx 인스턴스의 enter() 메소드를 호출한다.
        link.addEventListener('mouseenter', () => cursor.enter() );
        link.addEventListener('mouseleave', () => cursor.leave() );
    });
}
