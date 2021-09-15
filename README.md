# code viewer (version 1)
## jupyter를 이용한 교육 진행을 보조하는 Web Service
https://lodos14.github.io/code_viewer/#/

## 1. 프로젝트 환경
![환경](https://user-images.githubusercontent.com/81665608/132830954-663772c8-17d5-4132-9681-51c2b4c64261.png)

## 2. 프로젝트 배경
- 최근 인공지능의 발달로 인해 인공지능 연구가 활발히 진행
- 전문인재 수요의 급증으로 인공지능 관력 학과 설립 증대
- 인공지능 연구와 학습에 최적인 Jupyter Notebook 과 Jupyterlab의 사용 증가
- 교육자가 학생들에게 과제를 주었을 때 과제의 빈도수와 학생들이 많을수록 제출한 과제 파일들을 관리하기가 어렵다.
- github도 마찬가지로 학생들 주소를 일일이 접속해야 하므로 과제 확인 작업이 번거롭다
- 교육자가 학생들의 수준을 파악하기 위해 간단한 테스트를 볼 때 학생들의 테스트 결과를 일일이 받아서 확인하기 번거로운 점이 있다.

![인공지능 뉴스 2](https://user-images.githubusercontent.com/81665608/132664981-3f4cc865-bb8c-4193-9d9d-378012eeac30.png)<br>
참조[https://www.chosun.com/special/special_section/2021/04/12/EOYWWWGCPVD2LO73VTUTDXBCPA/]

![인공지능 뉴스 3](https://user-images.githubusercontent.com/81665608/132664988-3eb38aa0-75cb-439a-a448-a2a068afcf34.png)<br>
참조[https://www.asiatime.co.kr/article/20210528500102?1=1]

## 3. 프로젝트 개요
### Code Viewer 프로젝트는 jupyter notebook 또는 jupyterlab cell에 학생들이 작성한 코드 내용을 Python을 통해 추출해서 Firebase로 넘겨주고 제출한 코드를 데이터 베이스에 쿼리하여 React JS를 이용한 Code Viewer web Service를 구현하는 것을 목표로 함.

### 요약하면 아래 그림처럼 Cell에 작성한 과제 코드를 웹사이트에 게시해서 교육자들이 학생들의 과제를 효율적으로 확인할 수 있는 웹 서비스를 만들려고 하는데
![jupyter](https://user-images.githubusercontent.com/81665608/132947612-9560b2a8-3d1f-4f34-8334-a519cb99e2e5.png)

### 과정은 다음과 같이 분활해서 진행하려고 한다.
![개요](https://user-images.githubusercontent.com/81665608/132974155-2ffc659e-8845-4e79-aef5-9db6bc094cbd.png)



## 4. 프로젝트 과정
### 4.1 코드 추출
#### IPython
#### 먼저 IPython은 Jupyter Notebook, Jupyterlab의 커널로 사용이 되고 있고, 아나콘다 파이썬을 설치하면 자동으로 IPython의 패키지가 설치된다. IPython 패키지의 History.py에 있는 HistoryManager 객체가 Jupyter의 모든 실행 이력을 관리하는데 실행 이력을 호출하기 위해 아래와 같이 코드 작성을 한다.

    from IPython import get_ipython  # IPython 패키지의 get_ipython을 import해준다.
    
    ip = get_ipython() 
    run_history = ip.history_manager.get_range() # 제너레이터 형태로 실행 이력을 반환한다.  
    
    for code_info in run_history :  # 반복문으로 돌려주면 현재 커널에서 실행한 기록을 하나씩 출력 할 수 있다.
        print(code_info)

#### 예제를 하나 보면 다음과 같이 출력이 된다. code_info는 실행 번호와 Cell에 작성한 코드를 큐플 타입으로 가지고 있는데 출력 결과를 보면 코드를 2번 Index에 Text 형태로 저장 하고있다. 
![추출 예제](https://user-images.githubusercontent.com/81665608/132984050-53a1415b-32b1-48a1-add0-8981b4881ad0.png)

#### 이를 이용해 빈 리스트에 code_info의 2번 Index만 추가를 해서 코드 데이터로만 이루어진 새로운 배열을 만들고 이 배열의 마지막 Index 데이터를 가져오면 현재 제출하려는 코드만 추출 할 수 있다.

#### Firebase에 전송하는 기능과 이 코드를 추출하는 기능을 묶어서 하나의 파일로 모듈화를 하면 다음과 같이 사용이 가능하다. 모듈화한 코드를 짧게 설명하자면 매개변수로 자신의 ID와 작성한 코드 제목을 전해주면 방금 실행한 코드를 Firebase(데이터베이스)에 전송하고 전송한 코드와 보낸 시간을 출력하는 모듈이다. 이 패키지의 이름은 submit_code로 만들었고 사용법은 7.사용방법에 설명했다.
![모듈 예제](https://user-images.githubusercontent.com/81665608/132989149-42a614b7-ae34-4d02-9d7f-3880a1d71a02.png)

## 5. Firebase
### Firebase는 구글에서 서비스하는 데이터베이스이다. 데이터베이스로 Firebase를 선택한 이유는 백 엔드 코드를 작성하지 않아도 공식 문서를 보면서 코드를 작성하면 누구나 쉽게 데이터베이스를 사용할 수 있어서이다. 그래서 데이터를 어떤 형태로 구조화할 것인가에 대해서만 고민을 했다. 

### 데이터 구조는 여러가지를 생각해보고 다음과 같이 만들었다. Jupyter에서 제출한 Code 객체와 Web에서 회원가입시 생성되는 User 객체를 분리해서 관리하고 code 객체에 있는 User ID와 user객체에 있는 User ID를 매치해서 User별로 코드를 분류하도록 Web을 구현했는데 완성하고 검토를 해보니 엄청 비효율적이였다. 원하는 학생의 코드를 보려고 클릭을 할 때마다 다른 학생이 제출한 모든 코드를 포함해서 탐색을 하는 것이다. 굳이 Code객체와 User객체를 분리할 필요가 없다는 생각이 들었다.
![파이어베이스 데이터](https://user-images.githubusercontent.com/81665608/132989909-e672664d-d5b8-478f-83ba-11ba1f97120c.png)

### 그래서 다음 Version2에서는 다음과 같은 구조를 이용해서 만들 생각이다. 데이터 구조 자체도 엄청 깔끔해졌고 Web에서 데이터를 쿼리할 때에도 전보다 훨씬 효율적인 구조가 됐다.
![변경 데이터 구조](https://user-images.githubusercontent.com/81665608/132991516-d4bff623-bcb3-4747-bb62-2b8d5d3e63a8.png)

## 6. 웹
### 웹은 React JS로 구현을 했다.

## 7. 사용방법
### 7.1 패키지 설치
#### Jupyter Notebook 또는 jupyterlab가 설치된 환경에서 터미널에 아래 명령어를 작성한다.
    pip install submit_code
    
### 7.2 회원가입
#### 아래 사이트로 접속해서
https://lodos14.github.io/code_viewer/#/

#### 화면아래 Create account를 클릭하면
![로그인화면](https://user-images.githubusercontent.com/81665608/133462397-174eb84a-0a72-4267-8e80-8717c4acb9d0.png)

#### 회원가입 화면이 나오는데 차례로 ID, Passward, Name, 학생 또는 강사 체크를 한 후 Create 버튼을 누른다.
![회원가입](https://user-images.githubusercontent.com/81665608/133463567-badd2aef-5526-455a-81eb-8c9f8dfb58ec.png)

#### 회원가입을 정상적으로 완료하면 아래와 같은 화면이 나온다.
![home화면](https://user-images.githubusercontent.com/81665608/133465272-3eec15a0-57f7-41ee-b699-d8d060f863ca.png)

### 7.3 코드 업로드
#### Jupyter Notebook 또는 Jupyterlab를 실행한다. 아래 예시는 Jupyterlab를 사용했다.
#### 실행 후 먼저 submit_code 패키지의 send_code를 sc이름으로 import 해준다.
    from submit_code import send_code as sc
![import](https://user-images.githubusercontent.com/81665608/133467223-378f2b6e-9cd2-4e54-b468-3ed2243da55f.png)

#### 다음과 같은 코드를 업로드 하려고 할 때
    # 과제
    # 더하기 함수를 만드시오.
    def SumFunc(a, b) :
        return a + b

#### 맨 윗줄에 sc.Submit("자신의 ID", "업로드할 코드 제목")을 추가 작성 후 실행한다.
    sc.Submit("student_1", "Sum Function") # 매개변수로 자신의 ID와 코드 제목을 전해준다.
    # 과제
    # 더하기 함수를 만드시오.
    def SumFunc(a, b) :
        return a + b
        
#### 다음과 같이 출력이 되면 정상적으로 업로드가 된것이다.
![정상제출](https://user-images.githubusercontent.com/81665608/133473086-4a0fd776-c694-4af2-95af-bdadc5f34852.png)

#### 그 후 웹에서 새로고침 후 왼쪽의 이름을 클릭하면 업로드 완료된 코드 제목 목록이 나오고 제목을 클릭하면 아래와 같이 업로드한 코드를 볼 수 있다.
![업로드 완료](https://user-images.githubusercontent.com/81665608/133473699-33ca6b43-651b-46fd-b578-d9a5b8c76395.png)
