// 콘솔 창의 이전 로그를 모두 지웁니다.
console.clear();

// GSAP의 시험판 경고를 비활성화합니다.
gsap.config({ trialWarn: false });

// ScrollTrigger 플러그인을 등록합니다.
gsap.registerPlugin(ScrollTrigger); 

// "container" 아이디를 가진 엘리먼트의 스타일 속성을 애니메이션화 합니다.
gsap.to("#container", {

  // "--target" CSS 변수를 "0%"으로 설정합니다.
  "--target": "0%",
  
  // 애니메이션의 이징(Easing)을 "none"으로 설정합니다.
  ease: "none",

  // ScrollTrigger 플러그인을 사용하여 스크롤 이벤트를 설정합니다.
  scrollTrigger: {

    // 트리거로 사용할 "#container" 아이디를 가진 엘리먼트를 지정합니다.
    trigger: "#container",

    // 시작 시점을 뷰포트의 상단과 "#container"의 상단이 만나는 지점으로 설정합니다.
    start: "top top",
    
    // 종료 시점을 뷰포트의 상단으로부터 1000px 아래 지점으로 설정합니다.
    end: "+=200",
    
    // "#container" 엘리먼트를 스크롤 영역에 고정합니다.
    pin: true,
    
    // 스크롤에 따라 애니메이션을 재생하는 정도를 설정합니다.
    scrub: 1 
  }
});
