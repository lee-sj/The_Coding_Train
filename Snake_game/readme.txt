Snake_game 설명/대본 작성은 목요일 진행

sketch.js 는 맨 처음 비어있는 setup() 과 draw() 로 이루어져 있다. 그리고 snake에 대한 코드가 들어갈 snake.js 파일을 만들어 준다. 
그리고 index에서 snake.js 도 추가로 스크립트를 추가해준다. 

가장 먼저 setup() 에서 snake game 이 진행될 캔버스를 생성한다 크기는 자유  # createCanvas( , ) 함수 
캔버스를 만들었지만 배경 색상이 정해지지 않아서 보이지 않는다. # draw() 에 background() 함수 추가 

## 실행 확인 
###캔버스 생성 확인

snake 파일에서 Snake() 를 만들어주고 this. 를 통해서 x,y 값을 0 으로 설정 첫픽셀에서 생성
xspeed와 yspeed를 만들고 x 만 1의 속력으로 세팅해준다. 

그리고 snake() 내부에 this.update 를 통해서 함수를 한개 만들어 주고 # this.update = function () {}
this.x = this.x + this.xspeed (y 도 동일하게) 를 통해서 이동하는 함수를 만든다. 

그리고 그 이동하는 snake 가 어떤 모습인지 그려주어야 하므로 sketch에서 draw해준것 처럼 this.show() {}를 추가해준다. 
fill()을 통해서 색상을 정해주고 그 모양은 사각형으로 만들어준다. 
rect(this.x, this.y, 10, 10);

다시 sketch로 돌아와서 snake를 그리기 위해서 맨위에 var s 를 통해서 객체를 만들고 
setup() 에서 s = new Snake()를 통해서 새로운 snake 를 생성한다. 
그리고 draw 에 s.update() 와 s.show()를 추가해 s 를 통해서 만들어진 뱀을 업데이트하고 보여준다. 

## 실행 확인 

이제 화살표키를 눌러 상하좌우 움직여 줘야 한다. 

function keyPressed() {
    if (keyCode === UP_ARROW){
        s.dir(0,-1);
    } else if (keyCode === DOWN_ARROW) {
        s.dir(0,1);
    } else if (keyCode === RIGHT_ARROW) {
        s.dir(1,0);
    } else if (keyCode === LEFT_ARROW) {
        s.dir(-1,0);
    }
}
생성 

여기서 s.dir을 통해서 x축과 y축의 이동을 표시하려고 했는데 snake에는 dir 이라는 함수가 없다. 
그렇다면 만들어 주자 update() 위로 와서 this.dir = function(x,y) {} 함수를 만들어주고 
화살표를 통해서 받은 x,y 값을 스피드 값으로 지정해준다. this.xspeed = x (y 동일)

## 실행 확인 

보통 snake 게임에서 뱀의 이동은 물흐르듯이 픽셀단위로 움직이는것이 아니라 일정 크기의 그리드의 크기만큼 한칸씩 한칸씩 이동한다. 
그 그리드를 설정해 주자. 그 그리드를 scl (스케일이라고 명칭하자)
sketch 에서 간단히 해당 그리드를 var scl = 20 으로 설정해주고 
snake에서도 이동스피드에 scl을 곱해줘서 해당 스케일을 한단위로 1씩 이동하게 해준다.  #this.x = this.x + this.xspeed*scl; (y 동일)
그리고 rect을 그리는것도 scl 만큼의 크기로 바꾸어 준다.  #rect(this.x, this.y, scl, scl);

## 실행 확인 
### 빠른 속도를 확인할수 있음 그리고 캔버스에서 벗어나는 범위로 나가는것도 확인 가능 

update 아래 쪽에 
this.x = constrain(this.x, 0, width-scl);
this.y = constrain(this.y, 0, height-scl);를 추가함으로 범위를 한정 짓는다. 

한정짓는것은 됬고 속도를 줄여야 하는데 frameRate가 너무 높게 디폴트로 잡혀있는것 같다. 
frameRate를 지정해주자 setup에 서 frameRate(10) 지정

## 실행 확인

이제 움직이는 뱀을 만들었으면 뱀이 먹을 음식을 만들어 보자 
var food 를 글로벌하게 만들고 
음식이 있을 장소를 설정한다 setup 에 #food = createVector(random(width),random(height))
를 통해서 랜덤한 장소에 food 를 만들고 만든 food 도 뱀처럼 표시를 해야하니 draw 에서  #rect(food.x, food.y, scl, scl)

## 실행 확인
어긋나는것이 보인다 그 이유는 food 가 scl 에 맞지 않게 랜덤하게 생성되기 때문이다. 
함수를 통해서 food 가 생성되는 위치를 scl과 맞는 단위로 생성되게 조정해주자. 
function pickLocation() {
    var cols = floor(width/scl);
    var rows = floor(height/scl);
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);
}
food 생성을 조정해 주었으니 setup에 만들었던 #food = createVector(random(width),random(height)) 를 pickLocation()을 호출하는것으로 바꾸어주면된다. 

## 실행 확인
### 정상적으로 나오는것을 확인했으니 이제 뱀과 먹이가 만났을때 뱀이 먹이를 먹고 크기가 커지는것을 코딩해야한다. (영상 11분부터 다시)


* keyCode, keyPressed 와 ARROW 들이 라이브러리에 있는것인지 확인
* rect()함수의 구성? 
* floor(), constrain() 함수가 무슨 함수인가?
* food.mult 가 무슨 코드인지 다시 조사후 작성할것
